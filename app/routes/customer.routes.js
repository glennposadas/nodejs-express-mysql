module.exports = app => {
  const customers = require("../controllers/customer.controller");

  const router = require("express").Router();

  // Create a new Customer
  router.post("/", customers.create);

  // Retrieve all Customers
  router.get("/", customers.findAll);

  // Search for a customer.
  router.get("/search", customers.search)

  // Retrieve a single Customer with customerId
  router.get("/:customerId", customers.findOne);

  // Update a Customer with customerId
  router.put("/:customerId", customers.update);

  // Delete a Customer with customerId
  router.delete("/:customerId", customers.delete);

  // Create a new Customer
  router.delete("/", customers.deleteAll);

  app.use("/api/customers", router)
};
