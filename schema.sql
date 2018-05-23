DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products(

  product_name VARCHAR(30) NOT NULL,

  department_name VARCHAR(30) NOT NULL,
 
 price DECIMAL(13,2) NOT NULL,

  stock_quantity INTEGER(10) NOT NULL,
  
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  
  Primary KEY (item_id)
  
  
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Awesome-o 9000", "Robotics", 199.99, 8999),
("Sharknado on Blu-Ray", "Movies", 29.99, 24),
("Sharknado on DVD", "Movies", 24.99, 82),
("Soylent Green", "Food", 8.99, 55),
("Flash Light", "Utility Item", 18.99, 50),
("Compound Bow", "Outdoor Sports", 299.99, 12),
("2 TB SATA Hard Drive", "Computer Parts and Accessories", 79.99, 15),
("2500mL Water Bottle", "Outdoor Sports", 12.99, 2000),
("Snake Oil", "Food", 99.99, 25),
("Model T-Rex", "Toys", 24.99, 347);