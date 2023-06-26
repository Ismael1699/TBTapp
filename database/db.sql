
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`data_table`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`data_table` ;

CREATE TABLE IF NOT EXISTS `mydb`.`data_table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `table` JSON NOT NULL,
  PRIMARY KEY (`id`));



-- -----------------------------------------------------
-- Table `mydb`.`requisiciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`requisiciones` ;

CREATE TABLE IF NOT EXISTS `mydb`.`requisiciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proyecto` VARCHAR(20) NOT NULL,
  `frente` VARCHAR(20) NOT NULL,
  `suministro` VARCHAR(20) NOT NULL,
  `fecha` VARCHAR(10) NOT NULL,
  `lugar` VARCHAR(10) NOT NULL,
  `numero` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id`
    FOREIGN KEY (`id`)
    REFERENCES `mydb`.`data_table` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


