const express = require("express");

const server = express();

server.use(express.json());

let users = [
    {
        id: 1,
        name: "Henry Nelson",
        bio: "A Web Developer"
    }
]

server.get("/", (req, res) => {
    res.json({ api: "Up and running!" });
  });


server.get('/api/users', (req, res) => {
    res.json(users)
})

server.post('/api/users', (req, res) => {
    const userInformation = req.body;

    console.log(userInformation)
   
    if( userInformation.hasOwnProperty(users.name) ){
        users.push( userInformation);
        res.status(201).json(userInformation)
    
    } else {
        res.status(500).json({errorMessage: "Please provide name and bio for the user."})
    }

    
})

server.listen(5000,  () => console.log("\n== API is up ==\n") )