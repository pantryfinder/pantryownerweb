-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2021 at 08:01 PM
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
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `updationDate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `updationDate`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '22-10-2021 06:36:29 PM');

-- --------------------------------------------------------

--
-- Table structure for table `community_pantry`
--

CREATE TABLE `community_pantry` (
  `pantry_id` int(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pantry_name` varchar(100) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `list_of_items` varchar(300) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `municipality` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `region` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gcash_number` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `community_pantry`
--

INSERT INTO `community_pantry` (`pantry_id`, `user_id`, `pantry_name`, `phone_number`, `list_of_items`, `street_address`, `barangay`, `municipality`, `province`, `region`, `email`, `gcash_number`, `status`) VALUES
(1, 1, 'Kapito Pantry', '09665567621', 'Foods, Clothes', 'Purok 1', 'Kapito', 'Lian', 'Batangas', 'Region III', 'mai@gmail.com', '09425565157', 'Open'),
(2, 4, 'Calatagan Pantry', '09626676567', 'Clothes', 'Purok 6', 'Calatagan', 'Lian', 'Batangas', 'Region III', 'ivan@gmail.com', '09626676567', 'Open'),
(3, 6, 'Matabungkay Pantry', '09243321345', 'Foods', 'Purok 8', 'Matabungkay', 'Lian', 'Batangas', 'Region IV - A', 'pat@gmail.com', '09243321345', 'Open'),
(4, 7, 'San Diego Pantry', '0967556789', 'Foods, Clothes', 'Purok 3', 'San Diego', 'Lian', 'Batangas', 'Region IV - A', 'elma@gmail.com', '0967556789', 'Closed'),
(5, 1, 'Prenza Pantry', '09556245567', 'Foods', 'Purok 2', 'Prenza', 'Lian', 'Batangas', 'Region IV - A', 'mai@gmail.com', '09556245567', 'Closed');

-- --------------------------------------------------------

--
-- Table structure for table `donate_info`
--

CREATE TABLE `donate_info` (
  `donation_id` int(50) NOT NULL,
  `pantry_id` int(20) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_fname` varchar(100) NOT NULL,
  `user_lname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `date_of_donation` date NOT NULL,
  `transaction` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donate_info`
--

INSERT INTO `donate_info` (`donation_id`, `pantry_id`, `user_id`, `user_fname`, `user_lname`, `address`, `email`, `phone_number`, `date_of_donation`, `transaction`) VALUES
(1, 4, '2', 'Erika Joy', 'Macalindong', 'Luyahan, Lian, Batangas', 'ekay@gmail.com', '09656678765', '2021-10-27', 'Face to Face');

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
  `user_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `user_fname`, `user_mname`, `user_lname`, `user_contact`, `user_email`, `user_type`, `created_at`, `user_image`) VALUES
(1, 'mai', '2b28587f6d880ea9fc27c6c48fe3f1eb', 'Mylene', 'Rivera', 'Sanchez', '09877765432', 'mai@gmail.com', 'Owner', '2021-10-10', ''),
(2, 'ekay', '6fa3f7e3b3cb02ad3730b43830bb58a8', 'Erika Joy', 'Bangsagale', 'Macalindong', '09873456543', 'ekay@gmail.com', 'Donor', '2021-10-10', ''),
(3, 'vianca', '5a90d49ce01e744ac3236e30f54c60c1', 'Ma. Vianca', 'Doctor', 'Tumbaga', '09665432345', 'vianca@gmail.com', 'Donor', '2021-10-10', ''),
(4, 'ivan', '2c42e5cf1cdbafea04ed267018ef1511', 'Ivan', 'Lapitan', 'Sanchez', '09887653234', 'ivan@gmail.com', 'Owner', '2021-10-10', ''),
(5, 'aila', '7192bff14334c276c3b7ac02d11c7ede', 'Aila', 'Botones', 'Atienza', '09655564341', 'aila@gmail.com', 'Donor', '2021-10-10', ''),
(6, 'pat', '7852341745c93238222a65a910d1dcc5', 'Patty', 'Gonzales', 'Ellao', '09125543345', 'pat@gmail.com', 'Owner', '2021-10-10', ''),
(7, 'elma', 'ee10ce913a468513cb7a75e83980b506', 'Elma', 'Rivera', 'Sanchez', '09554443245', 'elma@gmail.com', 'Owner', '2021-10-22', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `community_pantry`
--
ALTER TABLE `community_pantry`
  ADD CONSTRAINT `community_pantry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
