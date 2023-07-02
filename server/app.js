const express = require("express")
const BodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const PORT = 7000

const UserRoute = require('./routes/userRoutes')
const AnimalRoute = require("./routes/animalRoute.js")
const eventRoute = require("./routes/eventRoute")
const animalforsaleRoute = require("./routes/animalforsaleRoute")
const pairRoute = require("./routes/pairRoute")
const StockRoute = require("./routes/stockRoute")
const BirthRoute = require("./routes/birthRoute")

app.use(express.json())
app.use(cors())
app.use(BodyParser.json())
app.use(express.urlencoded({ extended: true })) 
app.use('/uploads', express.static('uploads'));


app.use("/users", UserRoute)
app.use("/animal", AnimalRoute)
app.use("/event", eventRoute)
app.use("/animalforsale", animalforsaleRoute)
app.use("/pair", pairRoute)
app.use("/stock", StockRoute)
app.use("/birth", BirthRoute)

app.listen(PORT, () => {
    console.log(`server demarer sur http://localhost:${PORT}`)
})

