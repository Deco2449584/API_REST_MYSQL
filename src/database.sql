CREATE DATABASE IF NOT EXIST espressdb;
USE expressdb;
CREATE TABLE employe (
id INT(11) NOT NULL AUTO_INCREMENT,
name VARCHAR(45) DEFAULT NULL,
salary INT(5) DEFAULT NULL,
PRIMARY KEY (id)
);

DESCRIBE employee;

INSERT INTO employe VALUES

(1,'joe',1000),
(2,'henry',2000),
(3,'sam',2400),
(4,'max',1400);