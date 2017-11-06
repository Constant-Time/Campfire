DROP DATABASE IF EXISTS campfire;

CREATE DATABASE campfire;

use campfire

CREATE TABLE messages (
  messageID int NOT NULL AUTO_INCREMENT,
  message TEXT(),
  PRIMARY KEY (ID),
  FOREIGN KEY (storyID) REFERENCES stories(storyID),
  FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE users (
  userID int NOT NULL AUTO_INCREMENT,
  username varchar (28),
  password varchar(16),
  PRIMARY KEY (ID)
);

CREATE TABLE stories (
  storyID int NOT NULL AUTO_INCREMENT,
  storyName varchar(100),
  PRIMARY KEY (ID)
);
