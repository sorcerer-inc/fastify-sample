/* Replace with your SQL commands */
CREATE TABLE `login` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "ユーザーID",
	`username` VARCHAR(50) NOT NULL UNIQUE COMMENT "ユーザー名",
	`passwordHash` VARCHAR(60) NOT NULL COMMENT "ハッシュ後パスワード",
	PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;