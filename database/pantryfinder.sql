-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2021 at 08:50 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pantryfinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `updationDate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `full_name`, `username`, `password`, `updationDate`) VALUES
(1, '', 'admin', '21232f297a57a5a743894a0e4a801fc3', '22-10-2021 06:36:29 PM'),
(4, 'Vea Bianca Macalindong', 'vea', 'd0f36a6500c4f9c2ce4e042dd8b46a2e', '');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `pantry_id` int(10) NOT NULL,
  `user_fname` varchar(50) NOT NULL,
  `user_lname` varchar(50) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `pantry_id`, `user_fname`, `user_lname`, `comment`, `created_at`) VALUES
(1, 2, 7, 'Erika Joy', 'Macalindong', 'Hi', '2021-11-22'),
(2, 2, 7, 'Erika Joy', 'Macalindong', 'hello', '2021-11-22'),
(3, 2, 6, 'Erika Joy', 'Macalindong', 'hello', '2021-11-22'),
(4, 2, 8, 'Erika Joy', 'Macalindong', 'Hello', '2021-12-13');

-- --------------------------------------------------------

--
-- Table structure for table `community_pantry`
--

CREATE TABLE `community_pantry` (
  `pantry_id` int(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pantry_name` varchar(100) NOT NULL,
  `user_contact` varchar(100) NOT NULL,
  `category_1` int(11) NOT NULL,
  `category_2` int(11) NOT NULL,
  `category_3` int(11) NOT NULL,
  `list_of_items` varchar(300) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `municipality` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `gcash_number` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `community_pantry`
--

