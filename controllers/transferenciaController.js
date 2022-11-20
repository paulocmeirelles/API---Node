const Pool = require("pg").Pool;
require("dotenv").config({ path: "../secrets/secretKeys.env" });

const pool = new Pool({
  user: process.env.user || "psql",
  host: process.env.host || "localhost",
  database: process.env.database || "apinode",
  password: process.env.password || "password",
  port: process.env.port || 5432,
});

const transferBetweenConta = async (request, response) => {
  const cpf = parseInt(request.params.id);
  const { cpfTransferido, saldo_reais } = request.body;

  pool.query(
    "UPDATE contas SET saldo_reais = CASE cpf WHEN $2 THEN (SELECT saldo_reais FROM contas WHERE cpf = $2)-$1 WHEN $3 THEN (SELECT saldo_reais FROM contas WHERE cpf = $3)+$1 ELSE saldo_reais END WHERE cpf in($2,$3)",
    [saldo_reais, cpf, cpfTransferido],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Conta modificada com CPF: ${cpf}`);
    }
  );
};

module.exports = {
  transferBetweenConta,
};
