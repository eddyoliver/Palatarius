# 🍔 Palatarius Digital Cardápio v3

**Versão oficial do cardápio digital interativo da Palatarius — Seropédica-RJ.**  
Desenvolvido com HTML, CSS e JavaScript puros, o sistema combina design moderno, fluxo intuitivo de pedidos e um painel administrativo secreto para edição total do cardápio, ingredientes e personalizações.

---

## 🚀 Funcionalidades Principais

### 🧭 Fluxo do Cliente
- Tela inicial com **dados do cliente** (nome, telefone, entrega/retirada e endereço).
- Cardápio dinâmico dividido por grupos:
  - 🍔 **Hambúrgueres**
  - 🍟 **Batatas**
  - 🥔 **Batatas Recheadas**
  - 🥟 **Pastéis**
  - 🌭 **Cachorros-Quentes**
  - 🍨 **Sorvetes & Açaís**
  - 🧃 **Bebidas**
- Modal interativo de ingredientes:
  - Permite escolher carnes, molhos, toppings, acompanhamentos, etc.
  - Cada grupo respeita **limites personalizados** por item (ex: 1 carne, 2 molhos, 1 crocante).
  - Ingredientes pausados aparecem **cinza e desativados**.
- Campo de **observação** antes de adicionar ao carrinho.
- Carrinho dinâmico com resumo detalhado de cada produto.
- Envio automático via **WhatsApp oficial da Palatarius**:
  - 📞 [`https://wa.me/5521997599132`](https://wa.me/5521997599132)
  - Mensagem formatada com nome, ingredientes e total.

---

## 🧂 Painel Administrativo Secreto

markdown
Copiar código
- O editor será aberto sobre o site.

### ⚙️ Funções do Editor
- **Abas de navegação:**
- 🍔 **Cardápio:** adicionar, editar e excluir produtos.
- 🧂 **Ingredientes:** gerenciar, pausar ou excluir ingredientes.
- **Limites personalizados por grupo** (ex: carnes, molhos, toppings).
- **Importar e exportar JSON** com toda a estrutura (produtos e ingredientes).
- **Salvamento automático local:** tudo é gravado no navegador (LocalStorage).
- **Restauração automática:** ao recarregar a página, os dados são recuperados.

---

## 💾 Estrutura de Arquivos

📁 assets/
├── images/
│ ├── hadouken.jpg
│ ├── fatality.jpg
│ ├── chamas_dragao.jpg
│ ├── ...
│ └── coca_2l.jpg
└── css/
└── (CSS interno incluído no HTML)

📄 index_final_v3.html
📄 README.md

yaml
Copiar código

> 💡 As imagens devem ser colocadas em `assets/images/` e o editor usa **somente o nome do arquivo** (ex: `hadouken.jpg`).

---

## ⚙️ Estrutura Interna (Blocos do Código)

| Bloco | Descrição |
|-------|------------|
| **1** | Estrutura HTML e tema visual (CSS) |
| **2** | Telas de cliente e cardápio dinâmico |
| **3** | Modal de ingredientes, carrinho e envio WhatsApp |
| **4** | Painel do editor (produtos + ingredientes) |
| **5** | Dados iniciais completos do cardápio Palatarius |
| **6** | Salvamento automático, restauração e finalização |

---

## 🧠 Limites Padrão de Ingredientes

| Grupo | Limite Padrão |
|--------|----------------|
| Carnes | 1 |
| Molhos | 2 |
| Crocantes Extras | 1 |
| Proteínas | 2 |
| Acompanhamentos | 5 |
| Toppings | 3 |
| Caldas | 3 |
| Caldas Fini (+R$1) | 2 |

> Cada produto pode ter seus próprios limites definidos no editor.

---

## 📦 Deploy no GitHub Pages

### Passos:
1. Crie um repositório no GitHub (ex: `palatarius-cardapio`).
2. Envie os arquivos:
   - `index_final_v3.html`
   - `README.md`
   - pasta `assets/` com as imagens.
3. Vá em **Settings → Pages → Branch: main → / (root)** → **Save**.
4. O site ficará disponível em:
https://<seu-usuario>.github.io/palatarius-cardapio/

yaml
Copiar código
5. Pronto! O cardápio digital estará online e funcional 🎉

---

## 🧑‍🍳 Créditos

**Desenvolvimento e Conceito:**  
Edmar de Oliveira (Eddy) – Palatarius  

**IA Assistente Técnica:**  
ChatGPT (OpenAI – GPT-5)  

---

## 🧩 Licença

© 2025 Palatarius. Todos os direitos reservados.  

Uso e modificação permitidos apenas com autorização da marca Palatarius.
