const express =require('express');
const inquirer= require('inquirer');
const consoleTable= require('console.table');
const mySQL = require('mysql2');
require('dotenv').config();

const connect = mysql.createConnection(

    {
        host: 'local host',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME

    }
);


const db = mysql.createConnection(
    {
        host: 'local host',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
).promise();

const options = () => {
    inquirer.prompt([
    { 
        type: 'list',
        message:'WELCOME TO TEAM MANAGER, SELECT FROM THE FOLLOWING OPTIONS',
        choices: ['VIEW ALL EMPLOYEES','ADD EMPLOYEE','UPDATE EMPLOYEE ROLE','VIEW ALL ROLES','ADD ROLE','VIEW ALL DEPT','ADD A DEPARTMENT','QUIT'],
        name: 'start'
    }
]).then(o =>{
    switch(o.start){
        case 'VIEW ALL EMPLOYEES':
            viewEmployees();
            break;
        case 'ADD EMPLOYEE':
            addEmployee();
            break;
        case 'UPDATE EMPLOYEE ROLE':
            updateEmployee();
            break;
        case 'VIEW ALL ROLES':
            viewRoles();
            break;
        case 'ADD ROLE':
            addRole();
            break;
        case 'VIEW ALL DEPT':
            viewDept();
            break;
        case 'ADD A DEPARTMENT':
            addDept();
            break;
        case 'QUIT':
            console.log('YOU ARE SIGNED OUT.')
            break;
    }
})}

function viewEmployees(){
    const sql= `
    SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        role.salary,
        department.name AS department,
        FROM employee LEFT JOIN employee.role_id = role.id,
        FROM employee LEFT JOIN department ON role.department_id = department.id,
        FROM employee WHERE employee.manager <> NULL = manager.id;`
        connect.querey(sql, req,res => 
            
            
            
            
            )





}









