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
CREATE SCHEMA IF NOT EXISTS `emilse_modas` DEFAULT CHARACTER SET utf8 ;
USE `emilse_modas` ;

-- -----------------------------------------------------
-- Table `emilse_modas`.`operations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`operations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `emilse_modas`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `operation_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_roles_operation_id`
    FOREIGN KEY (`operation_id`)
    REFERENCES `emilse_modas`.`operations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emilse_modas`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `avatar` VARCHAR(40) NOT NULL,
  `nombre` VARCHAR(40) NOT NULL,
  `apellido` VARCHAR(40) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `nacimiento` DATE NOT NULL,
  `sexo` VARCHAR(20) NULL,
  `newsletter` VARCHAR(20) NULL,
  `roles_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_privileges_id`
    FOREIGN KEY (`roles_id`)
    REFERENCES `emilse_modas`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `emilse_modas`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `emilse_modas`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `emilse_modas`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`facturas` (
  `order_id` INT(11) NOT NULL,
  `type_factura` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `fk_factura_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `emilse_modas`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `emilse_modas`.`categorys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`categorys` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type_cloth` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emilse_modas`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `code_article` VARCHAR(10) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description_product` VARCHAR(150) NOT NULL,
  `image` VARCHAR(50) NOT NULL,
  `image2` VARCHAR(50) NOT NULL,
  `image3` VARCHAR(50) NOT NULL,
  `gender` VARCHAR(45) NULL,
  `date_up` DATETIME NOT NULL,
  `category_id` INT(11) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `price_discount` DECIMAL(10,0) NOT NULL,
  `colour` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `emilse_modas`.`categorys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `emilse_modas`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`favorites` (
  `users_id` INT(11) NOT NULL,
  `products_id` INT(11) NOT NULL,
  PRIMARY KEY (`users_id`, `products_id`),
  CONSTRAINT `fk_favorite_user`
    FOREIGN KEY (`users_id`)
    REFERENCES `emilse_modas`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorite_product`
    FOREIGN KEY (`products_id`)
    REFERENCES `emilse_modas`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `emilse_modas`.`order_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`order_product` (
  `orders_id` INT(11) NOT NULL,
  `products_id` INT(11) NOT NULL,
  PRIMARY KEY (`orders_id`, `products_id`),
  CONSTRAINT `fk_orders_has_products_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `emilse_modas`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `emilse_modas`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `emilse_modas`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`sizes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emilse_modas`.`product_size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emilse_modas`.`product_size` (
  `products_id` INT(11) NOT NULL,
  `sizes_id` INT(11) NOT NULL,
  `units` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`products_id`, `sizes_id`),
  CONSTRAINT `fk_product_size_product`
    FOREIGN KEY (`products_id`)
    REFERENCES `emilse_modas`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_size_size`
    FOREIGN KEY (`sizes_id`)
    REFERENCES `emilse_modas`.`sizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
