import express from "express"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;

let users = [];

// genrate random number from 1 to 1000000

function randomNumber() {
    return Math.floor(Math.random() * 100000000)

}

app.post("/user", (req, res) => {
    console.log(req.body);

    let newUser = {
        id: randomNumber(),
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
    }

    users.push(newUser);

    res.status(201).send('user is created');
})

app.get("/user/:userId", (req, res) => {  // get single user

    let userId = req.params.userId;
    let isFound = false;

    for (let i = 0; i < users.length; i++) {

        if (users[i].id == userId) {
            req.send(users[i]);
            isFound = true;
            break;
        }
    }
    if (!isFound) {
        req.status(204).send("user not found");
    }

})

app.get("/users", (req, res) => {  // get all users
    res.send(users);
})

app.put("/user/:userId", (req, res) => { // to modify single user
    res.send('user is modified');

    let userId = req.params.userId;
    let userIndex = -1

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            userIndex = i;
            break;
        }
    }
    if (userIndex === -1) {
        req.status(204).send("user not found");
    } else {
        if (req.body.fullname) {
            users[userIndex].fullname = req.body.fullname
        };

        if (req.body.username) {
            users[userIndex].fullname = req.body.username
        };
        if (req.body.password) {
            users[userIndex].fullname = req.body.password
        };

        req.send(users[userIndex]);
    }
})

app.delete("/user/:userId", (req, res) => {  // delete single user

    let userId = req.params.userId;
    let userIndex = -1

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            userIndex = i;
            break;
        }
        if (userIndex === -1) {
            req.status(204).send("user not found");

        } else {
            users.splice(userIndex, 1);
            res.send('user is deleted')
        }

    }


})

app.delete("/users", (req, res) => {  // delete all user

    users = [];

    res.send('all users delete')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/profile', (req, res) => {
    res.send('this is profile.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})