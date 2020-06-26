-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema emilse_modas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema emilse_modas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emilse_modas` DEFAULT CHARACTER SET latin1 ;
USE `emilse_modas` ;

-- -----------------------------------------------------
-- Table `emilse_modas`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `avatar` VARCHAR(40) NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  `apellido` VARCHAR(40) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `nacimiento` DATE NOT NULL,
  `sexo` VARCHAR(20) NOT NULL,
  `newsletter` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `emilse_modas`.`shops`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`shops` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NOT NULL,
  `total` DECIMAL(10,0) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  CONSTRAINT `fk_shops_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `emilse_modas`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `emilse_modas`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  `shop_id` INT NOT NULL,
  `shop_user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `shop_id`, `shop_user_id`),
  CONSTRAINT `fk_orders_shops`
    FOREIGN KEY (`shop_id`)
    REFERENCES `emilse_modas`.`shops` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `emilse_modas`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`facturas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `order_shop_id` INT NOT NULL,
  `order_shop_user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `order_id`, `order_shop_id`, `order_shop_user_id`),
    CONSTRAINT `fk_facturas_orders`
    FOREIGN KEY (`order_id` , `order_shop_id` , `order_shop_user_id`)
    REFERENCES `emilse_modas`.`orders` (`id` , `shop_id` , `shop_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `emilse_modas`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`favorites` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
    CONSTRAINT `fk_favorites_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `emilse_modas`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `emilse_modas`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`products` (
  `id` INT(255) NOT NULL AUTO_INCREMENT,
  `code_article` VARCHAR(10) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `description_product` VARCHAR(45) NOT NULL,
  `type_cloth` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `size` VARCHAR(10) NOT NULL,
  `colour` VARCHAR(45) NOT NULL,
  `units` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `price_discount` DECIMAL(10,0) NOT NULL,
  `date_up` DATETIME NOT NULL,
  `image2` VARCHAR(45) NOT NULL,
  `image3` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = MyISAM
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `emilse_modas`.`product_shop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`product_shop` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT(255) NOT NULL,
  `shop_id` INT NOT NULL,
  `shop_user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `product_id`, `shop_id`, `shop_user_id`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `emilse_modas`.`product_favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`product_favorite` (
  `id` INT NOT NULL,
  `product_id` INT(255) NOT NULL,
  `favorite_id` INT NOT NULL,
  `favorite_user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `product_id`, `favorite_id`, `favorite_user_id`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Poblar la tabla products -- 
INSERT INTO products VALUES(NULL, 'E001', 'Campera plush', 'Femenino', 'Campera juvenil con capucha', 'Campera', 'campera-plush.jpeg','1', 'Rosa', '30', '1800.00', '1500.00', '2008-7-10', 'campera-plush.jpeg', 'campera-plush.jpeg');
INSERT INTO products VALUES(NULL, 'E001', 'Campera plush', 'Femenino', 'Campera juvenil con capucha', 'Campera', 'campera-plush.jpeg','2', 'Rosa', '30', '1800.00', '1500.00', '2008-7-10', 'campera-plush.jpeg', 'campera-plush.jpeg');
INSERT INTO products VALUES(NULL, 'E001', 'Campera plush', 'Femenino', 'Campera juvenil con capucha', 'Campera', 'campera-plush.jpeg','3', 'Rosa', '30', '1800.00', '1500.00', '2008-7-10', 'campera-plush.jpeg', 'campera-plush.jpeg');
INSERT INTO products VALUES(NULL, 'E001', 'Campera plush', 'Femenino', 'Campera juvenil con capucha', 'Campera', 'campera-plush.jpeg','4', 'Rosa', '30', '1800.00', '1500.00', '2008-7-10', 'campera-plush.jpeg', 'campera-plush.jpeg');
INSERT INTO products VALUES(NULL, 'E001', 'Campera plush', 'Femenino', 'Campera juvenil con capucha', 'Campera', 'campera-plush.jpeg','5', 'Rosa', '30', '1800.00', '1500.00', '2008-7-10', 'campera-plush.jpeg', 'campera-plush.jpeg');
INSERT INTO products VALUES(NULL, 'E001', 'Campera plush', 'Femenino', 'Campera juvenil con capucha', 'Campera', 'campera-plush.jpeg','6', 'Rosa', '30', '1800.00', '1500.00', '2008-7-10', 'campera-plush.jpeg', 'campera-plush.jpeg');

INSERT INTO products VALUES	(NULL, 'E002'	, 'Campera modal'	, 'Femenino'	, 'Entallada con bosillo'	, 'Campera'	, 'campera-modal.jpeg'	, '1'	, 'Gris melange'	, 100	, 1800.00	, 1500.00	, '2020-6-10', 'campera-modal.jpeg', 'campera-modal.jpeg');
INSERT INTO products VALUES	(NULL, 'E002'	, 'Campera modal'	, 'Femenino'	, 'Entallada con bosillo'	, 'Campera'	, 'campera-modal.jpeg'	, '2'	, 'Gris melange'	, 100	, 1800.00	, 1500.00	, '2020-6-10', 'campera-modal.jpeg', 'campera-modal.jpeg');
INSERT INTO products VALUES	(NULL, 'E002'	, 'Campera modal'	, 'Femenino'	, 'Entallada con bosillo'	, 'Campera'	, 'campera-modal.jpeg'	, '3'	, 'Gris melange'	, 100	, 1800.00	, 1500.00	, '2020-6-10', 'campera-modal.jpeg', 'campera-modal.jpeg');
INSERT INTO products VALUES	(NULL, 'E002'	, 'Campera modal'	, 'Femenino'	, 'Entallada con bosillo'	, 'Campera'	, 'campera-modal.jpeg'	, '4'	, 'Gris melange'	, 100	, 1800.00	, 1500.00	, '2020-6-10', 'campera-modal.jpeg', 'campera-modal.jpeg');
INSERT INTO products VALUES	(NULL, 'E002'	, 'Campera modal'	, 'Femenino'	, 'Entallada con bosillo'	, 'Campera'	, 'campera-modal.jpeg'	, '5'	, 'Gris melange'	, 100	, 1800.00	, 1500.00	, '2020-6-10', 'campera-modal.jpeg', 'campera-modal.jpeg');
INSERT INTO products VALUES	(NULL, 'E002'	, 'Campera modal'	, 'Femenino'	, 'Entallada con bosillo'	, 'Campera'	, 'campera-modal.jpeg'	, '6'	, 'Gris melange'	, 100	, 1800.00	, 1500.00	, '2020-6-10' , 'campera-modal.jpeg', 'campera-modal.jpeg');

INSERT INTO products VALUES	(NULL	, 'E004'	, 'Pulover piel de mono'	, 'Femenino'	, 'Color brillante y frizado por dentro'	, 'Pulover'	, 'pulover-piel-de-mono.jpeg'	, '1'	, 'Negro'	, 150	,  ' 1100.00'	, ' 900.00'	, '2020-6-20', 'pulover-piel-de-mono.jpeg', 'pulover-piel-de-mono.jpeg');
INSERT INTO products VALUES	(NULL	, 'E004'	, 'Pulover piel de mono'	, 'Femenino'	, 'Color brillante y frizado por dentro'	, 'Pulover'	, 'pulover-piel-de-mono.jpeg'	, '2'	, 'Negro'	, 150	,  ' 1100.00'	, ' 900.00'	, '2020-6-20', 'pulover-piel-de-mono.jpeg', 'pulover-piel-de-mono.jpeg');
INSERT INTO products VALUES	(NULL	, 'E004'	, 'Pulover piel de mono'	, 'Femenino'	, 'Color brillante y frizado por dentro'	, 'Pulover'	, 'pulover-piel-de-mono.jpeg'	, '3'	, 'Negro'	, 150	,  ' 1100.00'	, ' 900.00'	, '2020-6-20', 'pulover-piel-de-mono.jpeg', 'pulover-piel-de-mono.jpeg');
INSERT INTO products VALUES	(NULL	, 'E004'	, 'Pulover piel de mono'	, 'Femenino'	, 'Color brillante y frizado por dentro'	, 'Pulover'	, 'pulover-piel-de-mono.jpeg'	, '4'	, 'Negro'	, 150	,  ' 1100.00'	, ' 900.00'	, '2020-6-20', 'pulover-piel-de-mono.jpeg', 'pulover-piel-de-mono.jpeg');
INSERT INTO products VALUES	(NULL	, 'E004'	, 'Pulover piel de mono'	, 'Femenino'	, 'Color brillante y frizado por dentro'	, 'Pulover'	, 'pulover-piel-de-mono.jpeg'	, '5'	, 'Negro'	, 150	,  ' 1100.00'	, ' 900.00'	, '2020-6-20', 'pulover-piel-de-mono.jpeg', 'pulover-piel-de-mono.jpeg');
INSERT INTO products VALUES	(NULL	, 'E004'	, 'Pulover piel de mono'	, 'Femenino'	, 'Color brillante y frizado por dentro'	, 'Pulover'	, 'pulover-piel-de-mono.jpeg'	, '6'	, 'Negro'	, 150	,  ' 1100.00'	, ' 900.00'	, '2020-6-20', 'pulover-piel-de-mono.jpeg', 'pulover-piel-de-mono.jpeg');

INSERT INTO products VALUES	(NULL	, 'E005'	, 'Saco de peluche'	, 'Femenino'	, 'Saco con peluche blanco por dentro y botones negros'	, 'Saco'	, 'saco-peluche-con-botones.jpeg'	, '1'	, 'Negro'	, 150	,  ' 1500.00'	,  ' 1200.00'	, '2020-6-20', 'saco-peluche-con-botones.jpeg', 'saco-peluche-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E005'	, 'Saco de peluche'	, 'Femenino'	, 'Saco con peluche blanco por dentro y botones negros'	, 'Saco'	, 'saco-peluche-con-botones.jpeg'	, '2'	, 'Negro'	, 150	,  ' 1500.00'	,  ' 1200.00'	, '2020-6-20', 'saco-peluche-con-botones.jpeg', 'saco-peluche-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E005'	, 'Saco de peluche'	, 'Femenino'	, 'Saco con peluche blanco por dentro y botones negros'	, 'Saco'	, 'saco-peluche-con-botones.jpeg'	, '3'	, 'Negro'	, 150	,  ' 1500.00'	,  ' 1200.00'	, '2020-6-20', 'saco-peluche-con-botones.jpeg', 'saco-peluche-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E005'	, 'Saco de peluche'	, 'Femenino'	, 'Saco con peluche blanco por dentro y botones negros'	, 'Saco'	, 'saco-peluche-con-botones.jpeg'	, '4'	, 'Negro'	, 150	,  ' 1500.00'	,  ' 1200.00'	, '2020-6-20', 'saco-peluche-con-botones.jpeg', 'saco-peluche-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E005'	, 'Saco de peluche'	, 'Femenino'	, 'Saco con peluche blanco por dentro y botones negros'	, 'Saco'	, 'saco-peluche-con-botones.jpeg'	, '5'	, 'Negro'	, 150	,  ' 1500.00'	,  ' 1200.00'	, '2020-6-20', 'saco-peluche-con-botones.jpeg', 'saco-peluche-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E005'	, 'Saco de peluche'	, 'Femenino'	, 'Saco con peluche blanco por dentro y botones negros'	, 'Saco'	, 'saco-peluche-con-botones.jpeg'	, '6'	, 'Negro'	, 150	,  ' 1500.00'	,  ' 1200.00'	, '2020-6-20', 'saco-peluche-con-botones.jpeg', 'saco-peluche-con-botones.jpeg');

INSERT INTO products VALUES	(NULL	, 'E006'	, 'Pantalon modal'	, 'Femenino'	, 'Pantalon tipo babucha con puño abajo'	, 'Pantalon'	, 'pantalon-modal.jpg'	, '1'	, 'Azul marino'	, 150	, ' 900.00'	, ' 600.00'	, '2020-6-20', 'pantalon-modal.jpg', 'pantalon-modal.jpg');
INSERT INTO products VALUES	(NULL	, 'E006'	, 'Pantalon modal'	, 'Femenino'	, 'Pantalon tipo babucha con puño abajo'	, 'Pantalon'	, 'pantalon-modal.jpg'	, '2'	, 'Azul marino'	, 150	, ' 900.00'	, ' 600.00'	, '2020-6-20', 'pantalon-modal.jpg', 'pantalon-modal.jpg');
INSERT INTO products VALUES	(NULL	, 'E006'	, 'Pantalon modal'	, 'Femenino'	, 'Pantalon tipo babucha con puño abajo'	, 'Pantalon'	, 'pantalon-modal.jpg'	, '3'	, 'Azul marino'	, 150	, ' 900.00'	, ' 600.00'	, '2020-6-20', 'pantalon-modal.jpg', 'pantalon-modal.jpg');
INSERT INTO products VALUES	(NULL	, 'E006'	, 'Pantalon modal'	, 'Femenino'	, 'Pantalon tipo babucha con puño abajo'	, 'Pantalon'	, 'pantalon-modal.jpg'	, '4'	, 'Azul marino'	, 150	, ' 900.00'	, ' 600.00'	, '2020-6-20', 'pantalon-modal.jpg', 'pantalon-modal.jpg');
INSERT INTO products VALUES	(NULL	, 'E006'	, 'Pantalon modal'	, 'Femenino'	, 'Pantalon tipo babucha con puño abajo'	, 'Pantalon'	, 'pantalon-modal.jpg'	, '5'	, 'Azul marino'	, 150	, ' 900.00'	, ' 600.00'	, '2020-6-20', 'pantalon-modal.jpg', 'pantalon-modal.jpg');
INSERT INTO products VALUES	(NULL	, 'E006'	, 'Pantalon modal'	, 'Femenino'	, 'Pantalon tipo babucha con puño abajo'	, 'Pantalon'	, 'pantalon-modal.jpg'	, '6'	, 'Azul marino'	, 150	, ' 900.00'	, ' 600.00'	, '2020-6-20' , 'pantalon-modal.jpg', 'pantalon-modal.jpg');

INSERT INTO products VALUES	(NULL	, 'E007'	, 'Saco de polar anteepiling'	, 'Femenino'	, 'Con cinturon y botones perfectos para invierno'	, 'Saco'	, 'saco-polar-con-botones.jpeg'	, '1'	, 'Negro'	, 150	,  ' 1200.00'	, ' 900.00'	, '2020-6-20', 'saco-polar-con-botones.jpeg', 'saco-polar-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E007'	, 'Saco de polar anteepiling'	, 'Femenino'	, 'Con cinturon y botones perfectos para invierno'	, 'Saco'	, 'saco-polar-con-botones.jpeg'	, '2'	, 'Negro'	, 150	,  ' 1200.00'	, ' 900.00'	, '2020-6-20', 'saco-polar-con-botones.jpeg', 'saco-polar-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E007'	, 'Saco de polar anteepiling'	, 'Femenino'	, 'Con cinturon y botones perfectos para invierno'	, 'Saco'	, 'saco-polar-con-botones.jpeg'	, '3'	, 'Negro'	, 150	,  ' 1200.00'	, ' 900.00'	, '2020-6-20', 'saco-polar-con-botones.jpeg', 'saco-polar-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E007'	, 'Saco de polar anteepiling'	, 'Femenino'	, 'Con cinturon y botones perfectos para invierno'	, 'Saco'	, 'saco-polar-con-botones.jpeg'	, '4'	, 'Negro'	, 150	,  ' 1200.00'	, ' 900.00'	, '2020-6-20', 'saco-polar-con-botones.jpeg', 'saco-polar-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E007'	, 'Saco de polar anteepiling'	, 'Femenino'	, 'Con cinturon y botones perfectos para invierno'	, 'Saco'	, 'saco-polar-con-botones.jpeg'	, '5'	, 'Negro'	, 150	,  ' 1200.00'	, ' 900.00'	, '2020-6-20', 'saco-polar-con-botones.jpeg', 'saco-polar-con-botones.jpeg');
INSERT INTO products VALUES	(NULL	, 'E007'	, 'Saco de polar anteepiling'	, 'Femenino'	, 'Con cinturon y botones perfectos para invierno'	, 'Saco'	, 'saco-polar-con-botones.jpeg'	, '6'	, 'Negro'	, 150	,  ' 1200.00'	, ' 900.00'	, '2020-6-20', 'saco-polar-con-botones.jpeg', 'saco-polar-con-botones.jpeg');

INSERT INTO products VALUES	(NULL	, 'E008'	, 'Remera morley'	, 'Femenino'	, 'Remera lisa manga corta'	, 'Remera'	, 'remera-morley.jpeg'	, '1'	, 'Gris melange'	, 150	, ' 800.00'	, ' 500.00'	, '2020-6-20' , 'remera-morley.jpeg' , 'remera-morley.jpeg');
INSERT INTO products VALUES	(NULL	, 'E008'	, 'Remera morley'	, 'Femenino'	, 'Remera lisa manga corta'	, 'Remera'	, 'remera-morley.jpeg'	, '2'	, 'Gris melange'	, 151	, ' 800.00'	, ' 500.00'	, '2020-6-20' , 'remera-morley.jpeg' , 'remera-morley.jpeg');
INSERT INTO products VALUES	(NULL	, 'E008'	, 'Remera morley'	, 'Femenino'	, 'Remera lisa manga corta'	, 'Remera'	, 'remera-morley.jpeg'	, '3'	, 'Gris melange'	, 152	, ' 800.00'	, ' 500.00'	, '2020-6-20' , 'remera-morley.jpeg' , 'remera-morley.jpeg');
INSERT INTO products VALUES	(NULL	, 'E008'	, 'Remera morley'	, 'Femenino'	, 'Remera lisa manga corta'	, 'Remera'	, 'remera-morley.jpeg'	, '4'	, 'Gris melange'	, 153	, ' 800.00'	, ' 500.00'	, '2020-6-20' , 'remera-morley.jpeg', 'remera-morley.jpeg');
INSERT INTO products VALUES	(NULL	, 'E008'	, 'Remera morley'	, 'Femenino'	, 'Remera lisa manga corta'	, 'Remera'	, 'remera-morley.jpeg'	, '5'	, 'Gris melange'	, 154	, ' 800.00'	, ' 500.00'	, '2020-6-20', 'remera-morley.jpeg', 'remera-morley.jpeg');
INSERT INTO products VALUES	(NULL	, 'E008'	, 'Remera morley'	, 'Femenino'	, 'Remera lisa manga corta'	, 'Remera'	, 'remera-morley.jpeg'	, '6'	, 'Gris melange'	, 155	, ' 800.00'	, ' 500.00'	, '2020-6-20', 'remera-morley.jpeg', 'remera-morley.jpeg');