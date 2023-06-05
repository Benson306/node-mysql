let express = require('express');

let mysql = require('mysql');

// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql Connected")
});

let app = express();


// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';

    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send("Database Created");
        console.log(result)
    })
})



app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})
