# Resumo da Configuração (O que vai onde)

Para facilitar, aqui está o "mapa" exato de onde cada código deve estar.

## 1. No Painel da Google (Google Cloud)

* **Onde:** APIs e serviços > Credenciais > Seu ID do Cliente.
* **Origens JavaScript autorizadas:**
  * `http://localhost:3000`
  * `https://seu-projeto.vercel.app` (Quando fizer deploy)
* **URIs de redirecionamento autorizados (O MAIS IMPORTANTE):**
  * Tem que ser exatamente a URL do Supabase: `https://<ID-DO-PROJETO>.supabase.co/auth/v1/callback`

## 2. No Painel do Supabase (Authentication -> Providers)

Você deve clicar em **Google** e preencher:

* **Client ID:** (Copiado do Google Cloud)
* **Client Secret:** (Copiado do Google Cloud)
* **Callback URL:** (Essa é a URL que você COPIA daqui e COLA lá no Google, no campo de "URIs de redirecionamento").

---

## 3. No Painel do Discord (Developer Portal)

* **Onde:** OAuth2 > General.
* **Redirects:**
  * `http://localhost:3000`
  * `https://<ID-DO-PROJETO>.supabase.co/auth/v1/callback` (A mesma URL do Supabase)

## 4. No Painel do Supabase (Authentication -> Providers)

Você deve clicar em **Discord** e preencher:

* **Client ID:** (Copiado do Discord)
* **Client Secret:** (Copiado do Discord)

---

### ⚠️ Resumo em uma frase

O **Supabase** precisa das *senhas (Chaves)* do Google/Discord.
O **Google/Discord** precisam saber o *endereço (Callback URL)* do Supabase para onde mandar o usuário de volta.
