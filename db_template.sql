-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jetway
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airlines`
--

DROP TABLE IF EXISTS `airlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airlines` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `country_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `airlines_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  CONSTRAINT `airlines_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airlines`
--

LOCK TABLES `airlines` WRITE;
/*!40000 ALTER TABLE `airlines` DISABLE KEYS */;
/*!40000 ALTER TABLE `airlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Albania'),(2,'Andorra'),(3,'Angola'),(4,'Antigua & Deps'),(5,'Argentina'),(6,'Armenia'),(7,'Australia'),(8,'Austria'),(9,'Azerbaijan'),(10,'Bahamas'),(11,'Bahrain'),(12,'Barbados'),(13,'Belarus'),(14,'Belgium'),(15,'Belize'),(16,'Benin'),(17,'Bhutan'),(18,'Bolivia'),(19,'Bosnia Herzegovina'),(20,'Botswana'),(21,'Brazil'),(22,'Bulgaria'),(23,'Burkina'),(24,'Burundi'),(25,'Cambodia'),(26,'Cameroon'),(27,'Canada'),(28,'Cape Verde'),(29,'Central African Rep'),(30,'Chad'),(31,'Chile'),(32,'China'),(33,'Colombia'),(34,'Congo'),(35,'Costa Rica'),(36,'Croatia'),(37,'Cyprus'),(38,'Czech Republic'),(39,'Denmark'),(40,'Dominican Republic'),(41,'East Timor'),(42,'Ecuador'),(43,'Egypt'),(44,'El Salvador'),(45,'Equatorial Guinea'),(46,'Eritrea'),(47,'Estonia'),(48,'Ethiopia'),(49,'Fiji'),(50,'Finland'),(51,'France'),(52,'Gabon'),(53,'Gambia'),(54,'Georgia'),(55,'Germany'),(56,'Ghana'),(57,'Greece'),(58,'Grenada'),(59,'Guatemala'),(60,'Guinea'),(61,'Guinea-Bissau'),(62,'Guyana'),(63,'Haiti'),(64,'Honduras'),(65,'Hungary'),(66,'Iceland'),(67,'India'),(68,'Indonesia'),(69,'Ireland Republic'),(70,'Israel'),(71,'Italy'),(72,'Ivory Coast'),(73,'Jamaica'),(74,'Japan'),(75,'Jordan'),(76,'Kazakhstan'),(77,'Kenya'),(78,'Kiribati'),(79,'Korea South'),(80,'Kosovo'),(81,'Kyrgyzstan'),(82,'Laos'),(83,'Latvia'),(84,'Lesotho'),(85,'Liberia'),(86,'Liechtenstein'),(87,'Lithuania'),(88,'Luxembourg'),(89,'Macedonia'),(90,'Madagascar'),(91,'Malawi'),(92,'Maldives'),(93,'Malta'),(94,'Marshall Islands'),(95,'Mauritius'),(96,'Mexico'),(97,'Micronesia'),(98,'Moldova'),(99,'Monaco'),(100,'Mongolia'),(101,'Montenegro'),(102,'Morocco'),(103,'Mozambique'),(104,'Myanmar'),(105,'Namibia'),(106,'Nauru'),(107,'Nepal'),(108,'Netherlands'),(109,'New Zealand'),(110,'Nicaragua'),(111,'Nigeria'),(112,'Norway'),(113,'Oman'),(114,'Palau'),(115,'Panama'),(116,'Papua New Guinea'),(117,'Paraguay'),(118,'Peru'),(119,'Philippines'),(120,'Poland'),(121,'Portugal'),(122,'Romania'),(123,'Russian Federation'),(124,'Rwanda'),(125,'Samoa'),(126,'San Marino'),(127,'Senegal'),(128,'Serbia'),(129,'Seychelles'),(130,'Sierra Leone'),(131,'Singapore'),(132,'Slovakia'),(133,'Slovenia'),(134,'Solomon Islands'),(135,'South Africa'),(136,'South Sudan'),(137,'Spain'),(138,'Sri Lanka'),(139,'Suriname'),(140,'Swaziland'),(141,'Sweden'),(142,'Switzerland'),(143,'Taiwan'),(144,'Tajikistan'),(145,'Tanzania'),(146,'Thailand'),(147,'Togo'),(148,'Tonga'),(149,'Trinidad & Tobago'),(150,'Turkey'),(151,'Turkmenistan'),(152,'Tuvalu'),(153,'Uganda'),(154,'Ukraine'),(155,'United Arab Emirates'),(156,'United Kingdom'),(157,'United States'),(158,'Uruguay'),(159,'Uzbekistan'),(160,'Vanuatu'),(161,'Vietnam'),(162,'Zambia'),(163,'Zimbabwe');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_no` varchar(13) NOT NULL,
  `credit_card` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `credit_card` (`credit_card`),
  UNIQUE KEY `phone_no` (`phone_no`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `airline_company_id` bigint NOT NULL,
  `origin_country_id` int NOT NULL,
  `destination_country_id` int NOT NULL,
  `departure_time` datetime NOT NULL,
  `landing_time` datetime NOT NULL,
  `remaining_tickets` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `airline_company_id` (`airline_company_id`),
  KEY `destination_country_id` (`destination_country_id`),
  KEY `origin_country_id` (`origin_country_id`),
  CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`airline_company_id`) REFERENCES `airlines` (`id`),
  CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`destination_country_id`) REFERENCES `countries` (`id`),
  CONSTRAINT `flights_ibfk_3` FOREIGN KEY (`origin_country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(80) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','Manage Customers, users, and airlines'),(2,'airline','Manage flights'),(3,'customer','Buy tickets, search for flights'),(4,'unasigned','Pending admin approval');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `flight_id` bigint NOT NULL,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `flight_id` (`flight_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(128) NOT NULL,
  `user_role` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `user_role` (`user_role`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-11 23:55:57
