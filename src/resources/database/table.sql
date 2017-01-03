CREATE TABLE web_info (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    head_script TEXT,
    bottom_script TEXT
);

CREATE TABLE keyword (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    keyword VARCHAR(255)
);

CREATE TABLE app (
	id INT(11) PRIMARY KEY auto_increment,
	version VARCHAR(50),
	platform VARCHAR(50),
	name VARCHAR(255),
	status VARCHAR(50),
	url VARCHAR(255)
);

CREATE TABLE statistic (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
	app_id INT(11),
	number INT(11),
	CONSTRAINT FOREIGN KEY (app_id) REFERENCES app(id)
);