INSERT INTO `community_pantry` (`pantry_id`, `user_id`, `pantry_name`, `user_contact`, `category_1`, `category_2`, `category_3`, `list_of_items`, `latitude`, `longitude`, `street_address`, `barangay`, `municipality`, `province`, `user_email`, `open_time`, `close_time`, `gcash_number`, `status`) VALUES
(1, 1, 'Kapito Pantry', '09554171650', 0, 0, 0, 'Gulay, prutas, bigas, mga cup noodles', '120.658259', '14.029099', 'Purok 1', 'Kapito', 'Lian', 'Batangas', 'mai@gmail.com', '00:00:00', '00:00:00', '09425565157', 'Open'),
(2, 4, 'Calatagan Pantry', '09626676567', 0, 0, 0, 'Clothes', '120.632530', '13.832740', 'Purok 6', 'Calatagan', 'Lian', 'Batangas', 'ivan@gmail.com', '00:00:00', '00:00:00', '09626676567', 'Need Donation'),
(3, 6, 'Matabungkay Pantry', '09243321345', 0, 0, 0, 'Foods', '120.631973', '13.948290', 'Purok 8', 'Matabungkay', 'Lian', 'Batangas', 'pat@gmail.com', '00:00:00', '00:00:00', '09243321345', 'Need Donation'),
(4, 7, 'San Diego Pantry', '0967556789', 0, 0, 0, 'Foods, Clothes', '120.653350', ' 14.033350', 'Purok 3', 'San Diego', 'Lian', 'Batangas', 'elma@gmail.com', '00:00:00', '00:00:00', '0967556789', 'Closed'),
(5, 15, 'Donation for typhoon victims', '09261886566', 0, 0, 0, 'Delata, bigas, shampoo, damit, cup noodles, hygiene kits', '120.653831', '13.995670', 'Silangan', 'Puting kahoy', 'Lian', 'Batangas', 'erkmacalindong@gmail.com', '00:00:00', '00:00:00', '09261886566', 'Need Donation'),
(6, 15, 'Donations for Ligtasin health center', '09261886566', 0, 0, 0, 'Bigas, tinapay, gulay, saging, cup noodles', '120.618680', '13.960420', 'Ilinahan', 'Ligtasin', 'Lian', 'Batangas', 'erkmacalindong@gmail.com', '00:00:00', '00:00:00', '09261886566', 'Open'),
(7, 15, 'Binubusan Pantry', '09261886566', 0, 0, 0, 'Gulay, prutas', ' 120.63743643386401', '13.977086271629116', 'Silangan', 'Binubusan', 'Lian', 'Batangas', 'erkmacalindong@gmail.com', '00:00:00', '00:00:00', '09261886566', 'Open'),
(8, 16, 'Sarahs', '09786562728', 0, 0, 0, 'sfsf', '120.65360158681872', '14.036613621246458', 'ds', 'dfsd', 'sdfs', 'dsfsdf', 'sarah@gmail.com', '00:00:00', '00:00:00', '09776545678', 'Open'),
(9, 1, 'sdsd', '09554171650', 1, 1, 0, 'xzX', '', '', 'ZXz', 'xcxz', 'zxczx', 'zxcxz', 'mai@gmail.com', '00:00:00', '00:00:00', '09887632728', 'Open'),
(10, 1, 'Testing', '09554171650', 0, 1, 0, 'fdsfs', '', '', 'dsfdsdsfd', 'sdfds', 'dsfsd', 'sdfdsf', 'mai@gmail.com', '00:00:00', '00:00:00', '098882635827', 'Open'),
(11, 1, 'Testing 2', '09554171650', 1, 0, 1, 'xxxx', '', '', 'ere', 'eet', 'sdgs', 'dgsg', 'mai@gmail.com', '00:00:00', '00:00:00', '09878787887', 'Open'),
(12, 1, 'Testing 3', '09554171650', 0, 0, 1, 'xx', '', '', 'wws', 'dss', 'ds', 'sdsd', 'mai@gmail.com', '00:00:00', '00:00:00', '09373737373', 'Open'),
(13, 1, 'Testing 4', '09554171650', 0, 1, 1, 'sadasada', '', '', 'sdasd', 'sada', 'asdsa', 'asdasd', 'mai@gmail.com', '08:59:00', '00:00:00', '09908987986', 'Open'),
(14, 1, 'Testing 5', '09554171650', 1, 1, 0, 'saad', '', '', 'sdas', 'asd', 'asd', 'asdasd', 'mai@gmail.com', '02:45:00', '00:00:00', '09636363728', 'Open'),
(15, 1, 'Testing 6', '09554171650', 0, 1, 1, 'dsad', '', '', 'asdsa', 'sdad', 'sasd', 'asdas', 'mai@gmail.com', '01:21:00', '15:25:00', '097373736263', 'Open'),
(16, 1, 'sfsdfs', '09554171650', 1, 1, 0, 'dasds', '', '', 'dasf', 'safsaf', 'sfas', 'sfsa', 'mai@gmail.com', '03:42:00', '15:40:00', '09772726161', 'Open');

-- --------------------------------------------------------

--
-- Table structure for table `donate_info`
--

CREATE TABLE `donate_info` (
  `donation_id` int(50) NOT NULL,
  `pantry_id` int(20) NOT NULL,
  `user_id` int(10) NOT NULL,
  `user_fname` varchar(100) NOT NULL,
  `user_lname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_contact` varchar(100) NOT NULL,
  `date_of_donation` datetime NOT NULL,
  `transaction` varchar(100) NOT NULL,
  `statusofdonate` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donate_info`
--

INSERT INTO `donate_info` (`donation_id`, `pantry_id`, `user_id`, `user_fname`, `user_lname`, `address`, `user_email`, `user_contact`, `date_of_donation`, `transaction`, `statusofdonate`, `created_at`) VALUES
(1, 1, 2, 'Erika Joy', 'Macalindong', 'Luyahan', 'ekay@gmail.com', '09451151236', '2021-11-22 13:00:00', 'Face to Face', 1, '2021-11-22'),
(3, 1, 3, 'Ma. Vianca', 'Tumbaga', 'ssss', 'vianca@gmail.com', '09512826385', '2021-12-14 22:12:00', 'Face to Face', 0, '2021-12-13'),
(4, 1, 3, 'Ma. Vianca', 'Tumbaga', 'eeee', 'vianca@gmail.com', '09451151236', '2021-12-15 22:26:00', 'Face to Face', 1, '2021-12-13'),
(5, 1, 2, 'Erika Joyx', 'Macalindong', 'jjjj', 'ekay@gmail.com', '09556330045', '2021-12-15 10:40:00', 'Face to Face', 1, '2021-12-14'),
(7, 8, 2, 'Erika Joyx', 'Macalindong', 'ccc', 'ekay@gmail.com', '09556330045', '2021-12-15 11:33:00', 'Face to Face', 1, '2021-12-14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_fname` varchar(100) NOT NULL,
  `user_mname` varchar(100) NOT NULL,
  `user_lname` varchar(100) NOT NULL,
  `user_contact` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `tac` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `user_fname`, `user_mname`, `user_lname`, `user_contact`, `user_email`, `user_type`, `created_at`, `tac`) VALUES
