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


INSERT INTO products VALUES
(NULL, 'ARXT', 'Campera plush', 
'Femenino', 'Campera juvenil con capucha', 'plush', 'campera-plush.jpeg',
'5', 'Rosa', '30', '1800.00', '1500.00', '2008-7-10');