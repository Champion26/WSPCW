-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2015 at 05:02 PM
-- Server version: 5.5.36
-- PHP Version: 5.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `webcw`
--

-- --------------------------------------------------------

--
-- Table structure for table `basket`
--

CREATE TABLE IF NOT EXISTS `basket` (
  `productID` int(11) NOT NULL,
  `productCode` varchar(6) NOT NULL,
  `productName` varchar(25) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `productType` int(11) NOT NULL,
  `price` decimal(19,4) NOT NULL,
  `quantity` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `productCode` (`productCode`),
  KEY `productType` (`productType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `productCode` varchar(6) NOT NULL,
  `productName` varchar(25) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `productType` int(11) NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `quantity` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `productCode` (`productCode`),
  KEY `productType` (`productType`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=306 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productCode`, `productName`, `description`, `productType`, `price`, `quantity`) VALUES
(203, '99859', 'Ferdinand', 'enim. Nunc ut erat. Sed nunc est, mollis non, curs', 7, '0.00', 8),
(205, '869422', 'Ginger', 'consequat auctor, nunc nulla vulputate dui, nec te', 6, '0.00', 43),
(206, '06339', 'Nina', 'sed sem egestas blandit. Nam nulla magna, malesuad', 6, '0.00', 11),
(212, '78388', 'Ali', 'ipsum dolor sit amet, consectetuer adipiscing elit', 2, '0.00', 13),
(213, '33787-', 'Jason', 'ridiculus mus. Proin vel arcu eu odio tristique ph', 4, '0.00', 6),
(214, '91549', 'Blythe', 'magna. Cras convallis convallis dolor. Quisque tin', 5, '0.00', 28),
(216, '603418', 'Maxwell', 'eleifend egestas. Sed pharetra, felis eget varius ', 5, '0.00', 3),
(218, '7231', 'matt', 'Matt', 1, '0.00', NULL),
(220, 'PR3J 9', 'Aristotle', 'egestas rhoncus. Proin nisl sem, consequat nec, mo', 4, '0.00', 22),
(223, '43404', 'Cameron', 'magna. Lorem ipsum dolor sit amet, consectetuer ad', 2, '0.00', 33),
(224, '59826', 'Lani', 'Mauris non dui nec urna suscipit nonummy. Fusce fe', 7, '0.00', 25),
(225, '5090', 'Tucker', 'pharetra sed, hendrerit a, arcu. Sed et libero. Pr', 6, '0.00', 39),
(227, '72115', 'Bryar', 'ante lectus convallis est, vitae sodales nisi magn', 7, '0.00', 18),
(228, '3926VK', 'Igor', 'Nunc sollicitudin commodo ipsum. Suspendisse non l', 7, '0.00', 39),
(231, 'V0Y 0K', 'Priscilla', 'dictum mi, ac mattis velit justo nec ante. Maecena', 4, '0.00', 8),
(232, '623368', 'Ina', 'lobortis risus. In mi pede, nonummy ut, molestie i', 5, '0.00', 25),
(233, '3542', 'Gage', 'Proin dolor. Nulla semper tellus id nunc interdum ', 1, '0.00', 7),
(234, '94270-', 'Noel', 'in consectetuer ipsum nunc id enim. Curabitur mass', 1, '0.00', 21),
(236, '12388', 'Britanni', 'erat, in consectetuer ipsum nunc id enim. Curabitu', 5, '0.00', 13),
(238, '47831-', 'Flynn', 'commodo tincidunt nibh. Phasellus nulla. Integer v', 3, '0.00', 16),
(239, '9753JC', 'Morgan', 'sed libero. Proin sed turpis nec mauris blandit ma', 2, '0.00', 11),
(241, '81911', 'Shelley', 'vitae nibh. Donec est mauris, rhoncus id, mollis n', 5, '0.00', 47),
(242, 'X5X 2W', 'Yvette', 'nulla. Donec non justo. Proin non massa non ante b', 2, '0.00', 47),
(243, '31979', 'Caryn', 'neque tellus, imperdiet non, vestibulum nec, euism', 6, '0.00', 24),
(244, '79783', 'Maggy', 'tincidunt tempus risus. Donec egestas. Duis ac arc', 7, '0.00', 34),
(245, '1669VF', 'Kylynn', 'lorem ipsum sodales purus, in molestie tortor nibh', 3, '0.00', 48),
(246, 'H8Y 1W', 'Thomas', 'vitae mauris sit amet lorem semper auctor. Mauris ', 1, '0.00', 40),
(247, 'K1 3WX', 'Kameko', 'odio, auctor vitae, aliquet nec, imperdiet nec, le', 5, '0.00', 21),
(248, '07-191', 'Whilemina', 'malesuada vel, venenatis vel, faucibus id, libero.', 7, '0.00', 15),
(249, '538699', 'Dana', 'Mauris non dui nec urna suscipit nonummy. Fusce fe', 1, '0.00', 10),
(250, '13-682', 'Kasper', 'magna. Ut tincidunt orci quis lectus. Nullam susci', 2, '0.00', 23),
(251, '5269HO', 'Amery', 'rutrum. Fusce dolor quam, elementum at, egestas a,', 3, '0.00', 11),
(252, '21764', 'Carla', 'ligula elit, pretium et, rutrum non, hendrerit id,', 7, '0.00', 28),
(253, '7032', 'Hannah', 'luctus vulputate, nisi sem semper erat, in consect', 3, '0.00', 10),
(254, '27254', 'Ayanna', 'ut ipsum ac mi eleifend egestas. Sed pharetra, fel', 1, '0.00', 13),
(255, 'A1P 5R', 'Len', 'elit, pharetra ut, pharetra sed, hendrerit a, arcu', 6, '0.00', 47),
(256, '71228-', 'Suki', 'lorem eu metus. In lorem. Donec elementum, lorem u', 7, '0.00', 10),
(257, '66129', 'Brielle', 'a, enim. Suspendisse aliquet, sem ut cursus luctus', 2, '0.00', 39),
(258, '70708', 'Slade', 'vulputate dui, nec tempus mauris erat eget ipsum. ', 2, '0.00', 19),
(259, '7008', 'Perry', 'Nullam enim. Sed nulla ante, iaculis nec, eleifend', 3, '0.00', 15),
(260, '45-047', 'Indira', 'Aenean massa. Integer vitae nibh. Donec est mauris', 5, '0.00', 14),
(261, '09399', 'Kylynn', 'orci luctus et ultrices posuere cubilia Curae; Pha', 3, '0.00', 28),
(262, '5969', 'Hasad', 'quis, pede. Praesent eu dui. Cum sociis natoque pe', 2, '0.00', 46),
(263, '92419', 'Gail', 'diam lorem, auctor quis, tristique ac, eleifend vi', 4, '0.00', 3),
(264, '95500-', 'Guy', 'volutpat. Nulla facilisis. Suspendisse commodo tin', 1, '0.00', 49),
(265, '5744XC', 'Declan', 'libero lacus, varius et, euismod et, commodo at, l', 7, '0.00', 46),
(266, '145054', 'Blair', 'et libero. Proin mi. Aliquam gravida mauris ut mi.', 1, '0.00', 40),
(267, '96-077', 'Samantha', 'ac, fermentum vel, mauris. Integer sem elit, phare', 6, '0.00', 9),
(268, 'N6G 9N', 'Charde', 'Aliquam erat volutpat. Nulla facilisis. Suspendiss', 4, '0.00', 10),
(269, '7192', 'Charity', 'Aenean euismod mauris eu elit. Nulla facilisi. Sed', 6, '0.00', 18),
(270, 'X2G 4K', 'Stuart', 'pede. Cras vulputate velit eu sem. Pellentesque ut', 5, '0.00', 12),
(271, '0547', 'Irene', 'Donec at arcu. Vestibulum ante ipsum primis in fau', 3, '0.00', 45),
(272, '12338', 'Kirsten', 'fermentum vel, mauris. Integer sem elit, pharetra ', 4, '0.00', 14),
(273, '1700', 'Beck', 'Nunc quis arcu vel quam dignissim pharetra. Nam ac', 4, '0.00', 26),
(274, '63105', 'Armand', 'Quisque tincidunt pede ac urna. Ut tincidunt vehic', 3, '0.00', 19),
(275, 'BW3O 3', 'Bianca', 'lectus pede, ultrices a, auctor non, feugiat nec, ', 6, '0.00', 32),
(276, '2721', 'Ebony', 'et pede. Nunc sed orci lobortis augue scelerisque ', 7, '0.00', 44),
(277, 'UQ6Z 9', 'Matthew', 'scelerisque neque. Nullam nisl. Maecenas malesuada', 2, '0.00', 9),
(278, '369551', 'Cara', 'posuere, enim nisl elementum purus, accumsan inter', 3, '0.00', 26),
(279, '93-560', 'Marcia', 'Phasellus vitae mauris sit amet lorem semper aucto', 3, '0.00', 1),
(280, '8975', 'Kasper', 'magna. Sed eu eros. Nam consequat dolor vitae dolo', 5, '0.00', 13),
(281, '17646-', 'Brady', 'orci quis lectus. Nullam suscipit, est ac facilisi', 1, '0.00', 36),
(282, '42248', 'Karen', 'vitae dolor. Donec fringilla. Donec feugiat metus ', 4, '0.00', 15),
(283, '487807', 'Ann', 'non, egestas a, dui. Cras pellentesque. Sed dictum', 2, '0.00', 24),
(285, '7320', 'Haley', 'vel, vulputate eu, odio. Phasellus at augue id ant', 6, '0.00', 50),
(287, '4210', 'Hollee', 'nec, malesuada ut, sem. Nulla interdum. Curabitur ', 7, '0.00', 10),
(288, '51099', 'Barclay', 'nibh. Phasellus nulla. Integer vulputate, risus a ', 1, '0.00', 2),
(289, '3474', 'Steel', 'Nullam lobortis quam a felis ullamcorper viverra. ', 4, '0.00', 37),
(290, '86601', 'Emery', 'at arcu. Vestibulum ante ipsum primis in faucibus ', 7, '0.00', 14),
(291, '47600', 'Isabella', 'faucibus lectus, a sollicitudin orci sem eget mass', 5, '0.00', 7),
(292, 'PV7Q 2', 'Hilda', 'Nunc laoreet lectus quis massa. Mauris vestibulum,', 7, '0.00', 39),
(293, '33227', 'Jocelyn', 'Praesent eu nulla at sem molestie sodales. Mauris ', 3, '0.00', 14),
(294, 'K4L 9P', 'Fatima', 'cursus. Nunc mauris elit, dictum eu, eleifend nec,', 2, '0.00', 7),
(295, '41-321', 'Oren', 'Curabitur consequat, lectus sit amet luctus vulput', 2, '0.00', 15),
(296, '25706', 'Avye', 'arcu vel quam dignissim pharetra. Nam ac nulla. In', 1, '0.00', 36),
(297, '59585', 'Tamekah', 'dolor dolor, tempus non, lacinia at, iaculis quis,', 5, '0.00', 30),
(298, '70255', 'Ethan', 'mi tempor lorem, eget mollis lectus pede et risus.', 3, '0.00', 17),
(299, '57681', 'Josh', 'dgadgfadfg', 2, '5.00', 10),
(300, 'qwefa', 'Prod', 'This is a product.', 1, '9.00', 1),
(301, 'A10AS', 'Sam', 'This is a bottle of windex, it is only 2 feet tall', 1, '9.00', 1),
(303, 'sadas', 'Robyn', 'asiudfbapidbf', 1, '178.00', 9),
(304, 'adsad', 'Steve', 'asd', 1, '10.00', 3),
(305, 'asdf', 'Steve', 'asdafega', 1, '10.00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `producttype`
--

CREATE TABLE IF NOT EXISTS `producttype` (
  `productTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(15) NOT NULL,
  PRIMARY KEY (`productTypeID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `producttype`
--

INSERT INTO `producttype` (`productTypeID`, `type`) VALUES
(1, 'Desktop'),
(2, 'Laptop'),
(3, 'Parts'),
(4, 'CPU Cooler'),
(5, 'Monitors'),
(6, 'Additional'),
(7, 'Desktop'),
(8, 'Laptop'),
(9, 'Parts'),
(10, 'CPU Cooler'),
(11, 'Monitors'),
(12, 'Additional');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`productType`) REFERENCES `producttype` (`productTypeID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`productType`) REFERENCES `producttype` (`productTypeID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
