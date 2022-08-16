import express from "express"
import cors from "cors"
import { nanoid } from "nanoid"

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;

let userBase = [];

app.post("/singup", (req, res) => {

    let body = req.body;

    if (!body.fistName || !body.lastName || !body.email || !body.password) {

        res.status(400).send(`required fields missing, request example:
        {
            "firstName": "john",
            "lastName": "Doe",
            "email": abc@abc.com",
            "password": "12345",

        }`

        );
        return;
    }

    let isFound = false;

    for (let i = 0; i < userBase.length; i++) {

        if (userBase[i].email === body.email.toLowerCase()) {
            isFound = true;
            break;
        }
    }

    if (isFound) {
        res.status(400).send({
            Message: `email ${body.email} already exist.`
        });
    }

    let newUser = {
        userId: nanoid(),
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email.toLowerCase(),
        password: body.password
    }

    userBase.push(newUser);
    res.status(201).send({ Message: "user is created" });
});

app.post("/login", (req, res) => {
    let body = req.body;

    if (!body.email || !body.password) {

        res.status(400).send(`required fields missing, request example:
          {
          
           "email": abc@abc.com",
           "password": "12345",

          }`

        );
        return;
    }

    let isFound = false;

    for (let i = 0; i < userBase.length; i++) {
        if (userBase[i].email === body.email) {
            isFound = true;
            if (userBase[i].password === body.password) {

                res.status(200).send({
                    firstName: userBase[i].firstName,
                    lastName: userBase[i].lastName,
                    email: userBase[i].email,
                    Message: "login sucacessful"
                })
                return;


            } else {
                res.status(401).send({
                    Message: "incorrect password"
                })
                return;
            }
        }

    }

    if (!isFound) {
        res.status(404).send({
            Message: "user not found"
        })
        return;
    }

});

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
});