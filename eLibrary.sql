-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 01 juin 2022 à 12:24
-- Version du serveur : 10.4.19-MariaDB
-- Version de PHP : 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eLibrary`
--

-- --------------------------------------------------------

--
-- Structure de la table `Corrections`
--

CREATE TABLE `Corrections` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `objectif` text DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `nbTelechargement` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idEnseignantPublieur` int(11) DEFAULT NULL,
  `EnseignantId` int(11) DEFAULT NULL,
  `idEnseignantSupprimeur` int(11) DEFAULT NULL,
  `TdId` int(11) DEFAULT NULL,
  `EpreuveId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `DocumentDomaine`
--

CREATE TABLE `DocumentDomaine` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DomaineId` int(11) NOT NULL,
  `DocumentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Documents`
--

CREATE TABLE `Documents` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `resume` text DEFAULT NULL,
  `etat` varchar(255) NOT NULL DEFAULT 'actif',
  `nbTelechargement` int(11) NOT NULL DEFAULT 0,
  `auteur` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `TypeId` int(11) DEFAULT NULL,
  `FaculteId` int(11) DEFAULT NULL,
  `FiliereId` int(11) DEFAULT NULL,
  `NiveauId` int(11) DEFAULT NULL,
  `SpecialiteId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Documents`
--

INSERT INTO `Documents` (`id`, `titre`, `contenu`, `resume`, `etat`, `nbTelechargement`, `auteur`, `createdAt`, `updatedAt`, `TypeId`, `FaculteId`, `FiliereId`, `NiveauId`, `SpecialiteId`, `UserId`) VALUES
(2, 'introduction a l\'algorithmiue', 'public/upload/admin-blablabla.pdf-1653991521237.pdf', 'cours sur lalgoritmque', 'actif', 0, 'Dr. Kimbi', '2022-05-31 10:05:21', '2022-05-31 10:44:51', 3, 1, 1, 3, 1, NULL),
(3, 'introduction a l\'algorithmiue', 'public/upload/admin-blablabla.pdf-1653991632500.pdf', 'cours sur lalgoritmque', 'actif', 0, 'Dr. Kimbi', '2022-05-31 10:07:12', '2022-05-31 10:07:12', NULL, 1, 1, 3, 1, NULL),
(4, 'introduction a l\'algorithmiue', 'public/upload/admin-blablabla.pdf-1653991681791.pdf', 'cours sur lalgoritmque', 'actif', 0, 'Dr. Kimbi', '2022-05-31 10:08:01', '2022-05-31 10:08:01', 3, 1, 1, 3, 1, 26);

-- --------------------------------------------------------

--
-- Structure de la table `Domaines`
--

CREATE TABLE `Domaines` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Domaines`
--

INSERT INTO `Domaines` (`id`, `nom`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'science', '2022-05-31 11:29:57', '2022-05-31 11:29:57', 26);

-- --------------------------------------------------------

--
-- Structure de la table `Epreuves`
--

CREATE TABLE `Epreuves` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `objectif` text DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `nbTelechargement` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idEnseignantPublieur` int(11) DEFAULT NULL,
  `EnseignantId` int(11) DEFAULT NULL,
  `idEnseignantSupprimeur` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Facultes`
--

CREATE TABLE `Facultes` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Facultes`
--

INSERT INTO `Facultes` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, 'facsciences', '2022-05-28 15:28:41', '2022-05-28 15:28:41'),
(2, 'faclettres', '2022-05-28 15:28:41', '2022-05-28 15:28:41');

-- --------------------------------------------------------

--
-- Structure de la table `filiereNiveau`
--

CREATE TABLE `filiereNiveau` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `NiveauId` int(11) NOT NULL,
  `SpecialiteId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Filieres`
--

CREATE TABLE `Filieres` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FaculteId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Filieres`
--

INSERT INTO `Filieres` (`id`, `nom`, `createdAt`, `updatedAt`, `FaculteId`) VALUES
(1, 'Informatique', '2022-05-28 15:29:44', '2022-05-28 15:29:44', 1),
(2, 'Mathematiques', '2022-05-28 15:29:44', '2022-05-28 15:29:44', 1),
(3, 'bios', '2022-05-28 15:31:00', '2022-05-28 15:31:00', NULL),
(4, 'chimie', '2022-05-28 15:31:00', '2022-05-28 15:31:00', NULL),
(5, 'physique', '2022-05-28 15:31:35', '2022-05-28 15:31:35', 1),
(6, 'LMF', '2022-05-28 15:31:35', '2022-05-28 15:31:35', 2),
(7, 'geographie', '2022-05-28 15:32:02', '2022-05-28 15:32:02', 2),
(8, 'sociologie', '2022-05-28 15:32:02', '2022-05-28 15:32:02', 2);

-- --------------------------------------------------------

--
-- Structure de la table `Niveaus`
--

CREATE TABLE `Niveaus` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Niveaus`
--

