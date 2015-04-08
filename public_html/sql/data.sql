-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2015 at 01:56 PM
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
-- Table structure for table `colourscheme`
--

CREATE TABLE IF NOT EXISTS `colourscheme` (
  `colourSchemeID` int(11) NOT NULL AUTO_INCREMENT,
  `pageColour` varchar(40) NOT NULL,
  `textColour` varchar(40) NOT NULL,
  `navColour` varchar(40) NOT NULL,
  `headingColour` varchar(40) NOT NULL,
  PRIMARY KEY (`colourSchemeID`),
  UNIQUE KEY `colourSchemeID` (`colourSchemeID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `colourscheme`
--

INSERT INTO `colourscheme` (`colourSchemeID`, `pageColour`, `textColour`, `navColour`, `headingColour`) VALUES
(30, 'green', 'black', 'white', 'red');

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
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `productCode` (`productCode`),
  KEY `productType` (`productType`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=318 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productCode`, `productName`, `description`, `productType`, `price`, `quantity`, `location`) VALUES
(205, '869422', 'Ginger', 'consequat auctor, nunc nulla vulputate dui, nec te', 6, '0.00', 43, ''),
(206, '06339', 'Nina', 'sed sem egestas blandit. Nam nulla magna, malesuad', 6, '0.00', 11, ''),
(212, '78388', 'Ali', 'ipsum dolor sit amet, consectetuer adipiscing elit', 2, '0.00', 13, ''),
(213, '33787-', 'Jason', 'ridiculus mus. Proin vel arcu eu odio tristique ph', 4, '0.00', 6, ''),
(214, '91549', 'Blythe', 'magna. Cras convallis convallis dolor. Quisque tin', 5, '0.00', 28, ''),
(216, '603418', 'Maxwell', 'eleifend egestas. Sed pharetra, felis eget varius ', 5, '0.00', 3, ''),
(218, '7231', 'Kit', 'Smith', 1, '0.00', 0, ''),
(220, 'PR3J 9', 'Aristotle', 'egestas rhoncus. Proin nisl sem, consequat nec, mo', 4, '0.00', 22, ''),
(223, '43404', 'Cameron', 'magna. Lorem ipsum dolor sit amet, consectetuer ad', 2, '0.00', 33, ''),
(225, '5090', 'Tucker', 'pharetra sed, hendrerit a, arcu. Sed et libero. Pr', 6, '0.00', 39, ''),
(231, 'V0Y 0K', 'Priscilla', 'dictum mi, ac mattis velit justo nec ante. Maecena', 4, '0.00', 8, ''),
(232, '623368', 'Ina', 'lobortis risus. In mi pede, nonummy ut, molestie i', 5, '0.00', 25, ''),
(233, '3542', 'Gage', 'Proin dolor. Nulla semper tellus id nunc interdum ', 1, '0.00', 7, ''),
(234, '94270-', 'Noel', 'in consectetuer ipsum nunc id enim. Curabitur mass', 1, '0.00', 21, ''),
(236, '12388', 'Britanni', 'erat, in consectetuer ipsum nunc id enim. Curabitu', 5, '0.00', 13, ''),
(238, '47831-', 'Flynn', 'commodo tincidunt nibh. Phasellus nulla. Integer v', 3, '0.00', 16, ''),
(239, '9753JC', 'Morgan', 'sed libero. Proin sed turpis nec mauris blandit ma', 2, '0.00', 11, ''),
(241, '81911', 'Shelley', 'vitae nibh. Donec est mauris, rhoncus id, mollis n', 5, '0.00', 47, ''),
(242, 'X5X 2W', 'Yvette', 'nulla. Donec non justo. Proin non massa non ante b', 2, '0.00', 47, ''),
(243, '31979', 'Caryn', 'neque tellus, imperdiet non, vestibulum nec, euism', 6, '0.00', 24, ''),
(245, '1669VF', 'Kylynn', 'lorem ipsum sodales purus, in molestie tortor nibh', 3, '0.00', 48, ''),
(246, 'H8Y 1W', 'Thomas', 'vitae mauris sit amet lorem semper auctor. Mauris ', 1, '0.00', 40, ''),
(247, 'K1 3WX', 'Kameko', 'odio, auctor vitae, aliquet nec, imperdiet nec, le', 5, '0.00', 21, ''),
(249, '538699', 'Dana', 'Mauris non dui nec urna suscipit nonummy. Fusce fe', 1, '0.00', 10, ''),
(250, '13-682', 'Kasper', 'magna. Ut tincidunt orci quis lectus. Nullam susci', 2, '0.00', 23, ''),
(251, '5269HO', 'Amery', 'rutrum. Fusce dolor quam, elementum at, egestas a,', 3, '0.00', 11, ''),
(253, '7032', 'Hannah', 'luctus vulputate, nisi sem semper erat, in consect', 3, '0.00', 10, ''),
(254, '27254', 'Ayanna', 'ut ipsum ac mi eleifend egestas. Sed pharetra, fel', 1, '0.00', 13, ''),
(255, 'A1P 5R', 'Len', 'elit, pharetra ut, pharetra sed, hendrerit a, arcu', 6, '0.00', 47, ''),
(257, '66129', 'Brielle', 'a, enim. Suspendisse aliquet, sem ut cursus luctus', 2, '0.00', 39, ''),
(258, '70708', 'Slade', 'vulputate dui, nec tempus mauris erat eget ipsum. ', 2, '0.00', 19, ''),
(259, '7008', 'Perry', 'Nullam enim. Sed nulla ante, iaculis nec, eleifend', 3, '0.00', 15, ''),
(260, '45-047', 'Indira', 'Aenean massa. Integer vitae nibh. Donec est mauris', 5, '0.00', 14, ''),
(261, '09399', 'Kylynn', 'orci luctus et ultrices posuere cubilia Curae; Pha', 3, '0.00', 28, ''),
(262, '5969', 'Hasad', 'quis, pede. Praesent eu dui. Cum sociis natoque pe', 2, '0.00', 46, ''),
(263, '92419', 'Gail', 'diam lorem, auctor quis, tristique ac, eleifend vi', 4, '0.00', 3, ''),
(264, '95500-', 'Guy', 'volutpat. Nulla facilisis. Suspendisse commodo tin', 1, '0.00', 49, ''),
(266, '145054', 'Blair', 'et libero. Proin mi. Aliquam gravida mauris ut mi.', 1, '0.00', 40, ''),
(267, '96-077', 'Samantha', 'ac, fermentum vel, mauris. Integer sem elit, phare', 6, '0.00', 9, ''),
(268, 'N6G 9N', 'Charde', 'Aliquam erat volutpat. Nulla facilisis. Suspendiss', 4, '0.00', 10, ''),
(269, '7192', 'Charity', 'Aenean euismod mauris eu elit. Nulla facilisi. Sed', 6, '0.00', 18, ''),
(270, 'X2G 4K', 'Stuart', 'pede. Cras vulputate velit eu sem. Pellentesque ut', 5, '0.00', 12, ''),
(271, '0547', 'Irene', 'Donec at arcu. Vestibulum ante ipsum primis in fau', 3, '0.00', 45, ''),
(272, '12338', 'Kirsten', 'fermentum vel, mauris. Integer sem elit, pharetra ', 4, '0.00', 14, ''),
(273, '1700', 'Beck', 'Nunc quis arcu vel quam dignissim pharetra. Nam ac', 4, '0.00', 26, ''),
(274, '63105', 'Armand', 'Quisque tincidunt pede ac urna. Ut tincidunt vehic', 3, '0.00', 19, ''),
(275, 'BW3O 3', 'Bianca', 'lectus pede, ultrices a, auctor non, feugiat nec, ', 6, '0.00', 32, ''),
(277, 'UQ6Z 9', 'Matthew', 'scelerisque neque. Nullam nisl. Maecenas malesuada', 2, '0.00', 9, ''),
(278, '369551', 'Cara', 'posuere, enim nisl elementum purus, accumsan inter', 3, '0.00', 26, ''),
(279, '93-560', 'Marcia', 'Phasellus vitae mauris sit amet lorem semper aucto', 3, '0.00', 1, ''),
(280, '8975', 'Kasper', 'magna. Sed eu eros. Nam consequat dolor vitae dolo', 5, '0.00', 13, ''),
(281, '17646-', 'Brady', 'orci quis lectus. Nullam suscipit, est ac facilisi', 1, '0.00', 36, ''),
(282, '42248', 'Karen', 'vitae dolor. Donec fringilla. Donec feugiat metus ', 4, '0.00', 15, ''),
(283, '487807', 'Ann', 'non, egestas a, dui. Cras pellentesque. Sed dictum', 2, '0.00', 24, ''),
(285, '7320', 'Haley', 'vel, vulputate eu, odio. Phasellus at augue id ant', 6, '0.00', 50, ''),
(288, '51099', 'Barclay', 'nibh. Phasellus nulla. Integer vulputate, risus a ', 1, '0.00', 2, ''),
(289, '3474', 'Steel', 'Nullam lobortis quam a felis ullamcorper viverra. ', 4, '0.00', 37, ''),
(291, '47600', 'Isabella', 'faucibus lectus, a sollicitudin orci sem eget mass', 5, '0.00', 7, ''),
(293, '33227', 'Jocelyn', 'Praesent eu nulla at sem molestie sodales. Mauris ', 3, '0.00', 14, ''),
(294, 'K4L 9P', 'Fatima', 'cursus. Nunc mauris elit, dictum eu, eleifend nec,', 2, '0.00', 7, ''),
(295, '41-321', 'Oren', 'Curabitur consequat, lectus sit amet luctus vulput', 2, '0.00', 15, ''),
(296, '25706', 'Avye', 'arcu vel quam dignissim pharetra. Nam ac nulla. In', 1, '0.00', 36, ''),
(297, '59585', 'Tamekah', 'dolor dolor, tempus non, lacinia at, iaculis quis,', 5, '0.00', 30, ''),
(298, '70255', 'Ethan', 'mi tempor lorem, eget mollis lectus pede et risus.', 3, '0.00', 17, ''),
(299, '57681', 'Josh', 'dgadgfadfg', 2, '5.00', 10, ''),
(300, 'qwefa', 'Prod', 'This is a product.', 1, '9.00', 1, ''),
(301, 'A10AS', 'Sam', 'This is a bottle of windex, it is only 2 feet tall', 1, '9.00', 1, ''),
(303, 'sadas', 'Robyn', 'asiudfbapidbf', 1, '178.00', 9, ''),
(304, 'adsad', 'Steve', 'asd', 1, '10.00', 3, ''),
(305, 'asdf', 'Steve', 'asdafega', 1, '10.00', 2, ''),
(306, 'fasd', 'asd', 'This is a descria', 1, '188.00', 1, ''),
(307, 'Asd', 'gsfadf', 'asfsad', 2, '1.00', 1, ''),
(308, 'sdasf', 'Dave', 'Sedasd', 1, '1.00', 1, ''),
(309, '1232', 'Steph', 'hwefgasdfnoj', 1, '1.00', 1, ''),
(310, '65421', 'Glass Hammer', 'Glass Hammer.', 1, '154.00', 100, ''),
(311, '18432', 'Table', 'Its a damn table.', 1, '10.00', 15, ''),
(312, '73113', 'Charger', 'It charges shit.', 5, '10.00', 5, ''),
(313, '73132', 'Cup', 'Cup.', 5, '421.00', 2, 'datamart.jpg'),
(314, '124', 'gasdfsdf', 'asdfsadf', 4, '123.00', 123, ''),
(315, '412413', 'sfadgasdf', 'ghadgasdf', 3, '123.00', 1, ''),
(317, '3123', 'sdasdfa', 'sadfsadf', 4, '123.00', 2, 'images/undefined');

-- --------------------------------------------------------

--
-- Table structure for table `producttype`
--

CREATE TABLE IF NOT EXISTS `producttype` (
  `productTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(15) NOT NULL,
  PRIMARY KEY (`productTypeID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

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
(18, 'Mobiles'),
(19, 'Keyboards');

-- --------------------------------------------------------

--
-- Table structure for table `sitedetail`
--

CREATE TABLE IF NOT EXISTS `sitedetail` (
  `siteDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `elementID` varchar(40) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`siteDetailID`),
  UNIQUE KEY `siteDetailID` (`siteDetailID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `sitedetail`
--

INSERT INTO `sitedetail` (`siteDetailID`, `elementID`, `content`) VALUES
(1, 'pageTitle', 'Monsters Inc'),
(2, 'contactUsDetails', 'This is now just'),
(3, 'siteDescription', ''),
(4, 'prodDesc', 'CREATE TABLE productType(\n    productTypeID INT NOT NULL AUTO_INCREMENT,\n    type VARCHAR(15) NOT NULL,\n    PRIMARY KEY(productTypeID)\n    );\n\nCREATE TABLE product(\n    productID INT NOT NULL AUTO_INCREMENT,\n    productCode VARCHAR(6) NOT NULL UNIQUE,\n    productName VARCHAR(25) NOT NULL,\n    description VARCHAR(50),\n    productType INT NOT NULL,\n    price DECIMAL(19,4) NOT NULL,\n    quantity SMALLINT,\n    PRIMARY KEY(productID),\n    FOREIGN KEY(productType) REFERENCES productType(productTypeID)\n    );\nCREATE TABLE basket(\n    productID INT NOT NULL ,\n    productCode VARCHAR(6) NOT NULL UNIQUE,\n    productName VARCHAR(25) NOT NULL,\n    description VARCHAR(50),\n    productType INT NOT NULL,\n    price DECIMAL(19,4) NOT NULL,\n    quantity SMALLINT,\n    PRIMARY KEY(productID),\n    FOREIGN KEY(productType) REFERENCES productType(productTypeID)\n    );\n\n\ninsert into productType (type) values (''Desktop'');\ninsert into productType (type) values (''Laptop'');\ninsert into productType (type) values (''Parts'');\ninsert into productType (type) values (''CPU Cooler'');\ninsert into productType (type) values (''Monitors'');\ninsert into productType (type) values (''Additional'');\n\nINSERT INTO `product` (`productCode`,`productName`,`description`,`productType`,`price`,`quantity`) VALUES ("19394","Solomon","Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est.",5,"Â£57.26",22),("49288","Merrill","leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in,",5,"Â£4.61",48),("99859","Ferdinand","enim. Nunc ut erat. Sed nunc est, mollis non, cursus",7,"Â£84.62",8),("89690","Lionel","ornare, lectus ante dictum mi, ac mattis velit justo nec",7,"Â£64.55",44),("869422","Ginger","consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat",6,"Â£75.55",43),("06339","Nina","sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis",6,"Â£49.16",11),("381857","Adrian","lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet",5,"Â£49.16",30),("3033","Rooney","nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet.",3,"Â£41.47",20),("4423XP","Fletcher","Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo,",7,"Â£1.69",7),("79539","Adele","Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit,",6,"Â£45.24",41),("7295","Davis","posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse",4,"Â£75.42",43),("78388","Ali","ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit",2,"Â£31.95",13),("33787-087","Jason","ridiculus mus. Proin vel arcu eu odio tristique pharetra. Quisque",4,"Â£80.96",6),("91549","Blythe","magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna.",5,"Â£83.06",28),("94696","Chastity","dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est",4,"Â£98.02",21),("603418","Maxwell","eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum",5,"Â£15.12",3),("06048","Hall","sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra,",4,"Â£76.48",8),("7231","Nina","blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae",1,"Â£10.92",27),("61113","Amaya","Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius.",2,"Â£87.92",14),("PR3J 9CA","Aristotle","egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere",4,"Â£91.98",22),("62777","Nigel","lorem, sit amet ultricies sem magna nec quam. Curabitur vel",4,"Â£47.41",12),("3192","Chadwick","justo. Proin non massa non ante bibendum ullamcorper. Duis cursus,",4,"Â£47.06",36),("43404","Cameron","magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam",2,"Â£84.71",33),("59826","Lani","Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum",7,"Â£48.69",25),("5090","Tucker","pharetra sed, hendrerit a, arcu. Sed et libero. Proin mi.",6,"Â£97.32",39),("50518","Patience","pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper,",1,"Â£81.46",26),("72115","Bryar","ante lectus convallis est, vitae sodales nisi magna sed dui.",7,"Â£43.32",18),("3926VK","Igor","Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor,",7,"Â£8.62",39),("2108NW","Ruby","libero est, congue a, aliquet vel, vulputate eu, odio. Phasellus",7,"Â£34.37",16),("6289SY","McKenzie","leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor",4,"Â£80.30",38),("V0Y 0K2","Priscilla","dictum mi, ac mattis velit justo nec ante. Maecenas mi",4,"Â£21.20",8),("623368","Ina","lobortis risus. In mi pede, nonummy ut, molestie in, tempus",5,"Â£16.20",25),("3542","Gage","Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed",1,"Â£28.22",7),("94270-213","Noel","in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan",1,"Â£84.30",21),("91719","Dawn","augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum.",3,"Â£72.94",30),("12388","Britanni","erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum",5,"Â£93.34",13),("453307","Berk","mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id",1,"Â£4.72",24),("47831-190","Flynn","commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies",3,"Â£68.93",16),("9753JC","Morgan","sed libero. Proin sed turpis nec mauris blandit mattis. Cras",2,"Â£49.34",11),("8799","Ishmael","libero lacus, varius et, euismod et, commodo at, libero. Morbi",6,"Â£88.63",28),("81911","Shelley","vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus",5,"Â£4.71",47),("X5X 2W7","Yvette","nulla. Donec non justo. Proin non massa non ante bibendum",2,"Â£64.54",47),("31979","Caryn","neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce",6,"Â£67.63",24),("79783","Maggy","tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris.",7,"Â£84.58",34),("1669VF","Kylynn","lorem ipsum sodales purus, in molestie tortor nibh sit amet",3,"Â£29.99",48),("H8Y 1W9","Thomas","vitae mauris sit amet lorem semper auctor. Mauris vel turpis.",1,"Â£66.01",40),("K1 3WX","Kameko","odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque",5,"Â£70.57",21),("07-191","Whilemina","malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris",7,"Â£22.85",15),("538699","Dana","Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum",1,"Â£66.52",10),("13-682","Kasper","magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac",2,"Â£14.28",23),("5269HO","Amery","rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed,",3,"Â£94.60",11),("21764","Carla","ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc",7,"Â£24.75",28),("7032","Hannah","luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc",3,"Â£55.91",10),("27254","Ayanna","ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget",1,"Â£29.59",13),("A1P 5R9","Len","elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et",6,"Â£57.71",47),("71228-508","Suki","lorem eu metus. In lorem. Donec elementum, lorem ut aliquam",7,"Â£77.85",10),("66129","Brielle","a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo",2,"Â£68.16",39),("70708","Slade","vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis.",2,"Â£62.81",19),("7008","Perry","Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus",3,"Â£85.67",15),("45-047","Indira","Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id,",5,"Â£36.63",14),("09399","Kylynn","orci luctus et ultrices posuere cubilia Curae; Phasellus ornare. Fusce",3,"Â£42.87",28),("5969","Hasad","quis, pede. Praesent eu dui. Cum sociis natoque penatibus et",2,"Â£76.77",46),("92419","Gail","diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus",4,"Â£81.15",3),("95500-407","Guy","volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer",1,"Â£10.60",49),("5744XC","Declan","libero lacus, varius et, euismod et, commodo at, libero. Morbi",7,"Â£93.64",46),("145054","Blair","et libero. Proin mi. Aliquam gravida mauris ut mi. Duis",1,"Â£57.65",40),("96-077","Samantha","ac, fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra",6,"Â£8.86",9),("N6G 9N6","Charde","Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus",4,"Â£40.44",10),("7192","Charity","Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed",6,"Â£12.77",18),("X2G 4K1","Stuart","pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac",5,"Â£49.89",12),("0547","Irene","Donec at arcu. Vestibulum ante ipsum primis in faucibus orci",3,"Â£77.69",45),("12338","Kirsten","fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra sed,",4,"Â£40.38",14),("1700","Beck","Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla.",4,"Â£72.71",26),("63105","Armand","Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla",3,"Â£42.99",19),("BW3O 3PX","Bianca","lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis",6,"Â£87.45",32),("2721","Ebony","et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus",7,"Â£45.41",44),("UQ6Z 9QX","Matthew","scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu",2,"Â£73.27",9),("369551","Cara","posuere, enim nisl elementum purus, accumsan interdum libero dui nec",3,"Â£89.85",26),("93-560","Marcia","Phasellus vitae mauris sit amet lorem semper auctor. Mauris vel",3,"Â£2.26",1),("8975","Kasper","magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec",5,"Â£69.11",13),("17646-397","Brady","orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna",1,"Â£88.01",36),("42248","Karen","vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante.",4,"Â£49.80",15),("487807","Ann","non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget",2,"Â£64.41",24),("9419","Clarke","mi tempor lorem, eget mollis lectus pede et risus. Quisque",1,"Â£3.50",20),("7320","Haley","vel, vulputate eu, odio. Phasellus at augue id ante dictum",6,"Â£78.03",50),("74348","Brennan","fermentum risus, at fringilla purus mauris a nunc. In at",2,"Â£38.77",17),("4210","Hollee","nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in",7,"Â£82.29",10),("51099","Barclay","nibh. Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim",1,"Â£51.59",2),("3474","Steel","Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet",4,"Â£15.59",37),("86601","Emery","at arcu. Vestibulum ante ipsum primis in faucibus orci luctus",7,"Â£60.72",14),("47600","Isabella","faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend.",5,"Â£53.59",7),("PV7Q 2OI","Hilda","Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum",7,"Â£36.31",39),("33227","Jocelyn","Praesent eu nulla at sem molestie sodales. Mauris blandit enim",3,"Â£25.43",14),("K4L 9P9","Fatima","cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada ut,",2,"Â£15.77",7),("41-321","Oren","Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper",2,"Â£5.32",15),("25706","Avye","arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt",1,"Â£97.80",36),("59585","Tamekah","dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent",5,"Â£45.58",30),("70255","Ethan","mi tempor lorem, eget mollis lectus pede et risus. Quisque",3,"Â£27.36",17),("71209","Cheyenne","nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat.",7,"Â£13.50",40),("0024","Risa","et malesuada fames ac turpis egestas. Fusce aliquet magna a",5,"Â£76.61",8);\n'),
(5, 'basketPageTitle', 'Basket'),
(6, 'addProductTitle', 'Add Product'),
(7, 'addProduct', '\n  <fieldset>\n  Product Code:  <input type="text" id="productCode" name="productCode"><br>\n  <br>\n  Product Name:  <input type="text" id="productName" name="productName"><br>\n  <br>\n  Description:  <input type="text" id="description" name="description"><br>\n  <br>\n  Product Type:  <input list="types" id="productType" name="productType"><br>\n  <datalist id="types"><option value="Desktop"></option><option value="Laptop"></option><option value="Parts"></option><option value="CPU Cooler"></option><option value="Monitors"></option><option value="Additional"></option><option value="Mobiles"></option><option value="Keyboards"></option></datalist>\n  <br>\n  Price (Â£):  <input type="number" step="any" id="price" name="price"><br>\n  <br>\n  Quantity:  <input type="number" id="quantity" name="quantity"><br><br>\n  <br>\n  Image: <input type="file" id="imageFile" size="60"><br><br>\n  <input type="button" value="Add" onclick="getResult(event)">\n</fieldset>\n'),
(8, 'editProductTitle', 'Edit Product'),
(9, 'editSearchIntro', ' Please enter the product code that you wish to search for.'),
(10, 'searchExplanation', 'The results will appear below'),
(11, 'siteEditTitle', 'Site Edit'),
(12, 'siteEditIntro', 'This page will allow you to edit details about the site such as the title.'),
(13, 'editElementExplanation', 'Many elements of this site are editable by a simple click such as the main title. These elements will be highlighted in red when you hover over them or you can press and hold <strong>Shift   E</strong> to highlight all these editable elements. If you so wish you can drag a .txt file o'),
(14, 'specifyDelete', 'Please specify what product type to delete below.'),
(15, 'deleteWarning', 'Warning: All products that fall under that type will also be deleted.'),
(16, 'searchPageTitle', 'Search');

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
