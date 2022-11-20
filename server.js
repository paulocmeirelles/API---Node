const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const contasRoute = require("./routes/contasRoutes");
const transferenciaRoute = require("./routes/transferenciaRoutes");

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "API com NodeJS, Express e PostgreSQL" });
});

app.listen(PORT, () => {
  console.log(`API Rodando na Porta: ${PORT}.`);
});

app.use("/contas", contasRoute);
app.use("/transferencia", transferenciaRoute);

module.exports = app;
