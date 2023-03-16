/* Replace with your SQL commands */
CREATE TABLE `player` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "player id",
	`name` VARCHAR(64) NOT NULL COMMENT "ユーザー名",
	`cognito_id` VARCHAR(36) NOT NULL UNIQUE COMMENT "cognito user id",
	`support_id` VARCHAR(36) NOT NULL UNIQUE COMMENT "アプリ表示用",
	PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;