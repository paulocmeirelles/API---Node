const Pool = require("pg").Pool;
const pool = new Pool({
  user: "tech",
  host: "35.184.90.54",
  database: "appsgrowth",
  password: "Ohm<LTR$IbUX#%}V",
  port: 5432,
});

const getConta = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY cpf ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getContaByCPF = (request, response) => {
  const cpf = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE cpf = $1", [cpf], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createConta = (request, response) => {
  const { cpf, nome, saldo_reais } = request.body;

  pool.query(
    "INSERT INTO users (cpf, nome_completo,saldo_reais) VALUES ($1, $2, $3) RETURNING *",
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
    "UPDATE users SET saldo_reais = (SELECT saldo_reais FROM users WHERE cpf = $2)+$1 WHERE cpf = $2 AND (SELECT saldo_reais FROM users WHERE cpf = $2)+$1>0",
    [saldo_reais, cpf],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Conta modificada com CPF: ${cpf}`);
    }
  );
};

const transferBetweenConta = async (request, response) => {
  const cpf = parseInt(request.params.id);
  const { cpfTransferido, saldo_reais } = request.body;

  pool.query(
    "UPDATE users SET saldo_reais = CASE cpf WHEN $2 THEN (SELECT saldo_reais FROM users WHERE cpf = $2)-$1 WHEN $3 THEN (SELECT saldo_reais FROM users WHERE cpf = $3)+$1 ELSE saldo_reais END WHERE cpf in($2,$3)",
    [saldo_reais, cpf, cpfTransferido],
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

  pool.query("DELETE FROM users WHERE cpf = $1", [cpf], (error, results) => {
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
  transferBetweenConta,
};
