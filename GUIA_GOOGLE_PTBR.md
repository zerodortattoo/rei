# Tutorial Google Cloud (Português Brasil) 🇧🇷

Siga estes passos exatos no painel do Google, com os nomes como aparecem em português.

## 1. Criar o Projeto

1. Acesse: [console.cloud.google.com](https://console.cloud.google.com/).
2. No topo esquerdo, ao lado da logo "Google Cloud", clique na setinha (seletor) para escolher um projeto.
3. Clique em **"Novo Projeto"** (canto superior direito da janelinha que abriu).
4. Dê o nome **"Rei das Contas"** e clique em **"Criar"**.
5. Aguarde uns segundos e **selecione** o projeto que você acabou de criar (geralmente aparece uma notificação no sino ou você clica no seletor de novo).

## 2. Configurar a Tela de Permissão

É aqui que você configura a tela de "Fazer login com Google".

1. No menu lateral esquerdo (clique nas 3 barrinhas se não estiver vendo), vá em **"APIs e serviços"** > **"Tela de permissão OAuth"**.
2. Em "User Type" (Tipo de usuário), escolha **"Externo"** e clique em **"Criar"**.
3. **Preencha apenas o que é obrigatório**:
   - **Nome do app**: `Rei das Contas`
   - **E-mail para suporte do usuário**: Selecione o seu e-mail.
   - **Dados de contato do desenvolvedor**: Digite seu e-mail novamente (lá no final da página).
4. Clique em **"Salvar e continuar"**.
5. Na tela ou aba **Escopos**, apenas role para baixo e clique em **"Salvar e continuar"** (não precisa marcar nada).
6. Na tela **Usuários de teste**, clique em **"Salvar e continuar"**.
7. No Resumo, clique em **"Voltar para o Painel"** (lá embaixo).

## 3. Pegar as Chaves (Credenciais)

1. Ainda no menu lateral esquerdo de "APIs e serviços", clique em **"Credenciais"**.
2. Clique no botão **"+ CRIAR CREDENCIAIS"** (no topo) e escolha **"ID do cliente OAuth"**.
3. **Tipo de aplicativo**: Escolha **"Aplicativo da Web"**.
4. **Nome**: Pode deixar "Cliente da Web 1" ou colocar "Login Site".
5. **Origens JavaScript autorizadas** (Isso é para o botão não dar erro):
   - Clique em **"ADICIONAR URI"**.
   - Digite: `http://localhost:3000`
6. **URIs de redirecionamento autorizados** (Isso é para o Google saber para onde devolver o usuário):
   - Clique em **"ADICIONAR URI"**.
   - Cole a URL que você pegou no Supabase, que se parece com: `https://<seu-codigo>.supabase.co/auth/v1/callback`
   *(Se não lembra onde pegar: Painel Supabase > Authentication > Providers > Google > Callback URL)*.
7. Clique em **"CRIAR"**.

## 4. Finalizando

Vai abrir uma janelinha com:

- **ID do cliente** (Seu Client ID)
- **Chave secreta do cliente** (Seu Client Secret)

Copie esses dois códigos e cole lá nas configurações do **Google** dentro do painel do **Supabase**.
