const Pool = require("pg").Pool;
require("dotenv").config({ path: "../secrets/secretKeys.env" });

const pool = new Pool({
  user: process.env.user || "psql",
  host: process.env.host || "localhost",
  database: process.env.database || "apinode",
  password: process.env.password || "password",
  port: process.env.port || 5432,
});

const getConta = (request, response) => {
  pool.query("SELECT * FROM contas ORDER BY cpf ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getContaByCPF = (request, response) => {
  const cpf = parseInt(request.params.id);

  pool.query("SELECT * FROM contas WHERE cpf = $1", [cpf], (error, results) => {
    if (error) {
      res.status(400).send({
        message: "Este cpf não existe",
      });
    }
    response.status(200).json(results.rows);
  });
};

const createConta = (request, response) => {
  const { cpf, nome, saldo_reais } = request.body;

  pool.query(
    "INSERT INTO contas (cpf, nome_completo,saldo_reais) VALUES ($1, $2, $3) RETURNING *",
    [cpf, nome, saldo_reais],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Conta criada com CPF: ${results.rows[0].cpf}`);
    }
  );
};

const updateConta = (request, response) => {
  const cpf = parseInt(request.params.id);
  const { saldo_reais } = request.body;

  pool.query(
    "UPDATE contas SET saldo_reais = (SELECT saldo_reais FROM contas WHERE cpf = $2)+$1 WHERE cpf = $2 AND (SELECT saldo_reais FROM contas WHERE cpf = $2)+$1>0",
    [saldo_reais, cpf],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Conta modificada com CPF: ${cpf}`);
    }
  );
};

const deleteConta = (request, response) => {
  const cpf = parseInt(request.params.id);

  pool.query("DELETE FROM contas WHERE cpf = $1", [cpf], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Conta deletada com CPF: ${cpf}`);
  });
};

module.exports = {
  getConta,
  getContaByCPF,
  createConta,
  updateConta,
  deleteConta,
};
