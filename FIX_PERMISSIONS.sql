-- 1. PRIMEIRO: Limpar políticas antigas (para não dar erro de duplicado)
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can view own orders" on orders;
drop policy if exists "Anyone can create orders" on orders;

-- 2. SEGUNDO: Criar as políticas corretas

-- PROFILES:
-- Qualquer um pode ler perfis
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- Usuário logado pode criar seu próprio perfil (ESSENCIAL PARA CADASTRO)
create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Usuário pode atualizar seu perfil (ex: Chave Pix)
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- ORDERS:
-- Ver apenas seus próprios pedidos
create policy "Users can view own orders"
  on orders for select
  using ( auth.uid() = user_id );

-- Qualquer um pode criar pedidos (Com ou sem login)
create policy "Anyone can create orders"
  on orders for insert
  with check ( true );

-- Garantir que RLS está ativado
alter table profiles enable row level security;
alter table orders enable row level security;
