let movimentos = JSON.parse(localStorage.getItem("financeiro")) || [];

function salvarDados() {
  localStorage.setItem("financeiro", JSON.stringify(movimentos));
}

function adicionar() {
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value;

  if (!valor || valor <= 0) return;

  const data = new Date();

  const movimento = {
    valor,
    tipo,
    descricao,
    mes: data.getMonth(),
    ano: data.getFullYear()
  };

  movimentos.push(movimento);
  salvarDados();

  document.getElementById("valor").value = "";
  document.getElementById("descricao").value = "";

  atualizar();
}

function atualizar() {

  const data = new Date();
  const mesAtual = data.getMonth();
  const anoAtual = data.getFullYear();

  const nomesMeses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  let ganhosMes = 0;
  let gastosMes = 0;

  let listaHTML = "";

  movimentos.forEach((m) => {

    if (m.tipo === "ganho" && m.mes === mesAtual && m.ano === anoAtual) {
      ganhosMes += m.valor;
    }

    if (m.tipo === "gasto" && m.mes === mesAtual && m.ano === anoAtual) {
      gastosMes += m.valor;
    }

    listaHTML += `
      <div class="item ${m.tipo}">
        <span>${m.descricao || m.tipo}</span>
        <strong>${m.tipo === "ganho" ? "+" : "-"} R$ ${m.valor.toFixed(2)}</strong>
      </div>
    `;
  });

  document.getElementById("lista").innerHTML = listaHTML;

  document.getElementById("ganhosMes").innerText = "R$ " + ganhosMes.toFixed(2);
  document.getElementById("gastosMes").innerText = "R$ " + gastosMes.toFixed(2);
  document.getElementById("saldoTotal").innerText =
    "R$ " + (ganhosMes - gastosMes).toFixed(2);

  const titulo = document.getElementById("tituloMes");
  if (titulo) {
    titulo.innerText =
      "Gastos de " + nomesMeses[mesAtual] + " " + anoAtual;
  }
}

atualizar();
