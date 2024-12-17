const express = require("express");
const customers = require("./config/customers");
const logger = require("./middleware/logger");
const validator = require("./middleware/validator");
const customerSchema = require("./schemas/customerSchema");

const app = express();

app.use(express.json());

app.post("/api/customers", validator(customerSchema), (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    ...req.body,
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// get all customers
app.get("/api/customers", logger, (req, res) => {
  let filteredCustomers = customers;

  // Filter by active status if provided
  if (req.query.active !== undefined) {
    const activeParam = req.query.active === "true";
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.active === activeParam
    );
  }

  // Filter by name if provided (case-insensitive partial match)
  if (req.query.name) {
    const nameQuery = req.query.name.toLowerCase();
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(nameQuery)
    );
  }

  res.send(filteredCustomers);
});

// get one customer
app.get("/api/customers/:id", (req, res) => {
  const data = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );

  if (!data) {
    return res
      .status(404)
      .json({ message: "customer with the specified id not found" });
  }

  res.send(data);
});

app.put("/api/customers/:id", validator(customerSchema), (req, res) => {
  const customerId = parseInt(req.params.id);
  const { name, email, active } = req.body;

  const index = customers.findIndex((customer) => customer.id === customerId);
  if (index === -1) {
    return res
      .status(404)
      .json({ message: "customer with the specified id not found" });
  }

  const updatedCustomer = { ...customers[index], name, email, active };
  customers[index] = updatedCustomer;

  res.status(200).json(updatedCustomer);
});

module.exports = app;
