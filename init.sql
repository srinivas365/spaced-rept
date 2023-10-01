-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (arm64)
--
-- Host: localhost    Database: SPACED_REP
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SP_CATEGORY`
--


DROP TABLE IF EXISTS `SP_CATEGORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SP_CATEGORY` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint DEFAULT '1',
  `dtCreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `dtUpdated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SP_CATEGORY`
--

LOCK TABLES `SP_CATEGORY` WRITE;
/*!40000 ALTER TABLE `SP_CATEGORY` DISABLE KEYS */;
INSERT IGNORE INTO `SP_CATEGORY` VALUES (1,'Leetcode',1,'2023-09-24 11:25:09','2023-09-24 11:25:09'),(2,'Pyspark',1,'2023-09-24 11:25:09','2023-09-24 11:25:09'),(3,'System Design',1,'2023-09-24 11:25:09','2023-09-24 11:25:09'),(4,'Hadoop',1,'2023-09-24 22:28:56','2023-09-24 22:28:56'),(5,'Airflow',1,'2023-09-24 22:28:56','2023-09-24 22:28:56'),(6,'Java',1,'2023-09-24 22:28:56','2023-09-24 22:28:56'),(7,'Python',1,'2023-09-24 22:28:56','2023-09-24 22:28:56'),(8,'Hive',1,'2023-09-24 22:28:56','2023-09-24 22:28:56'),(9,'Kafka',1,'2023-09-24 22:28:56','2023-09-24 22:28:56'),(10,'Azure ADF',1,'2023-09-24 22:28:56','2023-09-24 22:28:56'),(11,'Databricks',1,'2023-09-24 22:28:56','2023-09-24 22:28:56');
/*!40000 ALTER TABLE `SP_CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SP_LEVEL_OFFSET`
--

DROP TABLE IF EXISTS `SP_LEVEL_OFFSET`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SP_LEVEL_OFFSET` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `offset` int NOT NULL,
  `status` tinyint DEFAULT '1',
  `dtCreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `dtUpdated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SP_LEVEL_OFFSET`
--

LOCK TABLES `SP_LEVEL_OFFSET` WRITE;
/*!40000 ALTER TABLE `SP_LEVEL_OFFSET` DISABLE KEYS */;
INSERT IGNORE INTO `SP_LEVEL_OFFSET` VALUES (1,'Self','Very Easy',10,1,'2023-09-24 11:26:32','2023-09-24 11:26:32'),(2,'Self','Easy',7,1,'2023-09-24 11:26:32','2023-09-24 11:26:32'),(3,'Self','Medium',4,1,'2023-09-24 11:26:32','2023-09-24 11:26:32'),(4,'Self','Hard',2,1,'2023-09-24 11:26:32','2023-09-24 11:26:32'),(5,'Editorial','Easy',3,1,'2023-09-24 11:26:38','2023-09-24 11:26:38'),(6,'Editorial','Medium',2,1,'2023-09-24 11:26:38','2023-09-24 11:26:38'),(7,'Editorial','Hard',1,1,'2023-09-24 11:26:39','2023-09-24 11:26:39'),(8,'Editorial','Very Easy',5,1,'2023-09-24 15:53:44','2023-09-24 15:53:44');
/*!40000 ALTER TABLE `SP_LEVEL_OFFSET` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SP_SUBMISSION`
--

DROP TABLE IF EXISTS `SP_SUBMISSION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SP_SUBMISSION` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `rts` int NOT NULL,
  `dtCreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `dtUpdated` datetime DEFAULT CURRENT_TIMESTAMP,
  `done` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SP_SUBMISSION`
--

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-02  0:53:00
