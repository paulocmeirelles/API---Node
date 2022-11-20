const supertest = require("supertest");
const app = require("../server.js");
const test = require("tape");

test("GET /contas/12345678911", (test) => {
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
      test.error(err, "Sem erros");
      test.assert(res._body[0].cpf == data.cpf, "CPF correto");
      test.assert(
        res._body[0].nome_completo == data.nome_completo,
        "Nome correto"
      );
      test.assert(
        res._body[0].saldo_reais == data.saldo_reais,
        "Saldo correto"
      );
      test.end();
    });
});