(1, 'mai', '2b28587f6d880ea9fc27c6c48fe3f1eb', 'Mylene', 'Rivera', 'Sanchez', '09554171650', 'mai@gmail.com', 'Owner', '2021-10-10', ''),
(2, 'ekay', '00e1b2779fbbf096028bb9faab9707ce', 'Erika Joyx', 'Bangsagale', 'Macalindong', '09556330045', 'ekay@gmail.com', 'Donor', '2021-10-10', ''),
(3, 'vianca', '5a90d49ce01e744ac3236e30f54c60c1', 'Ma. Vianca', 'Doctor', 'Tumbaga', '09512826385', 'vianca@gmail.com', 'Donor', '2021-10-10', ''),
(4, 'ivan', '2c42e5cf1cdbafea04ed267018ef1511', 'Ivan', 'Lapitan', 'Sanchez', '09887653234', 'ivan@gmail.com', 'Owner', '2021-10-10', ''),
(5, 'aila', '7192bff14334c276c3b7ac02d11c7ede', 'Aila', 'Botones', 'Atienza', '09655564341', 'aila@gmail.com', 'Donor', '2021-10-10', ''),
(6, 'pat', '774b0f1bf72b404b1a52d1010138ab07', 'Patty', 'Gonzales', 'Ellao', '09125543345', 'pat@gmail.com', 'Owner', '2021-10-10', ''),
(7, 'elma', 'ee10ce913a468513cb7a75e83980b506', 'Elma', 'Rivera', 'Sanchez', '09554443242', 'elma@gmail.com', 'Owner', '2021-10-22', ''),
(8, 'vea', '9a646feddd984d22579fc7e34b579735', 'vea', 'vea', 'vea', '094511512345', 'ueuububfefeuufeuhfehfuefuehuef', 'Donor', '2021-10-28', ''),
(11, 'marites', '37bd331bea852bf472280bf21f9db1e7', 'marites', 'd', 'doctor', '09451123341', 'marites@gmail.com', 'Owner', '2021-10-30', ''),
(14, 'gloria', '854f4b5e77e0fdff8589fc43c970ff81', 'Gloria', 'Rivera', 'Sanchez', '09512826385', 'gloria@gmail.com', 'Donor', '2021-11-14', ''),
(15, 'emily', '1df56ea25b9d15ed36ff577832fdfbc5', 'Emily', 'B', 'Macalindong', '09261886566', 'erkmacalindong@gmail.com', 'Owner', '2021-11-21', '1'),
(16, 'sarah', '7eb04fc3f78947e1f784b7bee626515a', 'Sarah', 'Geronimo', 'Rivera', '09786562728', 'sarah@gmail.com', 'Owner', '2021-12-13', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pantry_id` (`pantry_id`);

--
-- Indexes for table `community_pantry`
--
ALTER TABLE `community_pantry`
  ADD PRIMARY KEY (`pantry_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `donate_info`
--
ALTER TABLE `donate_info`
  ADD PRIMARY KEY (`donation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`pantry_id`) REFERENCES `community_pantry` (`pantry_id`);

--
-- Constraints for table `community_pantry`
--
ALTER TABLE `community_pantry`
  ADD CONSTRAINT `community_pantry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
