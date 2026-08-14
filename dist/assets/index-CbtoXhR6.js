(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{var e=[],t=document.querySelectorAll(`.produto`),n=document.querySelector(`.itens-carrinho`),r=document.querySelector(`.total-carrinho`),i=document.querySelector(`.contador-carrinho`),a=document.querySelector(`.carrinho`),o=document.querySelector(`.carrinho-modal`),s=document.querySelector(`.fechar-carrinho`),c=document.querySelector(`.finalizar-pedido`);function l(){n.innerHTML=``;let t=0,a=0;e.forEach((e,r)=>{let i=e.preco*e.quantidade;t+=i,a+=e.quantidade;let o=document.createElement(`div`);o.className=`item-carrinho`,o.innerHTML=`
      <div class="item-carrinho-info">
        <strong>${e.nome}</strong>
        <span>R$ ${e.preco.toFixed(2)} cada</span>
      </div>

      <div class="quantidade-carrinho">
        <button data-acao="diminuir" data-index="${r}">−</button>
        <strong>${e.quantidade}</strong>
        <button data-acao="aumentar" data-index="${r}">+</button>
        <button data-acao="remover" data-index="${r}">🗑️</button>
      </div>

      <strong>Subtotal: R$ ${i.toFixed(2)}</strong>
    `,n.appendChild(o)}),r.textContent=`Total: R$ `+t.toFixed(2),i.textContent=a}t.forEach(t=>{t.querySelector(`.adicionar`).addEventListener(`click`,()=>{let n=t.querySelector(`h3`).textContent.trim(),r=Number(t.querySelector(`.preco`).textContent.replace(`R$`,``).replace(/\./g,``).replace(`,`,`.`).trim()),i=e.find(e=>e.nome===n);i?i.quantidade++:e.push({nome:n,preco:r,quantidade:1}),l()})}),n.addEventListener(`click`,t=>{let n=t.target.closest(`button`);if(!n)return;let r=Number(n.dataset.index),i=n.dataset.acao;e[r]&&(i===`aumentar`&&e[r].quantidade++,i===`diminuir`&&(e[r].quantidade--,e[r].quantidade<=0&&e.splice(r,1)),i===`remover`&&e.splice(r,1),l())}),a.addEventListener(`click`,()=>{o.classList.add(`aberto`)}),s.addEventListener(`click`,()=>{o.classList.remove(`aberto`)});var u=document.querySelector(`.checkout-modal`),d=document.querySelector(`.fechar-checkout`),f=document.querySelector(`#nome-cliente`),p=document.querySelector(`#telefone-cliente`),m=document.querySelector(`#endereco-cliente`),h=document.querySelector(`#pagamento-cliente`),g=document.querySelector(`#campo-troco`),_=document.querySelector(`#troco-cliente`),v=document.querySelector(`#checkout-entrega`),y=document.querySelector(`#checkout-total`),b=document.querySelector(`.enviar-whatsapp`),x=5;function S(){return e.reduce((e,t)=>e+t.preco*t.quantidade,0)}function C(){let e=S()+x;v.textContent=`R$ `+x.toFixed(2).replace(`.`,`,`),y.textContent=`R$ `+e.toFixed(2).replace(`.`,`,`)}c.addEventListener(`click`,()=>{if(e.length===0){alert(`Carrinho vazio!`);return}C(),u.classList.add(`aberto`)}),d.addEventListener(`click`,()=>{u.classList.remove(`aberto`)}),h.addEventListener(`change`,()=>{h.value===`Dinheiro`?g.classList.add(`visivel`):(g.classList.remove(`visivel`),_.value=``)}),b.addEventListener(`click`,()=>{let t=f.value.trim(),n=p.value.trim(),r=m.value.trim(),i=h.value;if(!t){alert(`Digite seu nome.`),f.focus();return}if(!n){alert(`Digite seu WhatsApp.`),p.focus();return}if(!r){alert(`Digite seu endereço.`),m.focus();return}if(!i){alert(`Escolha a forma de pagamento.`),h.focus();return}let a=S(),o=a+x,s=`PEDIDO - ADEGA PANICO MIL GRAU

`;s+=`CLIENTE
`,s+=`Nome: `+t+`
`,s+=`WhatsApp: `+n+`
`,s+=`Endereço: `+r+`

`,s+=`PRODUTOS
`,e.forEach(e=>{let t=e.preco*e.quantidade;s+=e.quantidade+`x `+e.nome+` - R$ `+t.toFixed(2)+`
`}),s+=`
Subtotal: R$ `+a.toFixed(2),s+=`
Entrega: R$ `+x.toFixed(2),s+=`
TOTAL: R$ `+o.toFixed(2),s+=`

Pagamento: `+i,i===`Dinheiro`&&(s+=`
Troco para: `+(_.value.trim()||`Não informado`));let c=`https://wa.me/5515992371760?text=`+encodeURIComponent(s);window.open(c,`_blank`)});var w=document.querySelectorAll(`.categoria`),T=document.querySelectorAll(`.produto`);w.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.categoria;w.forEach(e=>e.classList.remove(`ativo`)),e.classList.add(`ativo`),T.forEach(e=>{t===`todos`||e.dataset.categoria===t?e.style.display=``:e.style.display=`none`})})})}))();