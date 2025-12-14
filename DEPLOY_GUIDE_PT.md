# Guia de Deploy e Manutenção - Rei das Contas

Este guia explica como colocar seu site online 24h e como realizar manutenções futuras.

## Estrutura do Projeto
O projeto é dividido em duas partes que devem ser hospedadas separadamente (ou juntas em um VPS):
1.  **Frontend (Site)**: React + Vite (O que o usuário vê).
2.  **Backend (API)**: Node.js + Express (Processa pagamentos).

---

## 🚀 Como Colocar Online (Opção Gratuita Recomendada)

### Passo 1: Subir código para o GitHub
1.  Crie uma conta no [GitHub](https://github.com).
2.  Crie um novo repositório (ex: `rei-das-contas`).
3.  No seu computador (VS Code), envie o código:
    ```bash
    git init
    git add .
    git commit -m "Primeiro deploy"
    git branch -M main
    git remote add origin https://github.com/SEU_USUARIO/rei-das-contas.git
    git push -u origin main
    ```

### Passo 2: Hospedar o Backend (API) no Render.com
O Render possui um plano gratuito excelente para Node.js.
1.  Crie conta no [Render.com](https://render.com).
2.  Clique em **"New +"** -> **"Web Service"**.
3.  Conecte seu GitHub e selecione o repositório `rei-das-contas`.
4.  Preencha:
    *   **Name**: `rei-das-contas-api`
    *   **Root Directory**: `server` (Importante! O back está na pasta server)
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
5.  Clique em **"Advanced"** e adicione as Variáveis de Ambiente (Environment Variables):
    *   Não precisa adicionar nada especial se suas chaves já estiverem no código, mas o ideal é movê-las para cá por segurança (MERCADO_PAGO_ACCESS_TOKEN, etc).
6.  Clique em **"Create Web Service"**.
7.  **Copie a URL gerada** (ex: `https://rei-das-contas-api.onrender.com`).

### Passo 3: Hospedar o Frontend (Site) na Vercel
A Vercel é a melhor plataforma para React.
1.  Crie conta na [Vercel.com](https://vercel.com).
2.  Clique em **"Add New..."** -> **"Project"**.
3.  Importe o mesmo repositório do GitHub.
4.  Configure:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `./` (padrão)
5.  Em **Environment Variables**, adicione:
    *   `VITE_API_URL`: Cole a URL do Backend que você criou no Passo 2 (ex: `https://rei-das-contas-api.onrender.com/api/orders`).
    *   **Atenção**: Coloque o `/api/orders` no final se sua lógica esperar, ou ajuste no código `payment.ts`. No código atual, ele espera a URL base sem o endpoint se você configurou assim, ou completa. 
    *   *Correção*: No `payment.ts` configuramos `API_BASE_URL`. Então coloque a URL base: `https://rei-das-contas-api.onrender.com/api/orders`.
6.  Clique em **"Deploy"**.

---

## 🛠️ Como Alterar aos Poucos

Com o GitHub conectado, o processo de atualização é automático (CI/CD):

1.  **Trabalhe Localmente**:
    *   Abra o VS Code.
    *   Rode o projeto (`npm run dev` e `node server/index.js`).
    *   Faça as alterações desejadas no código.
    *   Teste se funcionou.

2.  **Envie as Atualizações**:
    *   Abra o terminal e digite:
    ```bash
    git add .
    git commit -m "Descrição do que você mudou (ex: mudei a cor do botão)"
    git push
    ```

3.  **Resultado**:
    *   Assim que você der `git push`, a Vercel e o Render detectarão a mudança e atualizarão o site online automaticamente em alguns minutos.

## 📝 Lista de Tarefas Recomendadas (Melhorias)
- [ ] Criar arquivo `.env` no backend para não deixar chaves do Mercado Pago expostas no GitHub.
- [ ] Adicionar mais validações no formulário de pagamento.
- [ ] Criar uma página de admin simples para ver os pedidos sem entrar no Mercado Pago.
