const carrinhoNovo = [];

document.addEventListener('DOMContentLoaded', () => {

  const produtos = document.querySelectorAll('.produto');
  const botaoCarrinho = document.querySelector('.carrinho');
  const contador = document.querySelector('.contador-carrinho');

  const modal = document.querySelector('#carrinho-novo');
  const fechar = document.querySelector('#fechar-carrinho-novo');
  const lista = document.querySelector('#lista-carrinho-novo');

  const subtotalEl = document.querySelector('#subtotal-novo');
  const totalEl = document.querySelector('#total-novo');

  const taxaEntrega = 5;

  function dinheiro(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
  }

  function atualizar() {

    lista.innerHTML = '';

    let subtotal = 0;
    let quantidadeTotal = 0;

    carrinhoNovo.forEach((item, index) => {

      const valorItem = item.preco * item.quantidade;

      subtotal += valorItem;
      quantidadeTotal += item.quantidade;

      const div = document.createElement('div');

      div.className = 'item-novo';

      div.innerHTML = `
        <div class="item-novo-topo">
          <div>
            <div class="item-novo-nome">${item.nome}</div>
            <div class="item-novo-preco">
              ${dinheiro(item.preco)} cada
            </div>
          </div>

          <strong>${dinheiro(valorItem)}</strong>
        </div>

        <div class="item-novo-controles">

          <button
            type="button"
            data-acao="diminuir"
            data-index="${index}"
          >−</button>

          <span class="numero">${item.quantidade}</span>

          <button
            type="button"
            data-acao="aumentar"
            data-index="${index}"
          >+</button>

          <button
            type="button"
            class="remover-novo"
            data-acao="remover"
            data-index="${index}"
          >🗑️</button>

        </div>
      `;

      lista.appendChild(div);
    });

    if (carrinhoNovo.length === 0) {
      lista.innerHTML = `
        <div class="carrinho-novo-vazio">
          <div>🛒</div>
          <h3>Carrinho vazio</h3>
          <p>Adicione produtos para fazer seu pedido.</p>
        </div>
      `;
    }

    const total = subtotal + taxaEntrega;

    subtotalEl.textContent = dinheiro(subtotal);
    totalEl.textContent = dinheiro(total);
    contador.textContent = quantidadeTotal;
  }

  produtos.forEach(produto => {

    const botaoAdicionar = produto.querySelector('.adicionar');

    if (!botaoAdicionar) return;

    botaoAdicionar.addEventListener('click', () => {

      const nome = produto.querySelector('h3')?.textContent.trim();

      const precoTexto =
        produto.querySelector('.preco')?.textContent || '';

      const preco = Number(
        precoTexto
          .replace('R$', '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim()
      );

      if (!nome || !preco) return;

      const existente =
        carrinhoNovo.find(item => item.nome === nome);

      if (existente) {
        existente.quantidade++;
      } else {
        carrinhoNovo.push({
          nome,
          preco,
          quantidade: 1
        });
      }

      atualizar();
    });
  });

  lista.addEventListener('click', event => {

    const botao = event.target.closest('button');

    if (!botao) return;

    const index = Number(botao.dataset.index);
    const acao = botao.dataset.acao;

    if (!carrinhoNovo[index]) return;

    if (acao === 'aumentar') {
      carrinhoNovo[index].quantidade++;
    }

    if (acao === 'diminuir') {
      carrinhoNovo[index].quantidade--;

      if (carrinhoNovo[index].quantidade <= 0) {
        carrinhoNovo.splice(index, 1);
      }
    }

    if (acao === 'remover') {
      carrinhoNovo.splice(index, 1);
    }

    atualizar();
  });

  botaoCarrinho.addEventListener('click', () => {
    atualizar();
    modal.classList.add('aberto');
  });

  fechar.addEventListener('click', () => {
    modal.classList.remove('aberto');
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      modal.classList.remove('aberto');
    }
  });

  atualizar();

  console.log('CARRINHO NOVO FUNCIONANDO');
});


/* FINALIZAR PEDIDO - NOVO */
document.addEventListener('DOMContentLoaded', () => {
  const finalizarNovo = document.querySelector('#finalizar-novo');
  const checkoutModal = document.querySelector('.checkout-modal');

  if (!finalizarNovo) {
    console.error('BOTAO FINALIZAR NAO ENCONTRADO');
    return;
  }

  finalizarNovo.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (carrinhoNovo.length === 0) {
      alert('Carrinho vazio!');
      return;
    }

    const subtotal = carrinhoNovo.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );

    const total = subtotal + 5;

    const checkoutTotal = document.querySelector('#checkout-total');
    const checkoutEntrega = document.querySelector('#checkout-entrega');

    if (checkoutEntrega) {
      checkoutEntrega.textContent = 'R$ 5,00';
    }

    if (checkoutTotal) {
      checkoutTotal.textContent =
        'R$ ' + total.toFixed(2).replace('.', ',');
    }

    if (checkoutModal) {
      checkoutModal.classList.add('aberto');
    } else {
      console.error('CHECKOUT MODAL NAO ENCONTRADO');
    }

    console.log('FINALIZAR PEDIDO CLICADO');
  });
});
