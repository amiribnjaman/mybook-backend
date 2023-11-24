const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config();
require("./config/db");
const PORT = process.env.PORT || 4000


// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Testing route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'All right'
    })
})

// Handling url error
app.use((req, res, next)=> {
    res.status(404).json({
        message: 'Bad request'
    })
})

// Handling server error
app.use((error, req, res, next) => {
    res.status(500).json({
        message: "Internal problem"
    })
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
