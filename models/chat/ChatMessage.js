import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

const readByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const chatMessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    requeteId: String,
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    postedByUser: String,
    readByRecipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
    collection: "chatmessages",
  }
);

/**
 * This method will create a post in chat
 * 
 * @param {String} roomId - id of chat room
 * @param {Object} message - message you want to post in the chat room
 * @param {String} postedByUser - user who is posting the message
 */
chatMessageSchema.statics.createPostInRequete = async function (requeteId, message, postedByUser) {
  try {
    const post = await this.create({
      requeteId,
      message,
      postedByUser,
      readByRecipients: { readByUserId: postedByUser }
    });
    const aggregate = await this.aggregate([
      // get post where _id = post._id
      { $match: { _id: post._id } },
      // do a join on another table called users, and 
      // get me a user whose _id = postedByUser
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: '$postedByUser' },
      // do a join on another table called chatrooms, and 
      // get me a chatroom whose _id = requeteId
      {
        $lookup: {
          from: 'chatrooms',
          localField: 'requeteId',
          foreignField: '_id',
          as: 'requeteInfo',
        }
      },
      { $unwind: '$requeteInfo' },
      { $unwind: '$requeteInfo.userIds' },
      // do a join on another table called users, and 
      // get me a user whose _id = userIds
      {
        $lookup: {
          from: 'users',
          localField: 'requeteInfo.userIds',
          foreignField: '_id',
          as: 'requeteInfo.userProfile',
        }
      },
      { $unwind: '$requeteInfo.userProfile' },
      // group data
      {
        $group: {
          _id: '$requeteInfo._id',
          postId: { $last: '$_id' },
          requeteId: { $last: '$requeteInfo._id' },
          message: { $last: '$message' },
          type: { $last: '$type' },
          postedByUser: { $last: '$postedByUser' },
          readByRecipients: { $last: '$readByRecipients' },
          requeteInfo: { $addToSet: '$requeteInfo.userProfile' },
          createdAt: { $last: '$createdAt' },
          updatedAt: { $last: '$updatedAt' },
        }
      }
    ]);
    return aggregate[0];
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} requeteId - chat room id
 */
chatMessageSchema.statics.getConversationByRequeteId = async function (requeteId, options = {}) {
  try {
    return this.aggregate([
      { $match: { requeteId } },
      { $sort: { createdAt: -1 } },
      // do a join on another table called users, and 
      // get me a user whose _id = postedByUser
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: "$postedByUser" },
      // apply pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
      { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} requeteId - chat room id
 * @param {String} currentUserOnlineId - user id
 */
chatMessageSchema.statics.markMessageRead = async function (requeteId, currentUserOnlineId) {
  try {
    return this.updateMany(
      {
        requeteId,
        'readByRecipients.readByUserId': { $ne: currentUserOnlineId }
      },
      {
        $addToSet: {
          readByRecipients: { readByUserId: currentUserOnlineId }
        }
      },
      {
        multi: true
      }
    );
  } catch (error) {
    throw error;
  }
}

/**
 * @param {Array} requeteIds - chat room ids
 * @param {{ page, limit }} options - pagination options
 * @param {String} currentUserOnlineId - user id
 */
chatMessageSchema.statics.getRecentConversation = async function (requeteIds, options, currentUserOnlineId) {
  try {
    return this.aggregate([
      { $match: { requeteId: { $in: requeteIds } } },
      {
        $group: {
          _id: '$requeteId',
          messageId: { $last: '$_id' },
          requeteId: { $last: '$requeteId' },
          message: { $last: '$message' },
          type: { $last: '$type' },
          postedByUser: { $last: '$postedByUser' },
          createdAt: { $last: '$createdAt' },
          readByRecipients: { $last: '$readByRecipients' },
        }
      },
      { $sort: { createdAt: -1 } },
      // do a join on another table called users, and 
      // get me a user whose _id = postedByUser
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: "$postedByUser" },
      // do a join on another table called chatrooms, and 
      // get me room details
      {
        $lookup: {
          from: 'chatrooms',
          localField: '_id',
          foreignField: '_id',
          as: 'roomInfo',
        }
      },
      { $unwind: "$roomInfo" },
      { $unwind: "$roomInfo.userIds" },
      // do a join on another table called users 
      {
        $lookup: {
          from: 'users',
          localField: 'roomInfo.userIds',
          foreignField: '_id',
          as: 'roomInfo.userProfile',
        }
      },
      { $unwind: "$readByRecipients" },
      // do a join on another table called users 
      {
        $lookup: {
          from: 'users',
          localField: 'readByRecipients.readByUserId',
          foreignField: '_id',
          as: 'readByRecipients.readByUser',
        }
      },

      {
        $group: {
          _id: '$roomInfo._id',
          messageId: { $last: '$messageId' },
          requeteId: { $last: '$requeteId' },
          message: { $last: '$message' },
          type: { $last: '$type' },
          postedByUser: { $last: '$postedByUser' },
          readByRecipients: { $addToSet: '$readByRecipients' },
          roomInfo: { $addToSet: '$roomInfo.userProfile' },
          createdAt: { $last: '$createdAt' },
        },
      },
      // apply pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
    ]);
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("ChatMessage", chatMessageSchema);
