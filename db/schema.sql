DROP DATABASE IF EXISTS campfire;

CREATE DATABASE campfire;

use campfire;

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  messages varchar(255);

  PRIMARY KEY (ID)
);
