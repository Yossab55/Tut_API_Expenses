USE tut_expenses_project;

CREATE TABLE `Users` (
  `user_id` integer PRIMARY KEY,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(70) NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `Expenses` (
  `expense_id` integer PRIMARY KEY,
  `expense_category` varchar(60) NOT NULL COMMENT 'categorized by name',
  `expense_amount` decimal,
  `expense_date` datetime NOT NULL,
  `user_id` integer
);

ALTER TABLE `Expenses` ADD CONSTRAINT `user_expenses_fk` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);


DELIMITER $$
CREATE PROCEDURE find_user(IN `user_param_id` INT)
  BEGIN
    SELECT * 
    FROM Users
    WHERE user_id = `user_param_id`;
  END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE user_today_expenses(in `user_param_id` INT)
BEGIN
  SELECT *
  FROM Expenses
  WHERE user_id = `user_param_id`;
END $$
DELIMITER ;

/* 
! see if you can make it logic better in node proejct or not
  DELIMITER $$
  CREATE PROCEDURE user_today_expenses(IN `user_param_id` INT)
  BEGIN
    SELECT *
    FROM Expenses
    WHERE user_id = `user_param_id` AND expense_date = NOW();
  END $$
  DELIMITER ;

  DELIMITER $$
  CREATE PROCEDURE user_last_period_expenses(IN `user_param_id` INT, IN `expense_last_period` datetime)
  BEGIN
    SELECT *
    FROM Expenses
    WHERE user_id = `user_param_id` AND 
    expense_date between `expense_last_period` AND NOW()
    ORDER BY expense_date;
  END $$
  DELIMITER ;

  DELIMITER $$
  CREATE PROCEDURE user_last_period_expenses_group_by_catygory(IN `user_param_id` INT, IN `expense_last_period` datetime)
  BEGIN
    SELECT expense_category, SUM(expense_amount) AS 'total_amout'
    FROM Expenses
    WHERE user_id = `user_param_id` AND 
    expense_date between `expense_last_period` AND NOW()
    GROUP BY expense_category;
  END $$
  DELIMITER ;


  DELIMITER $$
  CREATE PROCEDURE user_todya_expenses_group_by_category(IN `user_param_id` INT)
  BEGIN
    SELECT expense_category, SUM(expense_amount) AS 'total_amout'
    FROM Expenses
    WHERE user_id = `user_param_id` AND expense_date = NOW()
    GROUP BY expense_category;
  END $$
  DELIMITER ; 
*/