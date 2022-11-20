const supertest = require("supertest");
const app = require("../server.js");
const test = require("tape");

test("GET /contas/12345678911", (t) => {
  const data = {
    cpf: 12345678911,
    nome_completo: "Paulo Chaves Meirelles",
    saldo_reais: 49000.7,
  };
  supertest(app)
    .get("/contas/12345678911")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, "Sem erros");
      t.assert(res._body[0].cpf == data.cpf, "CPF correto");
      t.assert(
        res._body[0].nome_completo == data.nome_completo,
        "Nome correto"
      );
      t.assert(res._body[0].saldo_reais == data.saldo_reais, "Saldo correto");
      t.end();
    });
});
