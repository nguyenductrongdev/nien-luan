-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: nienluan
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CHUONG_TRINH_KHUYEN_MAI`
--

DROP TABLE IF EXISTS `CHUONG_TRINH_KHUYEN_MAI`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CHUONG_TRINH_KHUYEN_MAI` (
  `CTKM_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CTKN_TEN` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `CTKM_NGAYKETTHUC` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `CTKM_HESO` float DEFAULT NULL,
  PRIMARY KEY (`CTKM_MA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHUONG_TRINH_KHUYEN_MAI`
--

LOCK TABLES `CHUONG_TRINH_KHUYEN_MAI` WRITE;
/*!40000 ALTER TABLE `CHUONG_TRINH_KHUYEN_MAI` DISABLE KEYS */;
/*!40000 ALTER TABLE `CHUONG_TRINH_KHUYEN_MAI` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DIEN_THOAI`
--

DROP TABLE IF EXISTS `DIEN_THOAI`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DIEN_THOAI` (
  `DT_IMEI` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `LDT_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `HDB_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`DT_IMEI`),
  KEY `FK_DIENTHOAI_LOAIDIENTHOAI` (`LDT_MA`),
  KEY `FK_HOADONBAN_DIENTHOAI` (`HDB_MA`),
  CONSTRAINT `FK_DIENTHOAI_LOAIDIENTHOAI` FOREIGN KEY (`LDT_MA`) REFERENCES `LOAI_DIEN_THOAI` (`LDT_MA`),
  CONSTRAINT `FK_HOADONBAN_DIENTHOAI` FOREIGN KEY (`HDB_MA`) REFERENCES `HOA_DON_BAN` (`HDB_MA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DIEN_THOAI`
--

LOCK TABLES `DIEN_THOAI` WRITE;
/*!40000 ALTER TABLE `DIEN_THOAI` DISABLE KEYS */;
INSERT INTO `DIEN_THOAI` VALUES ('0011235','xm001',NULL);
/*!40000 ALTER TABLE `DIEN_THOAI` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HINH_ANH`
--

DROP TABLE IF EXISTS `HINH_ANH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HINH_ANH` (
  `HA_URL` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `LDT_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`HA_URL`),
  KEY `FK_HINHANH_DIENTHOAI` (`LDT_MA`),
  CONSTRAINT `FK_HINHANH_DIENTHOAI` FOREIGN KEY (`LDT_MA`) REFERENCES `LOAI_DIEN_THOAI` (`LDT_MA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HINH_ANH`
--

LOCK TABLES `HINH_ANH` WRITE;
/*!40000 ALTER TABLE `HINH_ANH` DISABLE KEYS */;
INSERT INTO `HINH_ANH` VALUES ('/uploads/ap0001_iphone11.jpeg','ap0001'),('/uploads/AS001_phoneROG3.jpeg','AS001'),('/uploads/nk001_nokia5.3.jpeg','nk001'),('/uploads/ss001_galaxy-a51.jpeg','ss001'),('/uploads/vs001_vsmart-live4.png','vs001'),('/uploads/xm001_phone.jpg','xm001'),('/uploads/xm002_redmi-note-8-pro.png','xm002');
/*!40000 ALTER TABLE `HINH_ANH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HOA_DON_BAN`
--

DROP TABLE IF EXISTS `HOA_DON_BAN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HOA_DON_BAN` (
  `HDB_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ND_TEN_DANG_NHAP` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `HDB_THOI_GIAN` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`HDB_MA`),
  KEY `FK_HOADONBAN_NGUOIDUNG` (`ND_TEN_DANG_NHAP`),
  CONSTRAINT `FK_HOADONBAN_NGUOIDUNG` FOREIGN KEY (`ND_TEN_DANG_NHAP`) REFERENCES `NGUOI_DUNG` (`ND_TEN_DANG_NHAP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HOA_DON_BAN`
--

LOCK TABLES `HOA_DON_BAN` WRITE;
/*!40000 ALTER TABLE `HOA_DON_BAN` DISABLE KEYS */;
/*!40000 ALTER TABLE `HOA_DON_BAN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LOAI_DIEN_THOAI`
--

DROP TABLE IF EXISTS `LOAI_DIEN_THOAI`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LOAI_DIEN_THOAI` (
  `LDT_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `NSX_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CTKM_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_TEN` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_TEN_CHIP` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_DUNG_LUONG_PIN` int DEFAULT NULL,
  `LDT_DUNG_LUONG_RAM` int DEFAULT NULL,
  `LDT_DUNG_LUONG_ROM` int DEFAULT NULL,
  `LDT_THONG_TIN_CUONG_LUC` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_JACK_TAI_NGHE` tinyint(1) DEFAULT NULL,
  `LDT_TOC_DO_SAC` int DEFAULT NULL,
  `LDT_GIA` int DEFAULT NULL,
  `LDT_LOAI_PIN` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_LOAI_MAN_HINH` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `LDT_DO_PHAN_GIAI` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`LDT_MA`),
  KEY `FK_CHUONGTRINHKHUYENMAI_DIENTHOAI` (`CTKM_MA`),
  KEY `FK_NHASANXUAT_DIENTHOAI` (`NSX_MA`),
  CONSTRAINT `FK_CHUONGTRINHKHUYENMAI_DIENTHOAI` FOREIGN KEY (`CTKM_MA`) REFERENCES `CHUONG_TRINH_KHUYEN_MAI` (`CTKM_MA`),
  CONSTRAINT `FK_NHASANXUAT_DIENTHOAI` FOREIGN KEY (`NSX_MA`) REFERENCES `NHA_SAN_XUAT` (`NSX_MA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOAI_DIEN_THOAI`
--

LOCK TABLES `LOAI_DIEN_THOAI` WRITE;
/*!40000 ALTER TABLE `LOAI_DIEN_THOAI` DISABLE KEYS */;
INSERT INTO `LOAI_DIEN_THOAI` VALUES ('ap0001','AP',NULL,'iphone 11 pro max','Apple A13',40000,4,64,'khong ro',1,18,30000000,'li-ion','LCD','Full HD+'),('AS001','AS',NULL,'ROG Phone 3','snapdragon 865',6000,12,128,'gorila glass 6',0,30,12000000,'li-ion','LCD','Full HD+'),('nk001','NK',NULL,'Nokia 5.3','snapdragon 665',4000,6,64,'không rõ',1,18,3850000,'li-ion','LCD','Full HD+'),('ss001','SS',NULL,'Galaxy A51','Exynos 9611',4000,8,128,'gorila glass 3',1,18,8090000,'li-ion','AMOLED','Full HD+'),('vs001','VS',NULL,'Live 4','Snapdragon 675',5000,6,64,'gorila glass 3',1,18,3600000,'li-ion','LCD','Full HD+'),('xm001','XM',NULL,'Redmi note 9S','snapdragon 720G',5000,6,128,'gorila glass 5',1,18,5600000,'li-ion','LCD','Full HD+'),('xm002','XM',NULL,'Redmi note 8 pro','Mediatek Helio G90T',4500,6,64,'gorila glass 5',1,18,5000000,'li-ion','LCD','Full HD+');
/*!40000 ALTER TABLE `LOAI_DIEN_THOAI` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NGUOI_DUNG`
--

DROP TABLE IF EXISTS `NGUOI_DUNG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NGUOI_DUNG` (
  `ND_TEN_DANG_NHAP` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `VT_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ND_MAT_KHAU` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_SO_DIEN_THOAI` char(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_EMAIL` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ND_AVATAR` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ND_TEN_DANG_NHAP`),
  KEY `FK_VAITRO_NGUOIDUNG` (`VT_MA`),
  CONSTRAINT `FK_VAITRO_NGUOIDUNG` FOREIGN KEY (`VT_MA`) REFERENCES `VAI_TRO` (`VT_MA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NGUOI_DUNG`
--

LOCK TABLES `NGUOI_DUNG` WRITE;
/*!40000 ALTER TABLE `NGUOI_DUNG` DISABLE KEYS */;
INSERT INTO `NGUOI_DUNG` VALUES ('admin','AD','admin','','',''),('trongb1709576','ND','123456789','0378693635','trong@gmail.com','/uploads/trongb1709576_satthu.jpg');
/*!40000 ALTER TABLE `NGUOI_DUNG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NHA_SAN_XUAT`
--

DROP TABLE IF EXISTS `NHA_SAN_XUAT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NHA_SAN_XUAT` (
  `NSX_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `NSX_TEN` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`NSX_MA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NHA_SAN_XUAT`
--

LOCK TABLES `NHA_SAN_XUAT` WRITE;
/*!40000 ALTER TABLE `NHA_SAN_XUAT` DISABLE KEYS */;
INSERT INTO `NHA_SAN_XUAT` VALUES ('AP','Apple'),('AS','Asus'),('NK','Nokia'),('SS','Samsung'),('VS','Vsmart'),('XM','Xiaomi');
/*!40000 ALTER TABLE `NHA_SAN_XUAT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VAI_TRO`
--

DROP TABLE IF EXISTS `VAI_TRO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VAI_TRO` (
  `VT_MA` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `VT_TEN` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`VT_MA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VAI_TRO`
--

LOCK TABLES `VAI_TRO` WRITE;
/*!40000 ALTER TABLE `VAI_TRO` DISABLE KEYS */;
INSERT INTO `VAI_TRO` VALUES ('AD','Quản trị viên'),('ND','Người dùng');
/*!40000 ALTER TABLE `VAI_TRO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-18 19:00:41
