const express = require('express');
const app = express();

var Port=process.env.PORT||3000;
app.use(express.json());
app.use("/api",require("./src/routers/api_router/api_router"));

app.use("/admin",require("./src/routers/admin/admin_router"));

app.use('/auth',require("./src/routers/auth_router/auth_router"));


app.listen(Port, function () {
  console.log("listen port "+Port);
})