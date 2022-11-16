-- seeds the database
INSERT INTO department(name)
VALUES ('Sales'),('Engineering'),('Finance'),('Legal');

INSERT INTO role (title,salary,department_id)
VALUES ('sales lead',100000,1),('sales person', 80000,1),
('lead engineer',200000,2),('software engineer',150000,2),
('account manager',160000,3),('accountant',125000,3),
('legal lead',300000,4),('lawyer',200000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('Troy', 'Doe',1,NULL),('Hunter','Chan',2,1),
('Eric','Brat',3,NULL),('Diego','Champ',4,3),
('Connor','Lol',5,NULL),('Big','Ja',6,5),
('Charles','Barkley',7,NULL),('Lebron','James',8,7);