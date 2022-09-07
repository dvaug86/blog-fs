USE blog_schema;



DROP TABLE IF EXISTS authors_table;
CREATE TABLE authors_table(
id INT  AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (id)
);

DROP TABLE IF EXISTS blogs_table;
CREATE TABLE blogs_table(
id INT AUTO_INCREMENT,
title VARCHAR(100) NOT NULL,
content TEXT NOT NULL,
authorid INT NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (id),
FOREIGN KEY (authorid) REFERENCES authors_table(id)
);

DROP TABLE IF EXISTS tags_table;
CREATE TABLE tags_table(
id INT AUTO_INCREMENT,
name VARCHAR(30) NOT NULL UNIQUE,
created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (id)
);

DROP TABLE IF EXISTS blogtags_table;
CREATE TABLE blogtags_table(
blogid INT NOT NULL,
tagid INT NOT NULL,
PRIMARY KEY (blogid, tagid),
FOREIGN KEY (blogid) REFERENCES blogs_table(id),
FOREIGN KEY (tagid) REFERENCES tags_table(id)
);




INSERT INTO authors_table (name, email) VALUES
('TestAuthor1', 'TestEmail1@test.com'),
('TestAuthor2', 'TestEmail2@test.com');
SELECT* FROM authors_table;

INSERT INTO blogs_table (title, content, authorid) VALUES
('Blog Title 1', 'Test Blog Content 1', 1),
('Blog Title 2', 'Test Blog Content 2', 1),
('Blog Title 3', 'Test Blog Content 3', 2);
SELECT* FROM blogs_table;

INSERT INTO tags_table (name) VALUES
	('tag 1'),
    ('tag 2'),
    ('tag 3'),
    ('tag 4');
    
    SELECT* FROM tags_table;
    
    INSERT INTO blogtags_table (blogid, tagid) VALUES
		 (1, 1),
         (2, 1),
         (3, 4);
         
	 SELECT 
    *
FROM
    blogtags_table;
     
-- DELIMITER //
-- CREATE PROCEDURE spBlotTags()
-- BEGIN
-- SELECT 
-- 	authors_table.name, 
--     blogs_table.*, 
--     GROUP_CONCAT(tags_table.name SEPARATOR ', ,') AS tagName
-- FROM 
-- 	blog_tables
-- 		JOIN 
-- 	authors_table ON authors_table.id = blogs_table.authorid
-- 		LEFT JOIN 
-- 	blogtags_table ON blogtags_table.blogid = blogs_table.id
-- 		LEFT JOIN 
-- 	tags_table ON tags_table.id = blogtags_table.tagid
-- GROUP BY blogs_table.id;
-- END //
-- DELIMITER ;
CALL spBlogTags(3);

DELIMITER $$
CREATE PROCEDURE spBlogTags(blog_id INT)
BEGIN
	SELECT tags_table.id, tags_table.name FROM blogtags_table
    JOIN tags_table ON tags_table.id = blogtags_table.tagid
    WHERE blogid = blog_id;
END $$
Delimiter ;

