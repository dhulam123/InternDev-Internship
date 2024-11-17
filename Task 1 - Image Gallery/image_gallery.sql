-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2024 at 10:43 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `image_gallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `imagedetails`
--

CREATE TABLE `imagedetails` (
  `Id` int(10) NOT NULL,
  `Title` text NOT NULL,
  `Category` text NOT NULL,
  `Description` text NOT NULL,
  `Image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `imagedetails`
--

INSERT INTO `imagedetails` (`Id`, `Title`, `Category`, `Description`, `Image`) VALUES
(1, 'Image 1', 'Nature Photography', 'Nature photography is a broad category that includes a number of different types of photography, including landscape photography, wildlife photography, and sunrise photography', '1731826162553.jpg'),
(2, 'Image 2', 'Portrait Photography', 'Portrait photography, or portraiture, is a type of photography aimed toward capturing the personality of a person or group of people by using effective lighting, backdrops, and poses', '1731826316051.jpeg'),
(3, 'Image 3', 'Astro Photography', 'Astrophotography, also known as astronomical imaging, is the photography or imaging of astronomical objects, celestial events, or areas of the night sky.', '1731826427564.jpg'),
(4, 'Image 4 ', 'Pet Photography', 'Pet photography is a specialized type of photography that captures the beauty, personality, and spirit of pets, such as dogs, cats, and birds.', '1731826587290.jpg'),
(5, 'Image 5', 'Macro Photography', 'Macro photography is also known as close-up photography, photomacrography, or macrography. It\'s a style of photography that involves taking extreme close-ups of small subjects, like insects, flowers, or water droplets', '1731826615054.jpg'),
(6, 'Image 6', 'Strom Photography', 'Storm photography is the practice of capturing images of storms and lightning. It can be a thrilling way to document the unpredictable power of nature and the ever-changing weather.', '1731826636825.avif'),
(7, 'Image 7', 'Portrait Photography', 'Portrait photography, or portraiture, is a type of photography aimed toward capturing the personality of a person or group of people by using effective lighting, backdrops, and poses', '1731832986357.jpeg'),
(8, 'Image 7 ', 'Pet Photography', 'Pet photography is a specialized type of photography that captures the beauty, personality, and spirit of pets, such as dogs, cats, and birds.', '1731833022150.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `Username` text NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`Username`, `Password`) VALUES
('v@gmail.com', '$2a$10$Yqj7d5sfhodbYU/q/cgu8OzCYibuA83VERVhFICCGmz.4axY4dAcK'),
('vaishnavidhulam357@gmail.com', '$2a$10$OZNGY1Zolj2YnRcYIp4VgumgtXIaA5ukVBRmSrd47ckCzpRgqIOa6'),
('vaishnavidhulam357@gmail.com', '$2a$10$pdImkb5DSWNpIQexDTfJwuYhRYUYvxofucv1KYHO2VAlGarn8Tlw2'),
('vaishnavidhulam357@gmail.com', '$2a$10$A5IdFXW9Kq9c0g.H6XgMBu2zI06fOaMKWotlj0d8j4eaHBGeqYZgC'),
('vaishnavidhulam357@gmail.com', '$2a$10$nNdctXA99BOKrb2lDLanB.7mEETsftfGfzamZR5EvdfgVuYlOIJ72');

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `id` int(10) NOT NULL,
  `FullName` text NOT NULL,
  `EmailAddress` text NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`id`, `FullName`, `EmailAddress`, `Password`) VALUES
(1, 'vaishnavi dhulam', 'vaishnavidhulam357@gmail.com', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `imagedetails`
--
ALTER TABLE `imagedetails`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `imagedetails`
--
ALTER TABLE `imagedetails`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `signup`
--
ALTER TABLE `signup`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
