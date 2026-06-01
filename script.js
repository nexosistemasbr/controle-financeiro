let dados = JSON.parse(localStorage.getItem("financeiro")) || {
  saldo: 0,
  ganhos: [],
  gastos: []
};let movimentos = [];

function adicionar() {
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value;

  if (!valor || valor <= 0) return;

  const data = new Date();
  const mes = data.getMonth();
  const ano = data.getFullYear();
  const nomesMeses = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

document.getElementById("tituloMes").innerText =
"Gastos de " + nomesMeses[mesAtual] + " " + anoAtual;

  const movimento = {
    valor,
    tipo,
    descricao,
    mes,
    ano
  };

  movimentos.push(movimento);salvarDados();

  document.getElementById("valor").value = "";
  document.getElementById("descricao").value = "";

  atualizar();
}

function atualizar() {
  const data = new Date();
  const mesAtual = data.getMonth();
  const anoAtual = data.getFullYear();
  let totalGastosMes = 0;

movimentos.forEach(m => {
  if (m.tipo === "gasto" && m.mes === mesAtual && m.ano === anoAtual) {
    totalGastosMes += m.valor;
  }
});

  let ganhosMes = 0;
  let gastosMes = 0;

  let ganhosAno = 0;
  let gastosAno = 0;

  let listaHTML = "";

  movimentos.forEach((m) => {

    if (m.tipo === "ganho") {
      if (m.mes === mesAtual && m.ano === anoAtual) {
        ganhosMes += m.valor;
      }
      if (m.ano === anoAtual) {
        ganhosAno += m.valor;
      }
    }

    if (m.tipo === "gasto") {
      if (m.mes === mesAtual && m.ano === anoAtual) {
        gastosMes += m.valor;
      }
      if (m.ano === anoAtual) {
        gastosAno += m.valor;
      }
    }

    listaHTML += `
      <div class="item ${m.tipo}">
        <span>${m.descricao || m.tipo}</span>
        <strong>${m.tipo === "ganho" ? "+" : "-"} R$ ${m.valor.toFixed(2)}</strong>
      </div>
    `;
  });

  const saldo = (ganhosMes - gastosMes);

  document.getElementById("ganhosMes").innerText = "R$ " + ganhosMes.toFixed(2);
  document.getElementById("gastosMes").innerText = "R$ " + gastosMes.toFixed(2);

  document.getElementById("ganhosAno").innerText = "R$ " + ganhosAno.toFixed(2);
  document.getElementById("gastosAno").innerText = "R$ " + gastosAno.toFixed(2);

  document.getElementById("saldoTotal").innerText = "R$ " + saldo.toFixed(2);

  document.getElementById("lista").innerHTML = listaHTML;
}
