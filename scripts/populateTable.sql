use cs201;
LOAD DATA LOCAL INFILE '~/Projects/Backend/scripts/courses.csv'
INTO TABLE Course
FIELDS TERMINATED BY '|'
LINES TERMINATED BY '\n';


INSERT INTO Users(firstName, lastName, email, password)
values ('Jiashu', 'Xu', 'jiashuxu@usc.edu', '1');

INSERT INTO Users(firstName, lastName, email, password)
values ('Tom', 'Trojan', 'tj@usc.edu', '1');

INSERT INTO Schedule(userId, department, courseNumber)
VALUES (1, 'CSCI', 201);
INSERT INTO Schedule(userId, department, courseNumber)
VALUES (1, 'CSCI', 270);

# INSERT INTO Preferences(userId, courseName, startTime, endTime, extraCurriculum, desiredUnits)
# VALUES (1,'CSCI270,CSCI201','12:00','20:00','[14:00 15:00],[08:00 09:00]', 18);