INSERT INTO `Niveaus` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, 'L1', '2022-05-28 15:37:13', '2022-05-28 15:37:13'),
(2, 'L2', '2022-05-28 15:37:13', '2022-05-28 15:37:13'),
(3, 'L3', '2022-05-28 15:37:46', '2022-05-28 15:37:46'),
(4, 'M1', '2022-05-28 15:37:46', '2022-05-28 15:37:46'),
(5, 'M2', '2022-05-28 15:38:00', '2022-05-28 15:38:00'),
(6, 'D', '2022-05-28 15:38:00', '2022-05-28 15:38:00');

-- --------------------------------------------------------

--
-- Structure de la table `Notifications`
--

CREATE TABLE `Notifications` (
  `id` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `PermissionRoles`
--

CREATE TABLE `PermissionRoles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RoleId` int(11) NOT NULL,
  `PermissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `PermissionRoles`
--

INSERT INTO `PermissionRoles` (`createdAt`, `updatedAt`, `RoleId`, `PermissionId`) VALUES
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 1, 1),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 1, 2),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 1, 3),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 1, 5),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 1, 6),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 1, 7),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 1, 8),
('2022-05-28 06:36:29', '2022-05-28 06:36:29', 1, 10),
('2022-05-28 07:48:42', '2022-05-28 07:48:42', 1, 11),
('2022-05-28 13:11:01', '2022-05-28 13:11:01', 1, 12),
('2022-05-28 07:32:01', '2022-05-28 07:32:01', 1, 13),
('2022-05-28 11:58:21', '2022-05-28 11:58:21', 1, 14),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 2, 3),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 2, 7),
('2022-05-28 07:30:59', '2022-05-28 07:30:59', 2, 12),
('2022-05-28 07:30:59', '2022-05-28 07:30:59', 2, 13),
('2022-05-28 11:48:04', '2022-05-28 11:48:04', 2, 14),
('2022-05-27 18:02:44', '2022-05-27 18:02:44', 3, 2),
('2022-05-28 06:36:29', '2022-05-28 06:36:29', 3, 9),
('2022-05-28 07:32:01', '2022-05-28 07:32:01', 3, 13),
('2022-05-28 12:13:24', '2022-05-28 12:13:24', 3, 14);

-- --------------------------------------------------------

--
-- Structure de la table `Permissions`
--

CREATE TABLE `Permissions` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Permissions`
--

INSERT INTO `Permissions` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, 'crud_enseignant', '2022-05-27 17:59:08', '2022-05-27 17:59:08'),
(2, 'crud_livre', '2022-05-27 17:59:08', '2022-05-27 17:59:08'),
(3, 'crud_document', '2022-05-27 17:59:38', '2022-05-27 17:59:38'),
(5, 'bloquer_livre', '2022-05-27 18:00:06', '2022-05-27 18:00:06'),
(6, 'bloquer_document', '2022-05-27 18:00:06', '2022-05-27 18:00:06'),
(7, 'add_domaine', '2022-05-27 18:02:03', '2022-05-27 18:02:03'),
(8, 'delete_domaine', '2022-05-27 18:02:03', '2022-05-27 18:02:03'),
(9, 'crud_etudiant', '2022-05-28 06:35:26', '2022-05-28 06:35:26'),
(10, 'bloquer_user', '2022-05-28 06:35:26', '2022-05-28 06:35:26'),
(11, 'touteRecherche', '2022-05-28 07:20:48', '2022-05-28 07:20:48'),
(12, 'rechercher_etudiant', '2022-05-28 07:20:48', '2022-05-28 07:20:48'),
(13, 'rechercher_livre_document', '2022-05-28 07:30:09', '2022-05-28 07:30:09'),
(14, 'rechercher_enseignant', '2022-05-28 11:47:36', '2022-05-28 11:47:36');

-- --------------------------------------------------------

--
-- Structure de la table `Requetes`
--

