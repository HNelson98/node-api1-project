const express = require("express");

const server = express();

server.use(express.json());

//set up a users array
let users = [
    {
        id: 1,
        name: "Henry Nelson",
        bio: "A Web Developer"
    }
]

//make sure the server is running
server.get("/", (req, res) => {
    res.json({ api: "Up and running!" });
});

//get the array of users

if (!users) {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
} else {
    server.get('/api/users', (req, res) => {
        res.status(201).json(users)
    })
}


//add a user
server.post('/api/users', (req, res) => {
    const userInformation = req.body;


    if (userInformation.name === undefined || userInformation.bio === undefined) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })


    } else if (!userInformation) {
        res.status(500).json({ errorMessage: "There was an error trying to get the data" })

    } else {
        users.push(userInformation)
        res.status(201).json(users)
    }


})

//get user by ID
server.get('/api/users/:id', (req, res) => {


    const id = Number(req.params.id)

    if (id) {
        const findUser = users.find(user => user.id === id)
        
        if (findUser) {
            res.status(201).json(findUser)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }

    } else {

        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})


//delete a user
server.delete('/api/users/:id', (req, res) =>{
    const id = Number(req.params.id)
    const findUser = users.find(user => user.id === id)
    if(id){
        if(findUser){
             users = users.filter(user => {
                return user.id !== id   
            })
        } else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } else {
        res.status(500).json({errorMessage: "The user could not be removed"})
    }
})

//edit and put a new user
server.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const findUser = users.find(user => user.id === id)
    const {name, bio} = req.body
    
    if (!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }else if (id){
        

        if(findUser){
            users = users.map(user => {
                if (user.id == id){
                    
                    return {id: id, ...req.body}
                } else {
                    return user
                }
            })
            res.status(200).json(users)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
    
})



server.listen(5000, () => console.log("\n== API is up ==\n"))