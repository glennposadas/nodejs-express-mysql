/**
 * 
 * APP owns ROUTER
 * ROUTER owns CONTROLLER
 * CONTROLLER owns MODEL
 * 
 */

const db = require("../models/db")
const Customer = db.customer
const Op = db.Sequelize.Op

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  // Create a Customer
  const customer = {
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  }

  // Save Customer in the database
  Customer.create(customer)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error has occured while creating the customer."
      })
    })
}

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {

  console.log("Find all customers")

  Customer.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    })
}

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  const customerId = req.params.customerId

  console.log("Find by PK: " + customerId)

  Customer.findByPk(customerId)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while finding a customer by ID"
      })
    })
}

// search for customer by email or name.
exports.search = (req, res) => {
  const q = req.query.q

  // Validate request
  if (!q) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  
  console.log("Search for: " + q)

  // WHERE name LIKE `q`.
  // const condition = q ? { name: { [Op.like]: `%${q}%` } } : null

  const like1 = { name: { [Op.like]: `%${q}%` } }
  const like2 = { email: { [Op.like]: `%${q}%` } }

  // WHERE name LIKE q OR name LIKE q
  const condition = q ? { [Op.or]: [like1, like2] } : null

  Customer.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching for customers."
      })
    })
}

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  console.log(req.body)

  const customerId = req.params.customerId

  Customer.update(req.body, {
    where: { id: customerId }
  })
    .then(num => {
      if(num == 1) {
        res.send ({
          message: "Customer record has been updated successfully!"
        })
      } else {
        res.send({
          message: "Customer ${customerId} couldn't be updated. Please try again later!."
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id " + req.params.customerId
      })
    })
}

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  const customerId = req.params.customerId

  Customer.destroy({ where: { id: customerId } })
    .then(num => {
      if(num == 1) {
        res.send ({
          message: "Customer record has been DELETED successfully!"
        })
      } else {
        res.send({
          message: "Customer ${customerId} couldn't be DELETED. Please try again later!."
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error DELETING Customer with id " + req.params.customerId
      })
    })
}

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({ 
    where: {},
    truncate: false })
    .then(num => {
      res.send ({
        message: "ALL DELETED SUCCESSFULLY!"
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error DELETING ALL RECORDS!"
      })
    })
}