CREATE TABLE `Requetes` (
  `id` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DocumentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Roles`
--

CREATE TABLE `Roles` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Roles`
--

INSERT INTO `Roles` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2022-05-27 17:58:13', '2022-05-27 17:58:13'),
(2, 'enseignant', '2022-05-27 17:58:13', '2022-05-27 17:58:13'),
(3, 'etudiant', '2022-05-27 17:58:40', '2022-05-27 17:58:40');

-- --------------------------------------------------------

--
-- Structure de la table `Specialites`
--

CREATE TABLE `Specialites` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FiliereId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Specialites`
--

INSERT INTO `Specialites` (`id`, `nom`, `createdAt`, `updatedAt`, `FiliereId`) VALUES
(1, 'genie logiciel', '2022-05-28 16:21:52', '2022-05-28 16:21:52', 1),
(2, 'data science', '2022-05-28 16:21:52', '2022-05-28 16:21:52', 1),
(3, 'arithmétique', '2022-05-28 16:34:10', '2022-05-28 16:34:10', 2),
(4, 'algebre', '2022-05-28 16:34:10', '2022-05-28 16:34:10', 2),
(5, 'BOA', '2022-05-28 16:34:50', '2022-05-28 16:34:50', 3),
(6, 'BOV', '2022-05-28 16:34:50', '2022-05-28 16:34:50', 3);

-- --------------------------------------------------------

--
-- Structure de la table `Types`
--

CREATE TABLE `Types` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Types`
--

INSERT INTO `Types` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, 'livre', '2022-05-28 15:12:09', '2022-05-28 15:12:09'),
(2, 'cours', '2022-05-28 15:12:09', '2022-05-28 15:12:09'),
(3, 'PV', '2022-05-28 15:14:37', '2022-05-28 15:14:37'),
(4, 'TD', '2022-05-28 15:14:37', '2022-05-28 15:14:37'),
(5, 'TP', '2022-05-28 15:15:40', '2022-05-28 15:15:40'),
(6, 'SN', '2022-05-28 15:15:40', '2022-05-28 15:15:40'),
(7, 'CC', '2022-05-28 15:16:25', '2022-05-28 15:16:25'),
(8, 'rattrapage', '2022-05-28 15:16:25', '2022-05-28 15:16:25'),
(9, 'correction', '2022-05-28 15:16:44', '2022-05-28 15:16:44');

-- --------------------------------------------------------

--
-- Structure de la table `Ues`
--

