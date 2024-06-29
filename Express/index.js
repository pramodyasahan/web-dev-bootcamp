const express = require("express");
const app = express()

app.use(() => {
    console.log("Hey new callback")
})

app.listen(3000, () => {
    console.log("hello")
})