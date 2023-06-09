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


// Insert post
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


// Select single post
app.get('/getposts/:id', (req, res) =>{
    let sql = `SELECT * FROM posts WHERE id = ${req. params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(result);
    })
})


// Update Post
app.get('/updatepost/:id', (req, res)=>{
    let newTitle = 'Post one';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send("Post Updated");
    })
})

// DELETE posts
app.get('/deletepost/:id', (req, res)=>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send("Post deleted");
    })
})



app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})
