const express = require('express')
const data = require("./datacrud")
const path = require('path');

const exp = express()

exp.use("/ecommerce", data)
exp.use(express.static(path.join(__dirname, '../zealous final project/ui/build')));

exp.get('*', async (request, response) => {
    response.sendFile(path.join(__dirname, '../zealous final project/ui/build/index.html'));
});


exp.listen(1234, () => {
    console.log("express connected!!!!!!!!!!!")
})