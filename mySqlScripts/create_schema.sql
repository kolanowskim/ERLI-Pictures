CREATE DATABASE erli;

CREATE TABLE `erli`.`images` (
  `id` VARCHAR(500) NOT NULL,
  `sourceURL` VARCHAR(500) NOT NULL,
  `targetURL` VARCHAR(500) NOT NULL,
  `addedDate` DATETIME,
  `finishDate` DATETIME,
  `status` VARCHAR(100),
  PRIMARY KEY (`id`));