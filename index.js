const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const latestRoute = require("./Routes/latestRoute")
const popularRoute = require("./Routes/popularRoute")
const heroRoute = require("./Routes/heroRoute")
const newSeasonRoute = require("./Routes/newSeasonRoute")
const infoRoute = require("./Routes/infoRoute")

const app = express(); 
require("dotenv").config(); 

const serverTimeout = 60000
app.timeout = serverTimeout;

const originUri = process.env.ORIGIN_URI

const corsOptions = {
    origin: [originUri, "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
};

// api route origin
app.use(express.json());
app.use(cors(corsOptions)); 

// user login, regsiter, admin right
app.use("/api/users", userRoute);

// rest api
app.use(

    "/api/",    latestRoute, 
                popularRoute, 
                heroRoute, 
                newSeasonRoute, 
                infoRoute
)

// root 
app.get("/", (req, res) => {
    res.send("Welcome to somadb!");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || 5000;

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`);
});

mongoose
.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connection establised");
})
.catch((error) => console.log("MongoDB Connection failed: ", error.message));
