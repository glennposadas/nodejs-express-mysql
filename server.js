const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

var corsOptions = {
  origin: "http://localhost:8081"
}

// cors
app.use(cors(corsOptions))

// morgan
app.use(morgan("combined"))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." })
});

require("./app/routes/customer.routes")(app)

const db = require("./app/models/db")

/*
if (process.env.NODE_ENV === 'production') {
  db.sequelize.sync()
} else {
  db.sequelize.sync({ force : true}).then(() => {
    console.log("Drop and re-sync db.")
  })
}*/

db.sequelize.sync()

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
