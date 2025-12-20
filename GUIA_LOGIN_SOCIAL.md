# Guia de Configuração de Login Social (Google & Discord) no Supabase

Para que os botões de login funcionem, você precisa obter "chaves" (Credenciais) do Google e do Discord e colocá-las no seu painel do Supabase.

## 🔗 Passo Prévio: Descubra sua URL de Callback

1. Entre no seu projeto no **Supabase**.
2. Vá em **Authentication** (ícone de usuários) -> **Providers**.
3. Clique em **Google** (ou Discord).
4. Procure por **Callback URL** (deve ser algo como `https://sua-id-projeto.supabase.co/auth/v1/callback`).
5. **Copie essa URL**, você vai precisar dela nos passos abaixo.

---

## 🟣 1. Configurar Discord

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications).
2. Clique em **New Application** (botão no topo direito).
   - Dê um nome (ex: "Rei das Contas").
3. No menu lateral esquerdo, clique em **OAuth2**.
4. Copie o **Client ID** e cole no bloco de notas.
5. Clique em **Reset Secret** para gerar um novo **Client Secret**. Copie e cole no bloco de notas.
6. Em **Redirects**, clique em **Add Redirect**.
   - Cole a **Callback URL** do Supabase que você copiou no passo prévio.
   - Adicione também `http://localhost:3000` (para testes locais, se necessário).
   - Clique em **Save Changes**.
7. Volte no **Supabase** -> **Providers** -> **Discord**:
   - Ative a opção **Enable Discord**.
   - Cole o **Client ID**.
   - Cole o **Client Secret**.
   - Clique em **Save**.

---

## 🔵 2. Configurar Google

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto (Topo esquerdo -> Select Project -> New Project).
3. No menu lateral, vá em **APIs & Services** -> **OAuth consent screen**.
   - Escolha **External** e clique em Create.
   - Preencha "App Name" (Rei das Contas), "User support email" e "Developer contact info".
   - Clique em Save and Continue (Pode pular Scopes e Test Users por enquanto).
4. No menu lateral, vá em **Credentials**.
5. Clique em **+ CREATE CREDENTIALS** -> **OAuth client ID**.
   - **Application type**: Web application.
   - **Name**: Rei das Contas Web.
   - **Authorized JavaScript origins**: Adicione `http://localhost:3000` e a URL do seu site em produção (ex: `https://seu-site.vercel.app`).
   - **Authorized redirect URIs**: Cole a **Callback URL** do Supabase.
6. Clique em **Create**.
7. Copie o **Client ID** e o **Client Secret**.
8. Volte no **Supabase** -> **Providers** -> **Google**:
   - Ative a opção **Enable Google**.
   - Cole o **Client ID**.
   - Cole o **Client Secret**.
   - Clique em **Save**.

---

## ✅ Testando

Após salvar tudo no Supabase, volte ao seu site (`http://localhost:3000`), clique em entrar com Google ou Discord. Se abrir a janelinha pedindo permissão, **funcionou!**