CREATE TABLE `Ues` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `intitule` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `nom` text NOT NULL,
  `etat` varchar(255) NOT NULL DEFAULT 'actif',
  `FaculteId` int(11) DEFAULT NULL,
  `FiliereId` int(11) DEFAULT NULL,
  `NiveauId` int(11) DEFAULT NULL,
  `SpecialiteId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `createdAt`, `updatedAt`, `RoleId`, `nom`, `etat`, `FaculteId`, `FiliereId`, `NiveauId`, `SpecialiteId`, `UserId`) VALUES
(1, 'user1@yahoo.com', '$2a$10$KuUqyZqXLSDIfhRyHy5CPeJRwC1uA6ak.FAoFMiBsAXQf.FF8w7C2', '2022-05-27 16:46:58', '2022-05-27 16:46:58', 1, '', 'actif', NULL, NULL, NULL, NULL, NULL),
(2, 'enseigant11@yahoo.com', '$2a$10$IBX/8Dwe67kpcH1K/1kxbuXj0A20.9qS7EhUoKTA6EmrE8lWS/wNq', '2022-05-27 17:31:06', '2022-05-28 03:56:40', 2, '', 'supprimé', NULL, NULL, NULL, NULL, NULL),
(3, 'enseigant12@yahoo.com', '$2a$10$DUrHNsb1F5ykdKEmwpml6.DsNqmTAImDSFSzvzjOiUGJIWebge066', '2022-05-27 17:33:26', '2022-05-27 17:33:26', 2, '', 'actif', NULL, NULL, NULL, NULL, NULL),
(4, 'ensens@yahoo.com', '$2a$10$teZlA8MujnpbdbBf97XSoeqfi9.PnaTVHyuiVecBFwuX6z8dbKMo.', '2022-05-27 17:41:27', '2022-05-27 17:41:27', 2, '', 'actif', NULL, NULL, NULL, NULL, NULL),
(5, 'ensens1@yahoo.com', '$2a$10$Btoveeivgn8XHQPO0hYMjeMt0iDtYl1BoY5B0ZUH/UwQjCaQPdiA2', '2022-05-27 17:47:00', '2022-05-27 17:47:00', 2, '', 'actif', NULL, NULL, NULL, NULL, NULL),
(6, 'ensens11@yahoo.com', '$2a$10$lZl4giuziXYZzSLQHoOXnO7UNWLlzXo0iKDgwFcWrOc.joQ0B2Qk2', '2022-05-27 17:48:08', '2022-05-27 17:48:08', 2, '', 'actif', NULL, NULL, NULL, NULL, NULL),
(7, 'enseigant123@yahoo.com', '$2a$10$MCvpHvpqpC5Zz6ExDyY9belvawPwOSgRJRCUXUEzw29eHWJyjW4Pq', '2022-05-27 17:48:59', '2022-05-28 04:55:59', 2, '', 'bloqué', NULL, NULL, NULL, NULL, NULL),
(8, 'admin2@yahoo.com', '$2a$10$cLo4.4Y71hkODP09/WQEje6hMorle4dtFPWaeuTXbPQKFy9jHTBk2', '2022-05-28 03:04:55', '2022-05-28 03:04:55', 1, 'admin', 'actif', NULL, NULL, NULL, NULL, NULL),
(9, 'ens2@yahoo.com', '$2a$10$ICbKA2/0UjWW6YmnFO0npuB7q8fj4KSOwdD5WYQ/Z0h/ibCrAw6EC', '2022-05-28 03:06:06', '2022-05-28 03:06:06', 2, 'ens2', 'actif', NULL, NULL, NULL, NULL, NULL),
(10, 'enss2@yahoo.com', '$2a$10$oqty0noFQs4oztUBZNxIgODdJBGzILcoB9G1esxsF8FM/1NtnS/aK', '2022-05-28 03:18:35', '2022-05-28 03:18:35', 2, 'enss2', 'actif', NULL, NULL, NULL, NULL, NULL),
(11, 'enseignant22@yahoo.com', '$2a$10$RPJBk4qu9z15ZI8774mM2uxN/Ai1JilyBpjYPxH5ye1VQR0VHsxEy', '2022-05-28 03:37:02', '2022-05-28 03:37:02', 2, 'enss2', 'actif', NULL, NULL, NULL, NULL, NULL),
(12, 'registerenseignant@yahoo.com', '$2a$10$4uJBy8ecXbMY1ZL4f2CJb.Aqr7ph/Pi2Yf/P3zmfb7yg86LxU5oM.', '2022-05-28 04:13:37', '2022-05-28 04:13:37', 2, 'registerenseignant', 'actif', NULL, NULL, NULL, NULL, NULL),
(13, 'registerEtudiant@yahoo.com', '$2a$10$P9f3oOlqbb.RmlrPGvNeHe.rEG029Gdg9I8J7nvM48Cc/d0D9KWzq', '2022-05-28 04:19:01', '2022-05-28 04:19:01', NULL, 'registerEtudiant', 'actif', NULL, NULL, NULL, NULL, NULL),
(14, 'registerEtudiant1@yahoo.com', '$2a$10$/75LBgy0pyfgOylszZJiPeUhn7e9zUEQ7xiLm17gZGLJwWPNhSwMq', '2022-05-28 04:20:49', '2022-05-28 04:20:49', NULL, 'registerEtudiant', 'actif', NULL, NULL, NULL, NULL, NULL),
(15, 'registerEtudiant2@yahoo.com', '$2a$10$jJ1iAjkCyJNHzeCKGKS05OjYpbHdRV1XSlVp2dmuIToAvNPiJIynK', '2022-05-28 04:23:51', '2022-05-28 04:23:51', NULL, 'registerEtudiant', 'actif', NULL, NULL, NULL, NULL, NULL),
(16, 'registerEtudiant3@yahoo.com', '$2a$10$6fEhVv.iogH2Owv5.YM5w..969A7lQhuuVvlQkN7eVInT/hz3YpEG', '2022-05-28 04:24:44', '2022-05-28 04:52:57', 3, 'registerEtudiant', 'bloqué', NULL, NULL, NULL, NULL, NULL),
(17, 'registerenseignant1@yahoo.com', '$2a$10$XJ1wKgiT/lw8bNKe8uDQkOVfX1bead53nxQqKB6dD788NMvTqML/K', '2022-05-28 04:25:15', '2022-05-28 05:07:46', 3, 'registerenseignant', 'supprimé', NULL, NULL, NULL, NULL, NULL),
(18, 'registerEtudiant4@yahoo.com', '$2a$10$Wq0H/iXycJ/upB4xvUeeCOvsKdau4rgwpvgXbiRztMlH4vE8Enoaq', '2022-05-28 04:41:37', '2022-05-28 05:07:18', 3, 'registerEtudiant', 'actif', NULL, NULL, NULL, NULL, NULL),
(19, 'registerenseignant2@yahoo.com', '$2a$10$Szeh/F1ldA8Bijyt/kiK0./LMCAW1Qkb/q8BAApd6kjPVEavDSOWe', '2022-05-28 04:42:14', '2022-05-28 05:07:10', 3, 'registerenseignant', 'actif', NULL, NULL, NULL, NULL, NULL),
(20, 'registerenseignant3@yahoo.com', '$2a$10$TETopF8AtiQnliPII7iKS.VZWm7fmTqlABU82YWhuPCdgicQ/B8Oq', '2022-05-28 04:43:47', '2022-05-28 04:43:47', 2, 'registerenseignant', 'actif', NULL, NULL, NULL, NULL, NULL),
(26, 'paulette@yahoo.com', '$2a$10$dxQJ8Qn1YI.HsQ1OiR8PzeC4mgZi33JMl0LENkNIFeGNvcxmoqFdW', '2022-05-28 18:22:55', '2022-05-28 18:22:55', 1, 'paulette', 'actif', 1, 1, 3, 1, NULL),
(27, 'yeki@yahoo.com', '$2a$10$J9s.wwa.CuvNGKPUoYVQqOuVBVGjQeZ7WnLFuaUJds481bAlmLWAW', '2022-05-28 18:25:51', '2022-05-31 10:26:44', 3, 'yeki', 'supprimé', 1, 1, 1, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Corrections`
--
ALTER TABLE `Corrections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEnseignantPublieur` (`idEnseignantPublieur`),
  ADD KEY `EnseignantId` (`EnseignantId`),
  ADD KEY `idEnseignantSupprimeur` (`idEnseignantSupprimeur`),
  ADD KEY `TdId` (`TdId`),
  ADD KEY `EpreuveId` (`EpreuveId`);

