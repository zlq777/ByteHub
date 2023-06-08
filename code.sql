-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: code
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `arc_type`
--

DROP TABLE IF EXISTS `arc_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arc_type` (
  `arc_type_id` int NOT NULL AUTO_INCREMENT COMMENT '资源类型id',
  `arc_type_name` varchar(200) DEFAULT NULL COMMENT '资源类型名称',
  `remark` varchar(1000) DEFAULT NULL COMMENT '描述',
  `sort` int DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`arc_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COMMENT='资源类型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arc_type`
--

LOCK TABLES `arc_type` WRITE;
/*!40000 ALTER TABLE `arc_type` DISABLE KEYS */;
INSERT INTO `arc_type` VALUES (1,'计算机基础','计算机的入门',1),(2,'JavaSE','Java基础',2),(3,'前端资料','前端资料',3),(4,'数据库资料','数据库资料',4),(5,'毕业设计','毕业设计',5),(6,'面试资料','面试资料',6),(9,'其它','其它',7);
/*!40000 ALTER TABLE `arc_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `article_id` int NOT NULL AUTO_INCREMENT COMMENT '资源id',
  `name` varchar(200) DEFAULT NULL COMMENT '资源名称',
  `publish_date` datetime DEFAULT NULL COMMENT '发布时间',
  `user_id` int DEFAULT NULL COMMENT '用户id',
  `arc_type_id` int DEFAULT NULL COMMENT '资源类型id',
  `is_free` bit(1) NOT NULL COMMENT '是否免费资源',
  `points` int DEFAULT NULL COMMENT '积分',
  `content` text COMMENT '内容',
  `download` varchar(200) DEFAULT NULL COMMENT '下载地址',
  `password` varchar(10) DEFAULT NULL COMMENT '密码',
  `is_hot` bit(1) NOT NULL COMMENT '是否热门资源',
  `state` int DEFAULT NULL COMMENT '状态：1未审核2审核通过3审核驳回',
  `reason` varchar(255) DEFAULT NULL COMMENT '驳回原因',
  `check_date` datetime DEFAULT NULL COMMENT '审核时间',
  `click` int DEFAULT NULL COMMENT '点击数',
  `keywords` varchar(200) DEFAULT NULL COMMENT '关键字',
  `description` varchar(200) DEFAULT NULL COMMENT '描述',
  `is_useful` bit(1) NOT NULL COMMENT '资源链接是否有效',
  PRIMARY KEY (`article_id`),
  KEY `article_ibfk_1` (`user_id`),
  KEY `article_ibfk_2` (`arc_type_id`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `article_ibfk_2` FOREIGN KEY (`arc_type_id`) REFERENCES `arc_type` (`arc_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COMMENT='资源表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (2,'老王的分享1','2019-10-30 13:46:56',2,1,_binary '\0',6,'<p>这里是资源主体内容。（截图上传只支持部分浏览器，如：360安全浏览器等。）发布资源请手动去掉这段话，这只是提示信息！修改1</p>','https://pan.baidu.com/share/init?surl=YS_NXt1Fes6IYsoDCbc7qg','1234',_binary '\0',2,NULL,'2019-11-03 03:03:41',173,'老王1','分享额你荣',_binary ''),(3,'Lucene视频教程','2019-11-08 11:36:38',2,1,_binary '',0,'<p>这里是资源主体内容。（截图上传只支持部分浏览器，如：360安全浏览器等。）发布资源请手动去掉这段话，这只是提示信息！Lucene视频教程Lucene视频教程Lucene视频教程Lucene视频教程Lucene视频教程Lucene视频教程</p>','https://pan.baidu.com/s/1-54rWNASxxc9vzu7tRvG_Q','1111',_binary '\0',2,NULL,'2019-11-08 13:03:29',50,'Lucene视频教程','Lucene视频教程',_binary ''),(5,'Layui视频教程','2019-11-08 12:59:02',2,3,_binary '\0',2,'<p>这里是资源主体内容。（截图上传只支持部分浏览器，如：360安全浏览器等。）发布资源请手动去掉这段话，这只是提示信息！<a class=\"filename\" title=\"[www.java1234.com]Layui视频教程\" style=\"color: rgb(66, 78, 103); outline: 0px; cursor: pointer; font-family: tahoma, arial; font-size: 12px; text-indent: 81px; background-color: rgb(255, 255, 255);\">Layui视频教程</a><a class=\"filename\" title=\"[www.java1234.com]Layui视频教程\" style=\"color: rgb(66, 78, 103); outline: 0px; cursor: pointer; font-family: tahoma, arial; font-size: 12px; text-indent: 81px; background-color: rgb(255, 255, 255);\">Layui视频教程</a><a class=\"filename\" title=\"[www.java1234.com]Layui视频教程\" style=\"color: rgb(66, 78, 103); outline: 0px; cursor: pointer; font-family: tahoma, arial; font-size: 12px; text-indent: 81px; background-color: rgb(255, 255, 255);\">Layui视频教程</a><a class=\"filename\" title=\"[www.java1234.com]Layui视频教程\" style=\"color: rgb(66, 78, 103); outline: 0px; cursor: pointer; font-family: tahoma, arial; font-size: 12px; text-indent: 81px; background-color: rgb(255, 255, 255);\">Layui视频教程</a><a class=\"filename\" title=\"[www.java1234.com]Layui视频教程\" style=\"color: rgb(66, 78, 103); outline: 0px; cursor: pointer; font-family: tahoma, arial; font-size: 12px; text-indent: 81px; background-color: rgb(255, 255, 255);\">Layui视频教程</a><a class=\"filename\" title=\"[www.java1234.com]Layui视频教程\" style=\"color: rgb(66, 78, 103); outline: 0px; cursor: pointer; font-family: tahoma, arial; font-size: 12px; text-indent: 81px; background-color: rgb(255, 255, 255);\">Layui视频教程</a><img src=\"/upload/image/20191108/1573217882944020961.jpg\" title=\"1573217882944020961.jpg\" alt=\"攀登.jpg\"/></p>','https://pan.baidu.com/s/1LU0LA8fwVLHlFDHtSDLA3Q#list/path=%2F','1111',_binary '\0',2,NULL,'2019-11-08 13:03:26',199,'Layui视频教程','Layui视频教程',_binary ''),(6,'一头扎进CSS视频教程','2019-11-08 13:00:21',2,3,_binary '',0,'<p>这里是资源主体内容。（截图上传只支持部分浏览器，如：360安全浏览器等。）发布资源请手动去掉这段话，这只是提示信息！</p>','https://pan.baidu.com/s/1j6bEn27HojDPfAze2zDMJw','1111',_binary '\0',2,NULL,'2019-11-08 13:03:22',79,'CSS','CSS',_binary ''),(7,'一头扎进HTML视频教程','2019-11-08 13:01:57',2,3,_binary '',0,'<p>这里是资源主体内容。（截图上传只支持部分浏览器，如：360安全浏览器等。）发布资源请手动去掉这段话，这只是提示信息！一头扎进HTML视频教程</p>','https://pan.baidu.com/s/1LU0LA8fwVLHlFDHtSDLA3Q','1111',_binary '\0',2,NULL,'2019-11-08 13:03:18',79,'html','一头扎进HTML视频教程',_binary '');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_date` datetime DEFAULT NULL COMMENT '评论时间',
  `content` varchar(1000) DEFAULT NULL COMMENT '评论内容',
  `state` int DEFAULT NULL COMMENT '评论状态：0未审核1审核通过2审核驳回',
  `article_id` int DEFAULT NULL COMMENT '资源id',
  `user_id` int DEFAULT NULL COMMENT '评论者id',
  PRIMARY KEY (`comment_id`),
  KEY `comment_ibfk_1` (`user_id`),
  KEY `comment_ibfk_2` (`article_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link`
--

DROP TABLE IF EXISTS `link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `link` (
  `link_id` int NOT NULL AUTO_INCREMENT COMMENT '友情链接id',
  `link_name` varchar(200) DEFAULT NULL COMMENT '链接名称',
  `link_url` varchar(200) DEFAULT NULL COMMENT '链接地址',
  `link_email` varchar(200) DEFAULT NULL COMMENT '联系人email',
  `sort` int DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`link_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COMMENT='友情链接';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link`
--

LOCK TABLES `link` WRITE;
/*!40000 ALTER TABLE `link` DISABLE KEYS */;
/*!40000 ALTER TABLE `link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `message_id` int NOT NULL AUTO_INCREMENT COMMENT '消息id',
  `content` varchar(100) DEFAULT NULL COMMENT '消息内容',
  `cause` varchar(100) DEFAULT NULL COMMENT '原因',
  `publish_date` datetime DEFAULT NULL COMMENT '消息发布时间',
  `is_see` bit(1) NOT NULL COMMENT '是否被查看',
  `user_id` int DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`message_id`),
  KEY `message_ibfk_1` (`user_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COMMENT='消息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'【<font color=\"#00ff7f\" >审核成功</font>】 您发布的【老王的分享1】帖子审核成功！',NULL,'2019-11-02 09:15:14',_binary '\0',2);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `open_id` varchar(200) DEFAULT NULL COMMENT 'qq用户唯一标识',
  `nickname` varchar(200) DEFAULT NULL COMMENT '昵称',
  `user_name` varchar(100) DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `email` varchar(100) DEFAULT NULL COMMENT '验证邮箱地址',
  `head_portrait` varchar(100) DEFAULT NULL COMMENT '用户头像',
  `sex` varchar(50) DEFAULT NULL COMMENT '性别',
  `points` int DEFAULT NULL COMMENT '积分',
  `is_vip` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否vip',
  `vip_grade` int DEFAULT NULL COMMENT 'vip等级',
  `is_off` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否被封禁',
  `role_name` varchar(255) DEFAULT NULL COMMENT '角色名称：管理员、会员',
  `registration_date` datetime DEFAULT NULL COMMENT '注册时间',
  `lately_login_time` datetime DEFAULT NULL COMMENT '最近的登陆时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COMMENT='用户';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,NULL,'大海无量','dahaiwuliang','96cf058bc81ebb3b5da56b7fd9aaed82','781505696@qq.com','tou.jpg','男',0,_binary '\0',8,_binary '\0','管理员','2019-10-24 03:03:04','2019-11-08 14:44:14');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_download`
--

DROP TABLE IF EXISTS `user_download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_download` (
  `user_download_id` int NOT NULL AUTO_INCREMENT COMMENT '用户下载id',
  `download_date` datetime DEFAULT NULL COMMENT '下载时间',
  `article_id` int DEFAULT NULL COMMENT '下载资源id',
  `user_id` int DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`user_download_id`),
  KEY `user_download_ibfk_1` (`user_id`),
  KEY `user_download_ibfk_2` (`article_id`),
  CONSTRAINT `user_download_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_download_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='用户下载';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_download`
--

LOCK TABLES `user_download` WRITE;
/*!40000 ALTER TABLE `user_download` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_download` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09  1:50:55
