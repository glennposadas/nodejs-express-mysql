module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  });

  return Customer;
}