--
-- Index pour la table `DocumentDomaine`
--
ALTER TABLE `DocumentDomaine`
  ADD PRIMARY KEY (`DomaineId`,`DocumentId`),
  ADD KEY `DocumentId` (`DocumentId`);

--
-- Index pour la table `Documents`
--
ALTER TABLE `Documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TypeId` (`TypeId`),
  ADD KEY `FaculteId` (`FaculteId`),
  ADD KEY `FiliereId` (`FiliereId`),
  ADD KEY `NiveauId` (`NiveauId`),
  ADD KEY `SpecialiteId` (`SpecialiteId`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Domaines`
--
ALTER TABLE `Domaines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Epreuves`
--
ALTER TABLE `Epreuves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEnseignantPublieur` (`idEnseignantPublieur`),
  ADD KEY `EnseignantId` (`EnseignantId`),
  ADD KEY `idEnseignantSupprimeur` (`idEnseignantSupprimeur`);

--
-- Index pour la table `Facultes`
--
ALTER TABLE `Facultes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `filiereNiveau`
--
ALTER TABLE `filiereNiveau`
  ADD PRIMARY KEY (`NiveauId`,`SpecialiteId`),
  ADD KEY `SpecialiteId` (`SpecialiteId`);

--
-- Index pour la table `Filieres`
--
ALTER TABLE `Filieres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FaculteId` (`FaculteId`);

--
-- Index pour la table `Niveaus`
--
ALTER TABLE `Niveaus`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Notifications`
--
ALTER TABLE `Notifications`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `PermissionRoles`
--
ALTER TABLE `PermissionRoles`
  ADD PRIMARY KEY (`RoleId`,`PermissionId`),
  ADD KEY `PermissionId` (`PermissionId`);

--
-- Index pour la table `Permissions`
--
ALTER TABLE `Permissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Requetes`
--
ALTER TABLE `Requetes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DocumentId` (`DocumentId`);

--
-- Index pour la table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Specialites`
--
ALTER TABLE `Specialites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FiliereId` (`FiliereId`);

--
-- Index pour la table `Types`
--
ALTER TABLE `Types`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Ues`
--
ALTER TABLE `Ues`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD KEY `Users_UserId_foreign_idx` (`UserId`),
  ADD KEY `RoleId` (`RoleId`),
  ADD KEY `FaculteId` (`FaculteId`),
  ADD KEY `FiliereId` (`FiliereId`),
  ADD KEY `NiveauId` (`NiveauId`),
  ADD KEY `SpecialiteId` (`SpecialiteId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Corrections`
--
ALTER TABLE `Corrections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Documents`
--
ALTER TABLE `Documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Domaines`
--
ALTER TABLE `Domaines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Epreuves`
--
ALTER TABLE `Epreuves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Facultes`
--
ALTER TABLE `Facultes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Filieres`
--
ALTER TABLE `Filieres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `Niveaus`
--
ALTER TABLE `Niveaus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Notifications`
--
ALTER TABLE `Notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Permissions`
--
ALTER TABLE `Permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Requetes`
--
ALTER TABLE `Requetes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `Specialites`
--
ALTER TABLE `Specialites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Types`
--
ALTER TABLE `Types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `Ues`
--
ALTER TABLE `Ues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Corrections`
--
ALTER TABLE `Corrections`
  ADD CONSTRAINT `Corrections_ibfk_16` FOREIGN KEY (`idEnseignantPublieur`) REFERENCES `Enseignants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Corrections_ibfk_17` FOREIGN KEY (`EnseignantId`) REFERENCES `Enseignants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Corrections_ibfk_18` FOREIGN KEY (`idEnseignantSupprimeur`) REFERENCES `Enseignants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Corrections_ibfk_19` FOREIGN KEY (`TdId`) REFERENCES `Tds` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Corrections_ibfk_20` FOREIGN KEY (`EpreuveId`) REFERENCES `Epreuves` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `DocumentDomaine`
--
ALTER TABLE `DocumentDomaine`
  ADD CONSTRAINT `DocumentDomaine_ibfk_1` FOREIGN KEY (`DomaineId`) REFERENCES `Domaines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `DocumentDomaine_ibfk_2` FOREIGN KEY (`DocumentId`) REFERENCES `Documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Documents`
--
ALTER TABLE `Documents`
  ADD CONSTRAINT `Documents_ibfk_51` FOREIGN KEY (`TypeId`) REFERENCES `Types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Documents_ibfk_52` FOREIGN KEY (`FaculteId`) REFERENCES `Facultes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Documents_ibfk_53` FOREIGN KEY (`FiliereId`) REFERENCES `Filieres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Documents_ibfk_54` FOREIGN KEY (`NiveauId`) REFERENCES `Niveaus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Documents_ibfk_55` FOREIGN KEY (`SpecialiteId`) REFERENCES `Specialites` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Documents_ibfk_56` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `Domaines`
--
ALTER TABLE `Domaines`
  ADD CONSTRAINT `Domaines_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `Epreuves`
--
ALTER TABLE `Epreuves`
  ADD CONSTRAINT `Epreuves_ibfk_1` FOREIGN KEY (`idEnseignantPublieur`) REFERENCES `Enseignants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Epreuves_ibfk_2` FOREIGN KEY (`EnseignantId`) REFERENCES `Enseignants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Epreuves_ibfk_3` FOREIGN KEY (`idEnseignantSupprimeur`) REFERENCES `Enseignants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `filiereNiveau`
--
ALTER TABLE `filiereNiveau`
  ADD CONSTRAINT `filiereNiveau_ibfk_1` FOREIGN KEY (`NiveauId`) REFERENCES `Niveaus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `filiereNiveau_ibfk_2` FOREIGN KEY (`SpecialiteId`) REFERENCES `Specialites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Filieres`
--
ALTER TABLE `Filieres`
  ADD CONSTRAINT `Filieres_ibfk_1` FOREIGN KEY (`FaculteId`) REFERENCES `Facultes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `PermissionRoles`
--
ALTER TABLE `PermissionRoles`
  ADD CONSTRAINT `PermissionRoles_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PermissionRoles_ibfk_2` FOREIGN KEY (`PermissionId`) REFERENCES `Permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Requetes`
--
ALTER TABLE `Requetes`
  ADD CONSTRAINT `Requetes_ibfk_1` FOREIGN KEY (`DocumentId`) REFERENCES `Documents` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `Specialites`
--
ALTER TABLE `Specialites`
  ADD CONSTRAINT `Specialites_ibfk_1` FOREIGN KEY (`FiliereId`) REFERENCES `Filieres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_UserId_foreign_idx` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Users_ibfk_41` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Users_ibfk_42` FOREIGN KEY (`FaculteId`) REFERENCES `Facultes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Users_ibfk_43` FOREIGN KEY (`FiliereId`) REFERENCES `Filieres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Users_ibfk_44` FOREIGN KEY (`NiveauId`) REFERENCES `Niveaus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Users_ibfk_45` FOREIGN KEY (`SpecialiteId`) REFERENCES `Specialites` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
