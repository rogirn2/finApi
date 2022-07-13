const { response, request } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

const customers = [];

app.use(express.json());

app.listen(3333);

app.get("/statement", (req, res) => {
    const { cpf } = req.headers;

    const customer = customers.find(customer => customer.cpf === cpf);
    
    if(!customer) {
        return res.status(400).json({error: "Customer not found."})
    }

    return res.json(customer.statement);
});

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */
app.post("/account", (req, res) => {
    const { cpf, name } = req.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if(customerAlreadyExists) {
        return res.status(400).json({error: "Customer already exists!"});
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });
    return res.status(201).send();
});

app.put("/courses/:id", (req, res) => {
    return res.json([ "Curso Alterado", "Curso 2", "Curso 3", "Curso 4" ])
});

app.patch("/courses/:id", (req, res) => {
    return res.json([ "Curso Alterado", "Curso Patch", "Curso 3", "Curso 4" ])
});

app.delete("/courses/:id", (req, res) => {
    return res.json([ "Curso Alterado", "Curso Patch", "Curso 3" ])
});