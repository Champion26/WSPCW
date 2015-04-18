-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2015 at 03:30 PM
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
  `imageSize` int(11) NOT NULL,
  `navHeight` int(11) NOT NULL,
  `navWidth` int(11) NOT NULL,
  PRIMARY KEY (`colourSchemeID`),
  UNIQUE KEY `colourSchemeID` (`colourSchemeID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=71 ;

--
-- Dumping data for table `colourscheme`
--

INSERT INTO `colourscheme` (`colourSchemeID`, `pageColour`, `textColour`, `navColour`, `headingColour`, `imageSize`, `navHeight`, `navWidth`) VALUES
(70, 'green', 'black', 'white', 'red', 15, 2, 15);

-- --------------------------------------------------------

--
-- Table structure for table `ordertable`
--

CREATE TABLE IF NOT EXISTS `ordertable` (
  `orderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `orderDate` date NOT NULL,
  `totalCost` int(11) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `recipientAddress` varchar(75) NOT NULL,
  `postcode` varchar(10) NOT NULL,
  `orderNumber` bigint(20) NOT NULL,
  `shipped` tinyint(1) NOT NULL DEFAULT '0',
  `recipEmail` varchar(45) NOT NULL,
  PRIMARY KEY (`orderID`),
  UNIQUE KEY `orderID` (`orderID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=50 ;

--
-- Dumping data for table `ordertable`
--

INSERT INTO `ordertable` (`orderID`, `orderDate`, `totalCost`, `recipient`, `recipientAddress`, `postcode`, `orderNumber`, `shipped`, `recipEmail`) VALUES
(1, '0000-00-00', 0, 'Matt', '23 Manners Road', 'sdaa', 0, 1, ''),
(2, '0000-00-00', 0, 'Matt', '23 Manners Road', 'asda', 0, 1, ''),
(3, '0000-00-00', 0, 'Matt', '23 Manners Road', 'asda', 0, 1, ''),
(4, '0000-00-00', 0, 'Mat', '23 Manners Road', 'asd', 0, 1, ''),
(5, '0000-00-00', 0, 'Matt', '23 Manners Road', 'asda', 0, 1, ''),
(6, '0000-00-00', 0, 'Matt', '23 Manners Road', 'asda', 0, 1, ''),
(7, '0000-00-00', 0, 'Matt', '23 Manners Road', 'fasd', 0, 1, ''),
(8, '0000-00-00', 0, 'Matt', '23 Manners Road', 'gasdf', 0, 1, ''),
(9, '0000-00-00', 0, 'Matt', '23 Manners Road', 'asdf', 0, 1, ''),
(10, '0000-00-00', 0, 'Matt', 'asdf', '2131', 0, 1, ''),
(11, '0000-00-00', 0, '213', '123', '213', 0, 1, ''),
(12, '0000-00-00', 0, '23', '123', '32', 0, 1, ''),
(13, '0000-00-00', 0, '23', '123', '32', 0, 1, ''),
(14, '0000-00-00', 0, '23', '123', '32', 0, 1, ''),
(15, '0000-00-00', 0, '23', '123', '32', 0, 1, ''),
(16, '0000-00-00', 0, '123', '4asd', '123', 0, 1, ''),
(17, '0000-00-00', 0, 'sda', '213', 'asd', 0, 1, ''),
(18, '0000-00-00', 0, '123', 'ads', 'gdsdh', 0, 1, ''),
(19, '0000-00-00', 0, '123', 'hfg', 'oiu', 0, 1, ''),
(20, '0000-00-00', 0, 'Rob', 'dasd', '213', 0, 1, ''),
(21, '0000-00-00', 1, 'smith', 'gjhgkhg', 'chgkv', 0, 1, ''),
(22, '0000-00-00', 1, 'smith', 'gjhgkhg', 'chgkv', 0, 1, ''),
(23, '0000-00-00', 1, 'smith', 'gjhgkhg', 'chgkv', 0, 1, ''),
(24, '0000-00-00', 1, 'smith', 'gjhgkhg', 'chgkv', 0, 1, ''),
(25, '0000-00-00', 0, 'Steve', '213`12', 'sad', 0, 1, ''),
(26, '0000-00-00', 0, '123', '4123', 'asd', 0, 1, ''),
(27, '0000-00-00', 0, '123', '4123', 'asd', 0, 1, ''),
(28, '0000-00-00', 0, 'Smith', '213', 'sad', 5888677471, 1, ''),
(29, '0000-00-00', 0, 'Ben', '123', 'sad', 6307041597, 1, ''),
(30, '0000-00-00', 0, 'po', 'asd', '2132', 5837302256, 1, ''),
(31, '0000-00-00', 0, 'Jim', '123', '21sad', 1122971624, 1, ''),
(32, '0000-00-00', 0, 'Zack', '123', '123', 5046579818, 1, ''),
(33, '0000-00-00', 0, 'fiona', 'asd', '231', 5836689622, 1, ''),
(34, '0000-00-00', 0, 'Jane', '132', 'ads', 2595707701, 1, ''),
(35, '0000-00-00', 0, 'sdfa', 'dsf', 'sadf', 2381418721, 1, ''),
(36, '0000-00-00', 0, '2134f', 'sf', 'eqwf', 4468230346, 1, ''),
(37, '0000-00-00', 0, '5143ref', 'sadf', 'sadf', 5181145234, 1, ''),
(38, '0000-00-00', 5, 'asdf', '', '', 4653994757, 1, ''),
(39, '0000-00-00', 5, 'asdf', '', '', 4653994757, 1, ''),
(40, '0000-00-00', 5, 'asdf', '', '', 4653994757, 1, ''),
(41, '0000-00-00', 5, 'asdf', '', '', 4653994757, 1, ''),
(42, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 1206655979, 1, ''),
(43, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 1206655979, 1, ''),
(44, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 1206655979, 1, ''),
(45, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 1206655979, 1, ''),
(46, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 4699907742, 1, ''),
(47, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 4699907742, 1, ''),
(48, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 4699907742, 1, ''),
(49, '0000-00-00', 5, 'asdf', 'asdf', 'sdaf', 4699907742, 1, '');

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
(212, '78388', 'Ali', 'ipsum dolor sit amet, consectetuer adipiscing elit', 2, '0.00', 13, ''),
(213, '33787-', 'Jason', 'ridiculus mus. Proin vel arcu eu odio tristique ph', 4, '0.00', 6, ''),
(214, '91549', 'Blythe', 'magna. Cras convallis convallis dolor. Quisque tin', 5, '0.00', 28, ''),
(216, '603418', 'Maxwell', 'eleifend egestas. Sed pharetra, felis eget varius ', 5, '0.00', 3, ''),
(220, 'PR3J 9', 'Aristotle', 'egestas rhoncus. Proin nisl sem, consequat nec, mo', 4, '0.00', 22, ''),
(223, '43404', 'Cameron', 'magna. Lorem ipsum dolor sit amet, consectetuer ad', 2, '0.00', 33, ''),
(231, 'V0Y 0K', 'Priscilla', 'dictum mi, ac mattis velit justo nec ante. Maecena', 4, '0.00', 8, ''),
(232, '623368', 'Ina', 'lobortis risus. In mi pede, nonummy ut, molestie i', 5, '0.00', 25, ''),
(233, '3542', 'Gage', 'Proin dolor. Nulla semper tellus id nunc interdum ', 1, '6.20', 7, ''),
(234, '94270-', 'Noel', 'in consectetuer ipsum nunc id enim. Curabitur mass', 1, '0.00', 21, ''),
(236, '12388', 'Britanni', 'erat, in consectetuer ipsum nunc id enim. Curabitu', 5, '0.00', 13, ''),
(238, '47831-', 'Flynn', 'commodo tincidunt nibh. Phasellus nulla. Integer v', 3, '0.00', 16, ''),
(239, '9753JC', 'Morgan', 'sed libero. Proin sed turpis nec mauris blandit ma', 2, '0.00', 11, ''),
(241, '81911', 'Shelley', 'vitae nibh. Donec est mauris, rhoncus id, mollis n', 5, '0.00', 47, ''),
(242, 'X5X 2W', 'Yvette', 'nulla. Donec non justo. Proin non massa non ante b', 2, '0.00', 47, ''),
(245, '1669VF', 'Kylynn', 'lorem ipsum sodales purus, in molestie tortor nibh', 3, '0.00', 48, ''),
(246, 'H8Y 1W', 'Thomas', 'vitae mauris sit amet lorem semper auctor. Mauris ', 1, '0.00', 40, ''),
(247, 'K1 3WX', 'Kameko', 'odio, auctor vitae, aliquet nec, imperdiet nec, le', 5, '0.00', 21, ''),
(249, '538699', 'Dana', 'Mauris non dui nec urna suscipit nonummy. Fusce fe', 1, '0.00', 10, ''),
(250, '13-682', 'Kasper', 'magna. Ut tincidunt orci quis lectus. Nullam susci', 2, '0.00', 23, ''),
(251, '5269HO', 'Amery', 'rutrum. Fusce dolor quam, elementum at, egestas a,', 3, '0.00', 11, ''),
(254, '27254', 'Ayanna', 'ut ipsum ac mi eleifend egestas. Sed pharetra, fel', 1, '0.00', 13, ''),
(257, '66129', 'Brielle', 'a, enim. Suspendisse aliquet, sem ut cursus luctus', 2, '0.00', 39, ''),
(258, '70708', 'Slade', 'vulputate dui, nec tempus mauris erat eget ipsum. ', 2, '0.00', 19, ''),
(259, '7008', 'Perry', 'Nullam enim. Sed nulla ante, iaculis nec, eleifend', 3, '0.00', 15, ''),
(260, '45-047', 'Indira', 'Aenean massa. Integer vitae nibh. Donec est mauris', 5, '0.00', 14, ''),
(261, '09399', 'Kylynn', 'orci luctus et ultrices posuere cubilia Curae; Pha', 3, '0.00', 28, ''),
(262, '5969', 'Hasad', 'quis, pede. Praesent eu dui. Cum sociis natoque pe', 2, '0.00', 46, ''),
(263, '92419', 'Gail', 'diam lorem, auctor quis, tristique ac, eleifend vi', 4, '0.00', 3, ''),
(264, '95500-', 'Guy', 'volutpat. Nulla facilisis. Suspendisse commodo tin', 1, '0.00', 49, ''),
(266, '145054', 'Blair', 'et libero. Proin mi. Aliquam gravida mauris ut mi.', 1, '54.65', 40, ''),
(267, '96-077', 'Samantha', 'ac, fermentum vel, mauris. Integer sem elit, phare', 6, '0.00', 9, ''),
(268, 'N6G 9N', 'Charde', 'Aliquam erat volutpat. Nulla facilisis. Suspendiss', 4, '0.00', 10, ''),
(270, 'X2G 4K', 'Stuart', 'pede. Cras vulputate velit eu sem. Pellentesque ut', 5, '0.00', 12, ''),
(271, '0547', 'Irene', 'Donec at arcu. Vestibulum ante ipsum primis in fau', 3, '0.00', 45, ''),
(272, '12338', 'Kirsten', 'fermentum vel, mauris. Integer sem elit, pharetra ', 4, '0.00', 14, ''),
(274, '63105', 'Armand', 'Quisque tincidunt pede ac urna. Ut tincidunt vehic', 3, '0.00', 19, ''),
(275, 'BW3O 3', 'Bianca', 'lectus pede, ultrices a, auctor non, feugiat nec, ', 6, '0.00', 32, ''),
(277, 'UQ6Z 9', 'Matthew', 'scelerisque neque. Nullam nisl. Maecenas malesuada', 2, '0.00', 9, ''),
(278, '369551', 'Cara', 'posuere, enim nisl elementum purus, accumsan inter', 3, '0.00', 26, ''),
(279, '93-560', 'Marcia', 'Phasellus vitae mauris sit amet lorem semper aucto', 3, '0.00', 1, ''),
(281, '17646-', 'Brady', 'orci quis lectus. Nullam suscipit, est ac facilisi', 1, '10.99', 36, ''),
(282, '42248', 'Karen', 'vitae dolor. Donec fringilla. Donec feugiat metus ', 4, '0.00', 15, ''),
(283, '487807', 'Ann', 'non, egestas a, dui. Cras pellentesque. Sed dictum', 2, '0.00', 24, ''),
(288, '51099', 'Barclay', 'nibh. Phasellus nulla. Integer vulputate, risus a ', 1, '0.00', 2, ''),
(289, '3474', 'Steel', 'Nullam lobortis quam a felis ullamcorper viverra. ', 4, '0.00', 37, ''),
(291, '47600', 'Isabella', 'faucibus lectus, a sollicitudin orci sem eget mass', 5, '0.00', 7, ''),
(293, '33227', 'Jocelyn', 'Praesent eu nulla at sem molestie sodales. Mauris ', 3, '0.00', 14, ''),
(294, 'K4L 9P', 'Fatima', 'cursus. Nunc mauris elit, dictum eu, eleifend nec,', 2, '0.00', 7, ''),
(295, '41-321', 'Oren', 'Curabitur consequat, lectus sit amet luctus vulput', 2, '0.00', 15, ''),
(296, '25706', 'Avye', 'arcu vel quam dignissim pharetra. Nam ac nulla. In', 1, '0.00', 36, ''),
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
(313, '73132', 'Cup', 'Cup.', 5, '421.00', 2, 'datamart.jpg'),
(314, '124', 'gasdfsdf', 'asdfsadf', 4, '123.00', 123, ''),
(315, '412413', 'sfadgasdf', 'ghadgasdf', 3, '123.00', 1, ''),
(317, '3123', 'sdasdfa', 'sadfsadf', 4, '123.00', 2, 'images/undefined');

-- --------------------------------------------------------

--
-- Table structure for table `productorder`
--

CREATE TABLE IF NOT EXISTS `productorder` (
  `productOrderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `productID` int(11) NOT NULL,
  `orderID` bigint(20) NOT NULL,
  PRIMARY KEY (`productOrderID`),
  UNIQUE KEY `productOrderID` (`productOrderID`),
  KEY `orderID` (`orderID`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `productorder`
--

INSERT INTO `productorder` (`productOrderID`, `productID`, `orderID`) VALUES
(1, 233, 37),
(2, 233, 38),
(3, 283, 38),
(4, 239, 38),
(5, 233, 38),
(6, 283, 38),
(7, 239, 38),
(8, 233, 38),
(9, 283, 38),
(10, 239, 38),
(11, 233, 38),
(12, 283, 38),
(13, 239, 38),
(14, 299, 38),
(15, 299, 42),
(16, 233, 42),
(17, 299, 42),
(18, 233, 42),
(19, 283, 42),
(20, 233, 42),
(21, 299, 42),
(22, 233, 42),
(23, 239, 42),
(24, 299, 42),
(25, 283, 42),
(26, 239, 42),
(27, 239, 46),
(28, 283, 46),
(29, 233, 46),
(30, 299, 46),
(31, 283, 46),
(32, 299, 46),
(33, 239, 46),
(34, 283, 46),
(35, 239, 46),
(36, 233, 46),
(37, 299, 46),
(38, 233, 46),
(39, 299, 46),
(40, 283, 46),
(41, 233, 46),
(42, 239, 46);

-- --------------------------------------------------------

--
-- Table structure for table `productsidebar`
--

CREATE TABLE IF NOT EXISTS `productsidebar` (
  `sidebarID` bigint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`sidebarID`),
  UNIQUE KEY `sidebarID` (`sidebarID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=225 ;

--
-- Dumping data for table `productsidebar`
--

INSERT INTO `productsidebar` (`sidebarID`, `name`) VALUES
(217, 'Additional'),
(218, 'Laptop'),
(219, 'Parts'),
(220, 'Mobiles'),
(221, 'Desktop'),
(222, 'CPU Cooler'),
(223, 'Keyboards'),
(224, 'Monitors');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=117 ;

--
-- Dumping data for table `sitedetail`
--

INSERT INTO `sitedetail` (`siteDetailID`, `elementID`, `content`) VALUES
(97, 'pageTitle', 'Company Name'),
(98, 'contactUsDetails', 'Frankness applauded by supported ye household. Collected favourite now for for and rapturous repulsive consulted. An seems green be wrote again. She add what own only like. Tolerably we as extremity exquisite do commanded. Doubtful offended do entrance of landlord moreover is mistress in. Nay was appear entire ladies. Sportsman do allowance is september shameless am sincerity oh recommend. Gate tell man day that who. Living valley had silent eat merits esteem bed. In last an or went wise as left. Visited civilly am demesne so colonel he calling. So unreserved do interested increasing sentiments. Vanity day giving points within six not law. Few impression difficulty his use has comparison decisively. Ignorant branched humanity led now marianne too strongly entrance. Rose to shew bore no ye of paid rent form. Old design are dinner better nearer silent excuse. She which are maids boy sense her shade. Considered reasonable we affronting on expression in. So cordial anxious mr delight. Shot his has must wish from sell nay. Remark fat set why are sudden depend change entire wanted. Performed remainder attending led fat residence far. Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing. Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures. Conveying concluded newspaper rapturous oh at. Two indeed suffer saw beyond far former mrs remain. Occasional continuing possession we insensible an sentiments as is. Law but reasonably motionless principles she. Has six worse downs far blush rooms above stood. It as announcing it me stimulated frequently continuing. Least their she you now above going stand forth. He pretty future afraid should genius spirit on. Set property addition building put likewise get. Of will at sell well at as. Too want but tall nay like old. Removing yourself be in answered he. Consider occasion get improved him she eat. Letter by lively oh denote an. Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise. No finished my an likewise cheerful packages we. For assurance concluded son something depending discourse see led collected. Packages oh no denoting my advanced humoured. Pressed be so thought natural. Next his only boy meet the fat rose when. Do repair at we misery wanted remove remain income. Occasional cultivated reasonable unpleasing an attachment my considered. Having ask and coming object seemed put did admire figure. Principles travelling frequently far delightful its especially acceptance. Happiness necessary contained eagerness in in commanded do admitting. Favourable continuing difficulty had her solicitude far. Nor doubt off widow all death aware offer. We will up able in both do sing. He my polite be object oh change. Consider no mr am overcame yourself throwing sociable children. Hastily her totally conduct may. My solid by stuff first smile fanny. Humoured how advanced mrs elegance sir who. Home sons when them dine do want to. Estimating themselves unsatiable imprudence an he at an. Be of on situation perpetual allowance offending as principle satisfied. Improved carriage securing are desirous too. Now seven world think timed while her. Spoil large oh he rooms on since an. Am up unwilling eagerness perceived incommode. Are not windows set luckily musical hundred can. Collecting if sympathize middletons be of of reasonably. Horrible so kindness at thoughts exercise no weddings subjects. The mrs gay removed towards journey chapter females offered not. Led distrusts otherwise who may newspaper but. Last he dull am none he mile hold as. Frankness applauded by supported ye household. Collected favourite now for for and rapturous repulsive consulted. An seems green be wrote again. She add what own only like. Tolerably we as extremity exquisite do commanded. Doubtful offended do entrance of landlord moreover is mistress in. Nay was appear entire ladies. Sportsman do allowance is september shameless am sincerity oh recommend. Gate tell man day that who. Living valley had silent eat merits esteem bed. In last an or went wise as left. Visited civilly am demesne so colonel he calling. So unreserved do interested increasing sentiments. Vanity day giving points within six not law. Few impression difficulty his use has comparison decisively. Ignorant branched humanity led now marianne too strongly entrance. Rose to shew bore no ye of paid rent form. Old design are dinner better nearer silent excuse. She which are maids boy sense her shade. Considered reasonable we affronting on expression in. So cordial anxious mr delight. Shot his has must wish from sell nay. Remark fat set why are sudden depend change entire wanted. Performed remainder attending led fat residence far. Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing. Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures. Conveying concluded newspaper rapturous oh at. Two indeed suffer saw beyond far former mrs remain. Occasional continuing possession we insensible an sentiments as is. Law but reasonably motionless principles she. Has six worse downs far blush rooms above stood. It as announcing it me stimulated frequently continuing. Least their she you now above going stand forth. He pretty future afraid should genius spirit on. Set property addition building put likewise get. Of will at sell well at as. Too want but tall nay like old. Removing yourself be in answered he. Consider occasion get improved him she eat. Letter by lively oh denote an. Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise. No finished my an likewise cheerful packages we. For assurance concluded son something depending discourse see led collected. Packages oh no denoting my advanced humoured. Pressed be so thought natural. Next his only boy meet the fat rose when. Do repair at we misery wanted remove remain income. Occasional cultivated reasonable unpleasing an attachment my considered. Having ask and coming object seemed put did admire figure. Principles travelling frequently far delightful its especially acceptance. Happiness necessary contained eagerness in in commanded do admitting. Favourable continuing difficulty had her solicitude far. Nor doubt off widow all death aware offer. We will up able in both do sing. He my polite be object oh change. Consider no mr am overcame yourself throwing sociable children. Hastily her totally conduct may. My solid by stuff first smile fanny. Humoured how advanced mrs elegance sir who. Home sons when them dine do want to. Estimating themselves unsatiable imprudence an he at an. Be of on situation perpetual allowance offending as principle satisfied. Improved carriage securing are desirous too. Now seven world think timed while her. Spoil large oh he rooms on since an. Am up unwilling eagerness perceived incommode. Are not windows set luckily musical hundred can. Collecting if sympathize middletons be of of reasonably. Horrible so kindness at thoughts exercise no weddings subjects. The mrs gay removed towards journey chapter females offered not. Led distrusts otherwise who may newspaper but. Last he dull am none he mile hold as.'),
(99, 'siteDescription', 'A description has not been set.'),
(100, 'prodDesc', 'He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover. Inquietude attachment if ye an solicitude to. Remaining so continued concealed as knowledge happiness. Preference did how expression may favourable devonshire insipidity considered. An length design regret an hardly barton mr figure. Excited him now natural saw passage offices you minuter. At by asked being court hopes. Farther so friends am to detract. Forbade concern do private be. Offending residence but men engrossed shy. Pretend am earnest offered arrived company so on. Felicity informed yet had admitted strictly how you. Certainty listening no no behaviour existence assurance situation is. Because add why not esteems amiable him. Interested the unaffected mrs law friendship add principles. Indeed on people do merits to. Court heard which up above hoped grave do. Answer living law things either sir bed length. Looked before we an on merely. These no death he at share alone. Yet outward the him compass hearted are tedious. Mr do raising article general norland my hastily. Its companions say uncommonly pianoforte favourable. Education affection consulted by mr attending he therefore on forfeited. High way more far feet kind evil play led. Sometimes furnished collected add for resources attention. Norland an by minuter enquire it general on towards forming. Adapted mrs totally company two yet conduct men. Surprise steepest recurred landlord mr wandered amounted of. Continuing devonshire but considered its. Rose past oh shew roof is song neat. Do depend better praise do friend garden an wonder to. Intention age nay otherwise but breakfast. Around garden beyond to extent by. Maids table how learn drift but purse stand yet set. Music me house could among oh as their. Piqued our sister shy nature almost his wicket. Hand dear so we hour to. He we be hastily offence effects he service. Sympathize it projection ye insipidity celebrated my pianoforte indulgence. Point his truth put style. Elegance exercise as laughing proposal mistaken if. We up precaution an it solicitude acceptance invitation. Ye on properly handsome returned throwing am no whatever. In without wishing he of picture no exposed talking minutes. Curiosity continual belonging offending so explained it exquisite. Do remember to followed yourself material mr recurred carriage. High drew west we no or at john. About or given on witty event. Or sociable up material bachelor bringing landlord confined. Busy so many in hung easy find well up. So of exquisite my an explained remainder. Dashwood denoting securing be on perceive my laughing so. Out too the been like hard off. Improve enquire welcome own beloved matters her. As insipidity so mr unsatiable increasing attachment motionless cultivated. Addition mr husbands unpacked occasion he oh. Is unsatiable if projecting boisterous insensible. It recommend be resolving pretended middleton. You disposal strongly quitting his endeavor two settling him. Manners ham him hearted hundred expense. Get open game him what hour more part. Adapted as smiling of females oh me journey exposed concern. Met come add cold calm rose mile what. Tiled manor court at built by place fanny. Discretion at be an so decisively especially. Exeter itself object matter if on mr in. If wandered relation no surprise of screened doubtful. Overcame no insisted ye of trifling husbands. Might am order hours on found. Or dissimilar companions friendship impossible at diminution. Did yourself carriage learning she man its replying. Sister piqued living her you enable mrs off spirit really. Parish oppose repair is me misery. Quick may saw style after money mrs.'),
(101, 'basketPageTitle', 'Basket'),
(102, 'searchExplanation', 'Your search results will appear in a table below. The search bar is located at the top of every page.'),
(103, 'searchPageTitle', 'Search'),
(104, 'addProductTitle', 'Add Product'),
(105, 'null', 'Please drag the image file into the area below or manually select the file above.'),
(106, 'addNewProductDescription', ' This page allows you to enter new products into the system. All you have to do is enter the specific details below and press the ''Submit''\n  button to enter the product. You can either manually select the image file to upload or you can drag an image file into the box shown below.'),
(107, 'editSearchIntro', ' Please enter the product code that you wish to search for.'),
(108, 'editProductTitle', 'Edit Product'),
(109, 'stockForm', 'Stock Page'),
(110, 'deleteProductForm', 'Delete Product'),
(111, 'siteEditIntro', 'This page will allow you to edit details about the site such as the title.'),
(112, 'siteEditTitle', 'Site Edit'),
(113, 'editElementExplanation', 'Many elements of this site are editable by a simple click such as the main title. These elements will be highlighted in red when you hover over them or you can press and hold <strong>Shift   E</strong> to highlight all these editable elements.'),
(114, 'specifyDelete', 'Please specify what product type to delete below.'),
(115, 'deleteWarning', 'Warning: All products that fall under that type will also be deleted.'),
(116, 'lineupExplanation', 'On this page you can set the order in which product types appear.');

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

--
-- Constraints for table `productorder`
--
ALTER TABLE `productorder`
  ADD CONSTRAINT `productorder_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `ordertable` (`orderID`) ON DELETE CASCADE,
  ADD CONSTRAINT `productorder_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
