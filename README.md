# Marmita After Hours — Lohran × Andressa

Versão **RAVE / NIGHT EDITION** do site Marmita do Casal. Projeto estático em HTML, CSS e JavaScript, pronto para GitHub Pages. A foto do casal está no arquivo `foto-casal.jpg` (incluída no pacote).

## Publicar

1. Extraia o ZIP.
2. Envie `index.html`, `styles.css`, `script.js`, `foto-casal.jpg` e `favicon.svg` **para a raiz** de um repositório GitHub.
3. Em **Settings > Pages**, escolha `Deploy from a branch`, branch `main`, pasta `/(root)` e salve.
4. Abra a URL que o GitHub Pages fornecer.

## Formspree configurado

O arquivo `script.js` já usa `https://formspree.io/f/xnppgdak`. **Não precisa alterar o código** para conectar o formulário. Faça uma inscrição real de teste depois de publicar e consulte o painel da sua conta Formspree. Caso peça verificação de e-mail/ativação, conclua pelo painel.

- A confirmação no site só aparece se o serviço responder ao envio com sucesso.
- Enviamos **nome, pão preferido e contato**. A resposta política **não é enviada**.
- A escolha da alternativa eliminatória mostra um erro em tela cheia com link para comprar um livro de Karl Marx.
- Os dados não são armazenados no GitHub; ficam no Formspree, cujo painel exige acesso à conta. O endpoint do formulário é público para permitir inscrições — não é uma senha de leitura.
- Não há música reproduzida automaticamente: o clima de rave vem do design, das cores e das animações. Isso evita áudio inesperado e problemas de direitos autorais.

## Testar localmente

Abra `index.html` no navegador ou rode `python -m http.server 8000` nesta pasta. Para testar o envio **sem gravar inscrições reais**, é possível simular a resposta do serviço no DevTools do navegador.

## Arquivos

- `index.html`: página, drawer, confirmação e rejeição.
- `styles.css`: visual noturno/rave, neon e responsividade, incluindo `prefers-reduced-motion`.
- `script.js`: interações do formulário e envio para Formspree.
- `foto-casal.jpg`: foto original enviada, sem retoques no arquivo.
- `favicon.svg`: ícone neon do site.
