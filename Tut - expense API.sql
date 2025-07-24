CREATE TABLE `Users` (
  `user_id` integer PRIMARY KEY,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(70) NOT NULL,
  `password` longtext NOT NULL
);

CREATE TABLE `Expenses` (
  `expense_id` integer PRIMARY KEY,
  `expense_category` varchar(60) NOT NULL COMMENT 'categorized by name',
  `expense_total_amount` decimal,
  `expense_date` datetime NOT NULL,
  `user_id` integer
);

ALTER TABLE `Expenses` ADD CONSTRAINT `user_expenses` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);
