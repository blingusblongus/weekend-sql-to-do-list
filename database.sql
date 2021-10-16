CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(255) NOT NULL,
	"complete" BOOLEAN,
	"date_due" DATE,
	"date_completed" DATE,
	"date_created" DATE
);

INSERT INTO tasks ("description", "complete", "date_due")
VALUES
('Do the laundry', FALSE, '10/21/21'),
('Exercise', FALSE, '10/21/21'),
('Feed the Dog', FALSE, '10/21/21'),
('Do the laundry', FALSE, '10/21/21');

SELECT * FROM tasks;