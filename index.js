const express = require('express');
const app = express();


app.use(express.json());
app.use("/api", require("./src/routers/api_router/api_router"));

app.use('/auth',require("./src/routers/auth_router/auth_router"));

app.listen(3000, function () {
  console.log("listen port 3000");
})