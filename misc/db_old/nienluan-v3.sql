-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2020 at 09:20 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nienluan`
--

-- --------------------------------------------------------

--
-- Table structure for table `CHUONG_TRINH_KHUYEN_MAI`
--

CREATE TABLE `CHUONG_TRINH_KHUYEN_MAI` (
  `CTKM_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CTKM_TEN` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CTKM_NGAY_KET_THUC` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CTKM_HE_SO` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CHUONG_TRINH_KHUYEN_MAI`
--

INSERT INTO `CHUONG_TRINH_KHUYEN_MAI` (`CTKM_MA`, `CTKM_TEN`, `CTKM_NGAY_KET_THUC`, `CTKM_HE_SO`) VALUES
('1606290595985', 'Trung thu 2020', '2020-11-28', 0.1);

-- --------------------------------------------------------

--
-- Table structure for table `DIEN_THOAI`
--

CREATE TABLE `DIEN_THOAI` (
  `DT_IMEI` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `LDT_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `HDB_MA` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `HINH_ANH`
--

CREATE TABLE `HINH_ANH` (
  `HA_URL` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `LDT_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `HINH_ANH`
--

INSERT INTO `HINH_ANH` (`HA_URL`, `LDT_MA`) VALUES
('/uploads/AP001_iphone-xsmax.jpg', 'AP001'),
('/uploads/OP001_oppo-find-x2.jpg', 'OP001'),
('/uploads/SS001_galaxy-a51.jpeg', 'SS001'),
('/uploads/SS002_s20-ultra.jpeg', 'SS002'),
('/uploads/VS001_vsmart-live4.png', 'VS001'),
('/uploads/XM001_xiaomi-redmi-note-9S.jpg', 'XM001'),
('/uploads/XM002_redmi-note-8-pro.png', 'XM002');

-- --------------------------------------------------------

--
-- Table structure for table `HOA_DON_BAN`
--

CREATE TABLE `HOA_DON_BAN` (
  `HDB_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ND_TEN_DANG_NHAP` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HDB_THOI_GIAN` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `LOAI_DIEN_THOAI`
--

CREATE TABLE `LOAI_DIEN_THOAI` (
  `LDT_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `NSX_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CTKM_MA` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_TEN` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_TEN_CHIP` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_DUNG_LUONG_PIN` int(11) DEFAULT NULL,
  `LDT_DUNG_LUONG_RAM` int(11) DEFAULT NULL,
  `LDT_DUNG_LUONG_ROM` int(11) DEFAULT NULL,
  `LDT_THONG_TIN_CUONG_LUC` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_JACK_TAI_NGHE` tinyint(1) DEFAULT NULL,
  `LDT_TOC_DO_SAC` int(11) DEFAULT NULL,
  `LDT_GIA` int(11) DEFAULT NULL,
  `LDT_LOAI_PIN` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_LOAI_MAN_HINH` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_DO_PHAN_GIAI` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_GIA_MUA` int(11) DEFAULT NULL,
  `LDT_MO_TA` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `LOAI_DIEN_THOAI`
--

INSERT INTO `LOAI_DIEN_THOAI` (`LDT_MA`, `NSX_MA`, `CTKM_MA`, `LDT_TEN`, `LDT_TEN_CHIP`, `LDT_DUNG_LUONG_PIN`, `LDT_DUNG_LUONG_RAM`, `LDT_DUNG_LUONG_ROM`, `LDT_THONG_TIN_CUONG_LUC`, `LDT_JACK_TAI_NGHE`, `LDT_TOC_DO_SAC`, `LDT_GIA`, `LDT_LOAI_PIN`, `LDT_LOAI_MAN_HINH`, `LDT_DO_PHAN_GIAI`, `LDT_GIA_MUA`, `LDT_MO_TA`) VALUES
('AP001', 'AP', '1606290595985', 'iPhone Xs Max', 'Apple A13', 3150, 4, 128, 'Gorila glass 5', 1, 18, 30000000, 'li-ion', 'OLED', 'Full HD+', 2700000, ''),
('OP001', 'OP', '1606290595985', 'Find X2', 'Snapdragon 865', 6000, 12, 128, 'Gorilla Glass 6', 1, 65, 30000000, 'li-ion', 'LCD', 'Full HD+', 12000000, ''),
('SS001', 'SS', '1606290595985', 'Samsung Galaxy A51', 'Exynos 9611', 4000, 6, 64, 'Gorila glass 5', 1, 18, 5000000, 'li-ion', 'AMOLED', 'Full HD+', 4500000, ''),
('SS002', 'SS', NULL, 'Galaxy S20 Ultra', 'Exynos 990', 5000, 12, 512, 'Gorilla Glass 6', 1, 18, 3700000, 'li-ion', 'SUPPER AMOLED', 'Full HD+', 1700000, ''),
('VS001', 'VS', NULL, 'Vsmart Live 4', 'Snapdragon 675', 5000, 6, 64, 'Gorila glass 3', 1, 18, 4500000, 'li-ion', 'LCD', 'Full HD+', 4000000, ''),
('XM001', 'XM', NULL, 'Redmi note 9S', 'Snapdragon 720G', 5000, 6, 128, 'Gorila glass 5', 1, 18, 5500000, 'li-ion', 'LCD', 'Full HD+', 4500000, '<p>Author&#39;s smart phone</p>\r\n'),
('XM002', 'XM', NULL, 'Redmi note 8 pro', 'Mediatek Helio G90T', 4500, 6, 64, 'Gorila glass 5', 1, 18, 5000000, 'li-ion', 'LCD', 'Full HD+', 4000000, '');

-- --------------------------------------------------------

--
-- Table structure for table `NGUOI_DUNG`
--

CREATE TABLE `NGUOI_DUNG` (
  `ND_TEN_DANG_NHAP` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `VT_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ND_MAT_KHAU` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_SO_DIEN_THOAI` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_EMAIL` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_AVATAR` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `NGUOI_DUNG`
--

INSERT INTO `NGUOI_DUNG` (`ND_TEN_DANG_NHAP`, `VT_MA`, `ND_MAT_KHAU`, `ND_SO_DIEN_THOAI`, `ND_EMAIL`, `ND_AVATAR`) VALUES
('admin', 'AD', 'admin', NULL, NULL, '/uploads/admin.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `NHA_SAN_XUAT`
--

CREATE TABLE `NHA_SAN_XUAT` (
  `NSX_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `NSX_TEN` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `NHA_SAN_XUAT`
--

INSERT INTO `NHA_SAN_XUAT` (`NSX_MA`, `NSX_TEN`) VALUES
('AP', 'Apple'),
('AS', 'Asus'),
('NK', 'Nokia'),
('OP', 'Oppo'),
('SS', 'Samsung'),
('VS', 'Vsmart'),
('XM', 'Xiaomi');

-- --------------------------------------------------------

--
-- Table structure for table `VAI_TRO`
--

CREATE TABLE `VAI_TRO` (
  `VT_MA` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `VT_TEN` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `VAI_TRO`
--

INSERT INTO `VAI_TRO` (`VT_MA`, `VT_TEN`) VALUES
('AD', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CHUONG_TRINH_KHUYEN_MAI`
--
ALTER TABLE `CHUONG_TRINH_KHUYEN_MAI`
  ADD PRIMARY KEY (`CTKM_MA`);

--
-- Indexes for table `DIEN_THOAI`
--
ALTER TABLE `DIEN_THOAI`
  ADD PRIMARY KEY (`DT_IMEI`),
  ADD KEY `FK_DIENTHOAI_LOAIDIENTHOAI` (`LDT_MA`),
  ADD KEY `FK_HOADONBAN_DIENTHOAI` (`HDB_MA`);

--
-- Indexes for table `HINH_ANH`
--
ALTER TABLE `HINH_ANH`
  ADD PRIMARY KEY (`HA_URL`),
  ADD KEY `FK_HINHANH_DIENTHOAI` (`LDT_MA`);

--
-- Indexes for table `HOA_DON_BAN`
--
ALTER TABLE `HOA_DON_BAN`
  ADD PRIMARY KEY (`HDB_MA`),
  ADD KEY `FK_HOADONBAN_NGUOIDUNG` (`ND_TEN_DANG_NHAP`);

--
-- Indexes for table `LOAI_DIEN_THOAI`
--
ALTER TABLE `LOAI_DIEN_THOAI`
  ADD PRIMARY KEY (`LDT_MA`),
  ADD KEY `FK_CHUONGTRINHKHUYENMAI_DIENTHOAI` (`CTKM_MA`),
  ADD KEY `FK_NHASANXUAT_DIENTHOAI` (`NSX_MA`);

--
-- Indexes for table `NGUOI_DUNG`
--
ALTER TABLE `NGUOI_DUNG`
  ADD PRIMARY KEY (`ND_TEN_DANG_NHAP`),
  ADD KEY `FK_VAITRO_NGUOIDUNG` (`VT_MA`);

--
-- Indexes for table `NHA_SAN_XUAT`
--
ALTER TABLE `NHA_SAN_XUAT`
  ADD PRIMARY KEY (`NSX_MA`);

--
-- Indexes for table `VAI_TRO`
--
ALTER TABLE `VAI_TRO`
  ADD PRIMARY KEY (`VT_MA`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `DIEN_THOAI`
--
ALTER TABLE `DIEN_THOAI`
  ADD CONSTRAINT `FK_DIENTHOAI_LOAIDIENTHOAI` FOREIGN KEY (`LDT_MA`) REFERENCES `LOAI_DIEN_THOAI` (`LDT_MA`),
  ADD CONSTRAINT `FK_HOADONBAN_DIENTHOAI` FOREIGN KEY (`HDB_MA`) REFERENCES `HOA_DON_BAN` (`HDB_MA`);

--
-- Constraints for table `HINH_ANH`
--
ALTER TABLE `HINH_ANH`
  ADD CONSTRAINT `FK_HINHANH_DIENTHOAI` FOREIGN KEY (`LDT_MA`) REFERENCES `LOAI_DIEN_THOAI` (`LDT_MA`);

--
-- Constraints for table `HOA_DON_BAN`
--
ALTER TABLE `HOA_DON_BAN`
  ADD CONSTRAINT `FK_HOADONBAN_NGUOIDUNG` FOREIGN KEY (`ND_TEN_DANG_NHAP`) REFERENCES `NGUOI_DUNG` (`ND_TEN_DANG_NHAP`);

--
-- Constraints for table `LOAI_DIEN_THOAI`
--
ALTER TABLE `LOAI_DIEN_THOAI`
  ADD CONSTRAINT `FK_CHUONGTRINHKHUYENMAI_DIENTHOAI` FOREIGN KEY (`CTKM_MA`) REFERENCES `CHUONG_TRINH_KHUYEN_MAI` (`CTKM_MA`),
  ADD CONSTRAINT `FK_NHASANXUAT_DIENTHOAI` FOREIGN KEY (`NSX_MA`) REFERENCES `NHA_SAN_XUAT` (`NSX_MA`);

--
-- Constraints for table `NGUOI_DUNG`
--
ALTER TABLE `NGUOI_DUNG`
  ADD CONSTRAINT `FK_VAITRO_NGUOIDUNG` FOREIGN KEY (`VT_MA`) REFERENCES `VAI_TRO` (`VT_MA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
