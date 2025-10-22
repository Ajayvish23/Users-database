//  IMPORT REQUIRED MODULES

const express=require('express');
const app= express();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path= require("path");
const methodOverride = require('method-override')

//  APP CONFIGURATION AND MIDDLEWARES

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true })); // Middleware-- for HTML form data
app.use(express.json()); // for JSON data (optional)

//  DATABASE CONNECTION SETUP

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'userList',
  password: 'your-password'
});


// A simple SELECT query
//let q="insert into myusers(id,username,email,password) values ?";
//let users=[
//    ['prem123', 'prem', 'prem@gmail.com', 'pass12345prem'],
//    ['shyam123', 'shyam', 'shyam123@gmail.com', 'password12345shyam']
//       ];

//try{
//connection.query(q, [data], (err,result)=>{
//  if (err){throw err};
//  //console.log(result);
//    });
//}
//catch(err){
//  console.log(err);
//}
//connection.end();

//let createRandomUser=()=> {
//  return [
//    faker.string.uuid(),
//    faker.internet.username(),
//    faker.internet.email(),
//    faker.internet.password(),
//  ];
//}

//let data=[];
//let userr=createRandomUser();
//for( i=1; i<=100; i++){
//  //console.log(userr);
//  data.push(createRandomUser());
//};

//  HOME ROUTE — Display total number of users

app.get("/", (req, res)=>{
   let q1="select count(*) from myusers";
   try{
      connection.query(q1, (err,result)=>{
         if (err){throw err};
            //console.log(result[0]);
            let userNum= result[0]["count(*)"];
            //console.log(userNum);
            res.render("home.ejs", {userNum});
      });
   }
   catch(err){
      console.log(err);
      res.send("some error in database");
   }
    //res.send("welcome home");
})


//  READ DATA FROM DATABASE — Show all users

app.get("/users", (req, res)=>{
   let q2="select * from myusers";
   try{
      connection.query(q2, (err,result)=>{          //passing [data] is not needed here as no placeholder (?) is used in query (q2) here
        if (err){throw err};
        //console.log(result);
        //res.send(result);
        res.render("user.ejs", {result});
      });
   }
   catch(err){
     console.log(err);
   }
//connection.end();
})

//  EDIT PAGE — Fetch single user for editing

app.get("/users/:id/edit", (req,res)=>{
   let { id }= req.params;
   let q = "SELECT * FROM myusers WHERE id = ?";

   connection.query(q, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error fetching user data");
      }
      let user = result[0];
      res.render("editdata.ejs", { user });
   });
   //res.send ("this is edit page");
})


//  UPDATE USER — With password verification

app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let { username, email, enteredPassword } = req.body; // fetching data from form

  // Step 1: Fetch stored password
  let fetchPassword = "SELECT password FROM myusers WHERE id = ?";

  connection.query(fetchPassword, [id], (err, result) => {
    if (err) {
      console.log("Error fetching password:", err);
      return res.send("Error fetching user data");
    }

    if (result.length === 0) {
      return res.send("User not found");
    }

    let userPass = result[0].password;

    // Step 2: Compare passwords
    if (userPass !== enteredPassword) {
      console.log("Wrong password");
      return res.send("Wrong password");
    }

    // Step 3: Update user if password matches
    let q = "UPDATE myusers SET username = ?, email = ? WHERE id = ?";
    connection.query(q, [username, email, id], (err, result) => {
      if (err) {
        console.log("Error updating user:", err);
        return res.send("Error updating user");
      }

      console.log("User updated successfully!");
      res.redirect("/users");
    });
  });
});



 // UPDATE USER — Without password verification

  //app.patch("/users/:id", (req, res) => {
  // let { id } = req.params;
  //let { username, email, password} = req.body;
  // let q = "UPDATE myusers SET username = ?, email = ?, password = ? WHERE id = ?";
  // connection.query(q, [username, email, password, id], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     return res.send("Error updating user");
  //   }
  //   console.log("User updated:", result);
  //   res.redirect("/users");
  // });
  //});


//  ADD NEW USER FORM

app.get("/users/new", (req, res)=>{
    //res.send("this is add new page");
    res.render("adduser.ejs")
})


//  CREATE NEW USER AND UPDATE THE DATABASE (POST Request)

app.post("/users", (req, res)=>{
    let {id, username, email, password}= req.body;
    let q3= "INSERT INTO myusers (id, username, email, password) VALUES (?,?,?,?);"
    connection.query(q3, [id,username,email,password], (err, result) => {
     if (err) {
       console.log("Error updating user:", err);
       return res.send("Error updating user");
     }
     console.log("User added successfully!");
     res.redirect("/users");
   });
})

// SHOW SINGLE USER DETAILS

app.get("/users/details/:id", (req, res)=>{
    //res.send("this is show user details");
    let {id}= req.params;
    q4="select * from myusers where id = ?;"
    connection.query(q4, [id], (err, result) => {
    if (err) {
      console.log("Error fetching user details:", err);
      return res.send("Error fetching user details");
    }
    let user = result[0];
    res.render("showuser.ejs", { user });
  });
    //res.render("showuser.ejs");
});

//  DELETE USER FROM DATABASE

app.delete("/users/details/:id", (req,res)=>{
    let {id}= req.params;
    q5="DELETE FROM myusers WHERE id= ?;"

    connection.query(q5, [id], (err, result) => {
    if (err) {
      console.log("Error fetching user details:", err);
      return res.send("Error fetching user details");
    }

    console.log("deleted successfully");
    res.redirect("/users");
  });
});


//  START THE SERVER

app.listen(8000, ()=>{
    console.log("Listening on port 8000...");
});