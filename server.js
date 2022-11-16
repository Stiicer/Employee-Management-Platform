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

const options = [
    { 
        type: 'list',
        message:'WELCOME TO TEAM MANAGER, SELECT FROM THE FOLLOWING OPTIONS',
        choices: ['VIEW ALL EMPLOYEES','ADD EMPLOYEE','UPDATE EMPLOYEE ROLE','VIEW ALL ROLES','ADD ROLE','VIEW ALL DEPT','ADD A DEPARTMENT'],
        name: 'start'
    }
];

function viewEmployees(){
    const sql= `
    SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        role.salary,
        department.name,
        
    
    
    
    
    
    
    
    
    `




}









