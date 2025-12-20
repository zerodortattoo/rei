-- CRIAÇÃO DA TABELA DE PERFIS (PROFILES)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'user',
  affiliate_code text unique,
  pix_key text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CRIAÇÃO DA TABELA DE PEDIDOS (ORDERS)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users, -- Pode ser null se for compra sem login
  items jsonb,
  total numeric,
  status text default 'pending',
  payment_method text,
  payment_data jsonb,
  payment_id text,
  affiliate_code text, -- Quem indicou
  commission_amount numeric, -- Quanto o afiliado ganhou
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Configurar Row Level Security (Segurança)
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

-- POLÍTICAS DE ACESSO (Quem pode ver o que)

-- PROFILES:
-- Qualquer um pode ler perfis (necessário para checar código de afiliado)
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- Usuário pode inserir seu próprio perfil (Cadastro)
create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Usuário pode atualizar seu próprio perfil
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- ORDERS:
-- Usuário pode ver seus próprios pedidos
create policy "Users can view own orders"
  on orders for select
  using ( auth.uid() = user_id );

-- Qualquer um pode criar pedidos (Compra sem login ou com login)
create policy "Anyone can create orders"
  on orders for insert
  with check ( true );
