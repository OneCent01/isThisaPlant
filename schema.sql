DROP DATABASE IF EXISTS images;

CREATE DATABASE IF NOT EXISTS images;

USE images;

CREATE TABLE plants (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  description varchar(150),
  link varchar(80)  NOT NULL,
  category varchar(25)  NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
