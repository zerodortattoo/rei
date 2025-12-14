
# Guia do Programa de Afiliados - Rei das Contas

## Como funciona o pagamento dos afiliados?

No momento, o sistema funciona no modelo **manual**. Isso significa que você, como administrador, recebe o valor total da venda e posteriormente repassa a comissão (ex: 20%) para o afiliado.

### Passo 1: Identificar vendas de afiliados

1. Acesse o seu painel do **Mercado Pago**.
2. Vá para a seção de **Atividades** ou **Transações**.
3. Ao clicar em uma transação aprovada, procure pelos detalhes ou metadados da venda.
4. O sistema foi configurado para enviar um campo chamado `affiliate_id` (ou "Código do Afiliado") nos detalhes da venda.
   - O valor desse campo será o nome/nick que o afiliado criou no site (ex: `joao-gamer`).

### Passo 2: Calcular a comissão

Se você definiu 20% de comissão:

- **Venda:** R$ 100,00
- **Comissão:** R$ 20,00
- **Seu lucro:** R$ 80,00 (menos taxas do MP)

### Passo 3: Pagar o afiliado

1. Combine com seus afiliados uma data de fechamento (ex: todo dia 5 do mês, ou toda sexta-feira).
2. Peça que eles entrem em contato via WhatsApp (o site instrui "Entre em contato via WhatsApp para receber").
3. Some todas as vendas com a tag daquele afiliado no período.
4. Faça um **Pix** para a chave do afiliado no valor da comissão total.

---

## Dúvidas Comuns

**20% é uma taxa justa?**

- Para **produtos digitais** (contas de jogos, softwares, infoprodutos), comissões entre **20% e 40%** são muito comuns e atraentes, pois o custo de "estoque" geralmente é baixo e a margem de lucro é alta.
- Para **produtos físicos**, geralmente é menos (5% a 10%).
- Uma taxa de 20% é excelente para atrair gamers e influenciadores para divulgarem sua loja de graça em troca de ganhos.

**Posso automatizar?**

- É possível automatizar usando a API "Marketplace Split" do Mercado Pago, mas isso exige que o afiliado crie uma conta e conecte ao seu aplicativo. Dada a complexidade, o método manual (Pix) é muito mais simples para começar.
