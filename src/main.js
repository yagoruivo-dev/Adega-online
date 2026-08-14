const carrinho = [];

const produtos = document.querySelectorAll('.produto');
const itensCarrinho = document.querySelector('.itens-carrinho');
const totalCarrinho = document.querySelector('.total-carrinho');
const contadorCarrinho = document.querySelector('.contador-carrinho');
const botaoCarrinho = document.querySelector('.carrinho');
const modal = document.querySelector('.carrinho-modal');
const fecharCarrinho = document.querySelector('.fechar-carrinho');
const finalizarPedido = document.querySelector('.finalizar-pedido');

function atualizarCarrinho() {
  itensCarrinho.innerHTML = '';

  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;

    total += subtotal;
    quantidadeTotal += item.quantidade;

    const div = document.createElement('div');
    div.className = 'item-carrinho';

    div.innerHTML = `
      <div class="item-carrinho-info">
        <strong>${item.nome}</strong>
        <span>R$ ${item.preco.toFixed(2)} cada</span>
      </div>

      <div class="quantidade-carrinho">
        <button data-acao="diminuir" data-index="${index}">−</button>
        <strong>${item.quantidade}</strong>
        <button data-acao="aumentar" data-index="${index}">+</button>
        <button data-acao="remover" data-index="${index}">🗑️</button>
      </div>

      <strong>Subtotal: R$ ${subtotal.toFixed(2)}</strong>
    `;

    itensCarrinho.appendChild(div);
  });

  totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2);
  contadorCarrinho.textContent = quantidadeTotal;
}

produtos.forEach(produto => {
  const botaoAdicionar = produto.querySelector('.adicionar');

  botaoAdicionar.addEventListener('click', () => {
    const nome = produto.querySelector('h3').textContent.trim();

    const preco = Number(
      produto.querySelector('.preco').textContent
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim()
    );

    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({
        nome,
        preco,
        quantidade: 1
      });
    }

    atualizarCarrinho();
  });
});

itensCarrinho.addEventListener('click', event => {
  const botao = event.target.closest('button');

  if (!botao) return;

  const index = Number(botao.dataset.index);
  const acao = botao.dataset.acao;

  if (!carrinho[index]) return;

  if (acao === 'aumentar') {
    carrinho[index].quantidade++;
  }

  if (acao === 'diminuir') {
    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
      carrinho.splice(index, 1);
    }
  }

  if (acao === 'remover') {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
});

botaoCarrinho.addEventListener('click', () => {
  modal.classList.add('aberto');
});

fecharCarrinho.addEventListener('click', () => {
  modal.classList.remove('aberto');
});

const checkoutModal = document.querySelector('.checkout-modal');
const fecharCheckout = document.querySelector('.fechar-checkout');
const nomeCliente = document.querySelector('#nome-cliente');
const telefoneCliente = document.querySelector('#telefone-cliente');
const enderecoCliente = document.querySelector('#endereco-cliente');
const pagamentoCliente = document.querySelector('#pagamento-cliente');
const campoTroco = document.querySelector('#campo-troco');
const trocoCliente = document.querySelector('#troco-cliente');
const checkoutEntrega = document.querySelector('#checkout-entrega');
const checkoutTotal = document.querySelector('#checkout-total');
const enviarWhatsapp = document.querySelector('.enviar-whatsapp');

const taxaEntrega = 5.00;

function calcularTotalCarrinho() {
  return carrinho.reduce((total, item) => {
    return total + (item.preco * item.quantidade);
  }, 0);
}

function atualizarTotalCheckout() {
  const total = calcularTotalCarrinho() + taxaEntrega;

  checkoutEntrega.textContent =
    'R$ ' + taxaEntrega.toFixed(2).replace('.', ',');

  checkoutTotal.textContent =
    'R$ ' + total.toFixed(2).replace('.', ',');
}

finalizarPedido.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Carrinho vazio!');
    return;
  }

  atualizarTotalCheckout();
  checkoutModal.classList.add('aberto');
});

fecharCheckout.addEventListener('click', () => {
  checkoutModal.classList.remove('aberto');
});

pagamentoCliente.addEventListener('change', () => {
  if (pagamentoCliente.value === 'Dinheiro') {
    campoTroco.classList.add('visivel');
  } else {
    campoTroco.classList.remove('visivel');
    trocoCliente.value = '';
  }
});

enviarWhatsapp.addEventListener('click', () => {
  const nome = nomeCliente.value.trim();
  const telefone = telefoneCliente.value.trim();
  const endereco = enderecoCliente.value.trim();
  const pagamento = pagamentoCliente.value;

  if (!nome) {
    alert('Digite seu nome.');
    nomeCliente.focus();
    return;
  }

  if (!telefone) {
    alert('Digite seu WhatsApp.');
    telefoneCliente.focus();
    return;
  }

  if (!endereco) {
    alert('Digite seu endereço.');
    enderecoCliente.focus();
    return;
  }

  if (!pagamento) {
    alert('Escolha a forma de pagamento.');
    pagamentoCliente.focus();
    return;
  }

  const subtotal = calcularTotalCarrinho();
  const total = subtotal + taxaEntrega;

  let mensagem = 'PEDIDO - ADEGA PANICO MIL GRAU\n\n';

  mensagem += 'CLIENTE\n';
  mensagem += 'Nome: ' + nome + '\n';
  mensagem += 'WhatsApp: ' + telefone + '\n';
  mensagem += 'Endereço: ' + endereco + '\n\n';

  mensagem += 'PRODUTOS\n';

  carrinho.forEach(item => {
    const subtotalItem = item.preco * item.quantidade;

    mensagem +=
      item.quantidade +
      'x ' +
      item.nome +
      ' - R$ ' +
      subtotalItem.toFixed(2) +
      '\n';
  });

  mensagem += '\nSubtotal: R$ ' + subtotal.toFixed(2);
  mensagem += '\nEntrega: R$ ' + taxaEntrega.toFixed(2);
  mensagem += '\nTOTAL: R$ ' + total.toFixed(2);

  mensagem += '\n\nPagamento: ' + pagamento;

  if (pagamento === 'Dinheiro') {
    mensagem += '\nTroco para: ' +
      (trocoCliente.value.trim() || 'Não informado');
  }

  const url =
    'https://wa.me/5515992371760?text=' +
    encodeURIComponent(mensagem);

  window.open(url, '_blank');
});




// FILTRO DE CATEGORIAS
const botoesCategoria = document.querySelectorAll('.categoria');
const produtosCatalogo = document.querySelectorAll('.produto');

botoesCategoria.forEach(botao => {
  botao.addEventListener('click', () => {
    const categoria = botao.dataset.categoria;

    botoesCategoria.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    produtosCatalogo.forEach(produto => {
      if (
        categoria === 'todos' ||
        produto.dataset.categoria === categoria
      ) {
        produto.style.display = '';
      } else {
        produto.style.display = 'none';
      }
    });
  });
});
