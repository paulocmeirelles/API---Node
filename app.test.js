const supertest = require("supertest");
const app = require("./server.js");
const test = require("tape");

// test("GET /contas/12345678911", (t) => {
//   supertest(app)
//     .get("/contas/12345678911")
//     .expect("Content-Type", /json/)
//     .expect(200)
//     .end((err, res) => {
//       t.error(err, "Sem erros");
//       t.assert(res._body[0].cpf === "12345678911", "CPF correto");
//       t.end();
//     });
// });

test("POST /contas", (t) => {
  supertest(app)
    .post("/contas")
    .send({ cpf: 75395145677, nome_completo: "Joaquim Levi", saldo_reais: 1.0 })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, "Sem erros");
      console.log(res._body);
      t.assert(
        res._body.message === "Conta criada com CPF: 75395145677",
        "CPF correto"
      );
      t.end();
    });
});
