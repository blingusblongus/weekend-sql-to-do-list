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
('Do the laundry', '