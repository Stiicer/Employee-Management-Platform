const inquirer= require('inquirer');
const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());


const connect = mysql.createConnection(

    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);
const db = mysql.createConnection(

    {
        host: 'localhost',
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
})};

function viewEmployees(){
    const sql= `
    SELECT  
        a.id,
        a.first_name,
        a.last_name,
        l.title,
        l.salary,
        d.name AS department,
        CONCAT(b.first_name, " ", b.last_name) AS manager
        FROM employee a LEFT JOIN role l ON a.role_id = l.id
        LEFT JOIN department d ON l.department_id = d.id
        LEFT JOIN employee b ON a.manager_id = b.id;`

        connect.query(sql, (err,res) => {
            if (err) {
                
                return err;
                
              }else {console.table(res);}
              
              options(); 
        });
        
};
async function addEmployee(){
    let employeeArray = [];
    let eArray = [];
    let roleArray = [];
    let rArray = [];
   

    await db.query('SELECT id AS value, CONCAT (first_name," ",last_name) AS name FROM employee;').then(res=>{
        res[0].forEach(e => {
            employeeArray.push(e.name)
            eArray.push(e);
        });

    });
    await db.query('SELECT id, title FROM role').then(res =>{
        console.log(res);
        res[0].forEach(r => {
            roleArray.push(r.title)
            rArray.push(r);
        });
    });

    inquirer.prompt([
        {
            name: 'first_name',
            message: 'WHAT IS THE EMPLOYEES FIRST NAME',
            type: 'input'


        },
        {
            name: 'last_name',
            message: 'WHAT IS THE EMPLOYEES LAST NAME',
            type: 'input'

        },
        {
            name:'role',
            message:'WHAT IS THEIR ROLE',
            type:'list',
            choices: roleArray
        },
        {
            name:'manager',
            message:'WHO IS THEIR MANAGER',
            type:'list',
            choices: employeeArray
        },

    ])
    .then((a)=>{
        const first = a.first_name;
        const last = a.last_name;
        const role = a.role;
        const man = a.manager;
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)',[first,last,role,man],(err,res) =>{
            if (err) {
                res.status(400).json({ error: err.message });
                return;
              }else {console.table(res);} 
            });
            options();
    })};
    options();
    