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
        //console.log(result)
    })
})

// Create a Table
app.get('/createpoststable', (req, res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id) )';

    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send("Posts Table Created");
    })
})

// Insert post 1
app.get('/addpost', (req, res)=>{
    let post  ={
        title: 'Post three',
        body: 'This is post number 3'
    }

    let sql = "INSERT INTO posts SET ?";

    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post 1 Added");
    })
})

// Select POSTS
app.get('/getposts', (req, res) =>{
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;

        res.send(result);
    })
})



app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})
