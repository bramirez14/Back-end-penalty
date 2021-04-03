-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: intranet
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `anticipos`
--

DROP TABLE IF EXISTS `anticipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anticipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sueldo` varchar(45) DEFAULT NULL,
  `cuotas` int DEFAULT NULL,
  `importe` decimal(10,0) DEFAULT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `mensaje` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL,
  `usuId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioID_idx` (`usuId`),
  CONSTRAINT `usuId` FOREIGN KEY (`usuId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anticipos`
--

LOCK TABLES `anticipos` WRITE;
/*!40000 ALTER TABLE `anticipos` DISABLE KEYS */;
INSERT INTO `anticipos` VALUES (80,NULL,NULL,NULL,NULL,NULL,'2021-04-02 05:54:51','2021-04-02 05:54:51',NULL,NULL),(81,'Sueldo',2,54545,'2/4/2021','sadsadasdasd','2021-04-02 06:30:45','2021-04-02 06:30:45',NULL,4);
/*!40000 ALTER TABLE `anticipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departamento` varchar(50) DEFAULT NULL,
  `gerenteId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'Sistemas',1,NULL,NULL,NULL),(2,'Logistica',1,NULL,NULL,NULL),(3,'Ventas',2,NULL,NULL,NULL),(4,'Marketing',2,NULL,NULL,NULL),(5,'Administracion',3,NULL,NULL,NULL);
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formapagos`
--

DROP TABLE IF EXISTS `formapagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formapagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pago` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formapagos`
--

LOCK TABLES `formapagos` WRITE;
/*!40000 ALTER TABLE `formapagos` DISABLE KEYS */;
INSERT INTO `formapagos` VALUES (1,'Efectivo'),(2,'Tarjeta de Credito'),(3,'Tarjeta de Debito'),(4,'Tarjeta Recargable');
/*!40000 ALTER TABLE `formapagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gerentes`
--

DROP TABLE IF EXISTS `gerentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gerentes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerentes`
--

LOCK TABLES `gerentes` WRITE;
/*!40000 ALTER TABLE `gerentes` DISABLE KEYS */;
INSERT INTO `gerentes` VALUES (1,'Esteban','Ramos','esteban@penalty.com.ar'),(2,'Cristian','De Sousa','cristian.desousa@penalty.com.ar'),(3,'Cristian','Rios','cristian.rios@penalty.com.ar');
/*!40000 ALTER TABLE `gerentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615417219/idozg0ugq9xxhcuzpgkw.jpg','2021-03-10 22:55:58','2021-03-10 22:55:58',NULL),(2,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615417221/saotqg04ybvtbhhca215.jpg','2021-03-10 22:55:58','2021-03-10 22:55:58',NULL),(3,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615417222/zhvy4jktqknrffnphppw.jpg','2021-03-10 22:55:58','2021-03-10 22:55:58',NULL),(4,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615520878/pae4derubspxrx48ypym.jpg','2021-03-12 03:43:55','2021-03-12 03:43:55',NULL),(5,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615520879/xtzulhh9cma7ipdkbaea.jpg','2021-03-12 03:43:55','2021-03-12 03:43:55',NULL),(6,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615521170/qtjdmnvzzhotdg307fcn.jpg','2021-03-12 03:48:50','2021-03-12 03:48:50',NULL),(7,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615521172/vnofsjmq7wzltftcwywb.jpg','2021-03-12 03:48:50','2021-03-12 03:48:50',NULL),(8,'https://res.cloudinary.com/dtabhpdet/image/upload/v1615521173/ftaa10bih2rebychi2fu.jpg','2021-03-12 03:48:50','2021-03-12 03:48:50',NULL);
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rendiciones`
--

DROP TABLE IF EXISTS `rendiciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rendiciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departamento` varchar(100) DEFAULT NULL,
  `responsable` varchar(45) DEFAULT NULL,
  `item` varchar(200) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `importe` decimal(10,0) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `pagoId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  KEY `pagoId_idx` (`pagoId`),
  CONSTRAINT `pagoId` FOREIGN KEY (`pagoId`) REFERENCES `formapagos` (`id`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rendiciones`
--

LOCK TABLES `rendiciones` WRITE;
/*!40000 ALTER TABLE `rendiciones` DISABLE KEYS */;
INSERT INTO `rendiciones` VALUES (1,'Sistemas','Esteban','ssd','informatica',5000,'potenciar las  pc',2,NULL,NULL,NULL,NULL),(2,NULL,NULL,'c','c',15,NULL,NULL,NULL,'2021-03-10 21:34:17','2021-03-10 21:34:17',NULL),(3,NULL,NULL,'SSD','Informatica',5000,NULL,NULL,NULL,'2021-03-10 21:44:09','2021-03-10 21:44:09',NULL),(4,'sadasdas','','asdas','asdas',5454,'asdsadsadasdasdsadasdasdasd',NULL,NULL,'2021-03-10 22:05:52','2021-03-10 22:05:52',NULL),(5,'sadasdaszczxczxcxzc','','asdas','asdas',5454,'asdsadsadasdasdsadasdasdasd',NULL,NULL,'2021-03-10 22:06:54','2021-03-10 22:06:54',NULL),(6,'sadasdaszczxczxcxzc','','asdas','dasdas',5454,'',NULL,NULL,'2021-03-10 22:15:51','2021-03-10 22:15:51',NULL),(7,'z<','<z','<z','<z',2,'x',NULL,NULL,'2021-03-10 22:19:53','2021-03-10 22:19:53',NULL),(8,'z<','<z','<z','<z',2,'x',NULL,NULL,'2021-03-10 22:20:06','2021-03-10 22:20:06',NULL),(9,'t','t','t','t',4,'asdsd',NULL,NULL,'2021-03-10 22:21:33','2021-03-10 22:21:33',NULL),(10,'t','t','t','t',4,'asdsd',NULL,NULL,'2021-03-10 22:29:49','2021-03-10 22:29:49',NULL),(11,'t','t','t','t',4,'asdsd',NULL,NULL,'2021-03-10 22:31:19','2021-03-10 22:31:19',NULL),(12,'t','t','t','t',4,'asdsd',NULL,NULL,'2021-03-10 22:32:14','2021-03-10 22:32:14',NULL),(13,'t','t','t','t',4,'asdsd',NULL,NULL,'2021-03-10 22:34:04','2021-03-10 22:34:04',NULL),(14,'w','w','w','w',5000,'wwwww',NULL,NULL,'2021-03-10 22:40:26','2021-03-10 22:40:26',NULL),(15,'w','w','w','w',5000,'wwwww',NULL,NULL,'2021-03-10 22:44:08','2021-03-10 22:44:08',NULL),(16,'z','z','z','z',7898,'ASAD',NULL,NULL,'2021-03-10 22:46:45','2021-03-10 22:46:45',NULL),(17,'z','z','z','z',7898,'ASAD',NULL,NULL,'2021-03-10 22:50:47','2021-03-10 22:50:47',NULL),(18,'z','z','z','z',45,'s',NULL,NULL,'2021-03-10 22:53:41','2021-03-10 22:53:41',NULL),(19,'z','z','z','z',45,'s',NULL,NULL,'2021-03-10 22:55:51','2021-03-10 22:55:51',NULL),(20,'Sistemas ','Esteban','SSD|','Informatica',5000,'Se compro para potenciar las pc',1,NULL,'2021-03-12 03:43:52','2021-03-12 03:43:52',NULL),(21,'COnable','Cristian','Pagos impuestos','contable',10000,'Se pago las facturas.',2,NULL,'2021-03-12 03:48:43','2021-03-12 03:48:43',NULL);
/*!40000 ALTER TABLE `rendiciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rendiciones_imagenes`
--

DROP TABLE IF EXISTS `rendiciones_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rendiciones_imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idrendicion` int NOT NULL,
  `idimagen` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idrendicion_idx` (`idrendicion`),
  KEY `idimagen_idx` (`idimagen`),
  CONSTRAINT `idimagen` FOREIGN KEY (`idimagen`) REFERENCES `imagenes` (`id`),
  CONSTRAINT `idrendicion` FOREIGN KEY (`idrendicion`) REFERENCES `rendiciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rendiciones_imagenes`
--

LOCK TABLES `rendiciones_imagenes` WRITE;
/*!40000 ALTER TABLE `rendiciones_imagenes` DISABLE KEYS */;
INSERT INTO `rendiciones_imagenes` VALUES (1,19,1,'2021-03-10 22:55:58','2021-03-10 22:55:58',NULL),(2,19,2,'2021-03-10 22:55:58','2021-03-10 22:55:58',NULL),(3,19,3,'2021-03-10 22:55:58','2021-03-10 22:55:58',NULL),(4,20,4,'2021-03-12 03:43:55','2021-03-12 03:43:55',NULL),(5,20,5,'2021-03-12 03:43:55','2021-03-12 03:43:55',NULL),(6,21,6,'2021-03-12 03:48:50','2021-03-12 03:48:50',NULL),(7,21,7,'2021-03-12 03:48:50','2021-03-12 03:48:50',NULL),(8,21,8,'2021-03-12 03:48:50','2021-03-12 03:48:50',NULL);
/*!40000 ALTER TABLE `rendiciones_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `tipousuario` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `nvendedor` varchar(45) DEFAULT NULL,
  `fechaContratacion` varchar(45) DEFAULT NULL,
  `condicion` varchar(45) DEFAULT NULL,
  `departamentoId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departamentoId_idx` (`departamentoId`),
  CONSTRAINT `departamentoId` FOREIGN KEY (`departamentoId`) REFERENCES `departamentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'pancho','Francisco','francisco@penaltyarg.com.ar','$2b$10$YD4tvohEeaY/.UtiHSLTx.nAboNqw2XgDQtrAkBn3e3g2ok2IuFxO','Gerente','empleado','000','26/02/2018','',1,'2021-02-26 15:05:57','2021-03-29 14:21:24',NULL),(2,'Pdro','Pedro','pedro@penaltyar.com.ar','$2b$10$aZZgxOikAxUSXFWLfCG0vOUtK7XBV/VMkOsGVguxnbg9cu2TLOcYW','Gerente','empleado','000','26/02/1998','',1,'2021-02-28 19:49:28','2021-04-02 03:15:17',NULL),(3,'Juansito','Juan','juan@penaltyar.com.ar','$2b$10$SzzvtOCPztvG9RB/xs2q4uxHuHjerhlfLstp3h/0OLs7KtLIZ3Awq','Gerente','externo','000','01/03/2020',NULL,2,'2021-03-01 14:13:45','2021-04-02 04:23:22',NULL),(4,'roodriguito','Rodrigo','rodrigo@penaltyarg.com.ar','$2b$10$iLjDJqd2hggGeE0b6x95ouBW4RPoAnug2IkxNBuq.TnroaIHBL7xu','Gerente',NULL,'000','10/02/2000',NULL,3,'2021-03-12 14:36:31','2021-04-02 06:30:45',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacaciones`
--

DROP TABLE IF EXISTS `vacaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `periodo` int DEFAULT NULL,
  `fechaSolicitud` varchar(45) DEFAULT NULL,
  `fechaDesde` varchar(45) DEFAULT NULL,
  `fechaHasta` varchar(45) DEFAULT NULL,
  `obs` varchar(45) DEFAULT NULL,
  `diasFaltantes` int DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `vacacionesId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId_idx` (`usuarioId`),
  CONSTRAINT `usuarioId` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacaciones`
--

LOCK TABLES `vacaciones` WRITE;
/*!40000 ALTER TABLE `vacaciones` DISABLE KEYS */;
INSERT INTO `vacaciones` VALUES (6,2020,'3/4/2021','8/4/2021','14/4/2021','ok francisco ',7,1,'2021-04-03 05:35:27','2021-04-03 05:35:27',NULL,NULL),(7,2018,'3/4/2021',NULL,NULL,NULL,7,1,NULL,NULL,NULL,NULL),(8,2018,'3/4/2021',NULL,NULL,NULL,8,3,NULL,NULL,NULL,NULL),(9,2019,'3/4/2021',NULL,NULL,NULL,14,1,NULL,NULL,NULL,NULL),(10,2019,'3/4/2021',NULL,NULL,NULL,21,3,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `vacaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-03 15:49:47
