CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,3) NOT NULL,
    stock_quantity DECIMAL(10,3) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rolex Daytona", "Jewlery", 39400.00, 3),
("Jeager-LeCoultre Master Towurbillon", "Jewlery", 94500.00, 2),
("Creed Aventus", "Fragrance", 325.00, 10),
("Creed Green Irish Tweed", "Fragrance", 295.00, 12),
("Nintendo Switch", "Electronics", 299.99, 100),
("MacBook Pro 15'", "Electronics", 2799.00, 100),
("Denim Jeans", "Apparel", 85.00, 250),
("Saint Laurent Leather Jacket", "Apparel", 7500.00, 8),
("La-Z-Boy Recliner Sofa", "Furniture", 599.00, 20),
("Amerisleep AS3", "Furniture", 1199.00, 20);

SELECT * FROM bamazon_products;

