const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");

const PORT = process.env.PORT || 3000;

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

app.get("/contas", db.getConta);
app.get("/contas/:id", db.getContaByCPF);
app.post("/contas", db.createConta);
app.put("/contas/:id", db.updateConta);
app.put("/transferencia/:id", db.transferBetweenConta);
// app.delete("/contas/:id", db.deleteConta);

module.exports = app;
