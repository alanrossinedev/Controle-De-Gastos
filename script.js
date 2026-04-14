let gastos = [];

const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const categoria = document.getElementById("categoria");
const btn = document.getElementById("btnAdicionar");
const lista = document.getElementById("lista");
const totalSpan = document.getElementById("total");

// Adicionar gasto
btn.addEventListener("click", () => {
  const gasto = {
    descricao: descricao.value,
    valor: parseFloat(valor.value),
    categoria: categoria.value
  };

  if (!gasto.descricao || !gasto.valor) {
    alert("Preencha os campos!");
    return;
  }

  gastos.push(gasto);

  limparCampos();
  renderizar();
});

// Renderizar lista
function renderizar() {
  lista.innerHTML = "";

  gastos.forEach((gasto, index) => {
    const li = document.createElement("li");

    if (gasto.valor > 100) {
      li.classList.add("alto");
    }

    li.innerHTML = `
      ${gasto.descricao} - ${gasto.categoria} - R$ ${gasto.valor.toFixed(2)}
      <div>
        <button onclick="editar(${index})">✏️</button>
        <button onclick="remover(${index})">❌</button>
      </div>
    `;

    lista.appendChild(li);
  });

  calcularTotal();
}

// Calcular total
function calcularTotal() {
  const total = gastos.reduce((acc, g) => acc + g.valor, 0);
  totalSpan.textContent = total.toFixed(2);
}

// Remover item
function remover(index) {
  gastos.splice(index, 1);
  renderizar();
}

// Editar item
function editar(index) {
  const gasto = gastos[index];

  const novaDescricao = prompt("Nova descrição:", gasto.descricao);
  const novoValor = prompt("Novo valor:", gasto.valor);

  if (novaDescricao !== null && novoValor !== null) {
    gastos[index].descricao = novaDescricao;
    gastos[index].valor = parseFloat(novoValor);
    renderizar();
  }
}

// Limpar campos
function limparCampos() {
  descricao.value = "";
  valor.value = "";
  categoria.value = "";
}
