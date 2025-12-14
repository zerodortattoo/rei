import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';

// Usar fetch nativo (Node 18+)
const fetch = globalThis.fetch;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO MERCADO PAGO
const MERCADO_PAGO_ACCESS_TOKEN = "APP_USR-6466801855350553-121413-364f00d4384a73a4fd285398ae12f511-486395204";

const router = express.Router();

/* 
  Rota Principal: /orders
  Recebe dados do formulário frontend e processa via Mercado Pago.
  Nota: Como estamos usando Router mapeado em /api, a rota aqui é /orders
*/
router.post('/orders', async (req, res) => {
    try {
        const { email, total, items, paymentMethod, cardData, cpf } = req.body;

        // Constrói a descrição resumida
        const descriptionList = items.map(i => i.title).join(", ");
        const description = descriptionList.length > 200 ? descriptionList.substring(0, 197) + "..." : descriptionList;

        // Identificação do Pagador
        const payer = {
            email: email,
            entity_type: "individual",
            type: "customer",
            identification: {}
        };

        // Se tiver CPF (importante para PIX e Cartão no MP)
        const payerCpf = cardData?.cpf || cpf;
        if (payerCpf) {
            payer.identification = {
                type: "CPF",
                number: payerCpf.replace(/\D/g, '')
            };
            if (cardData?.cardName) {
                payer.first_name = cardData.cardName.split(" ")[0];
            }
        }

        // Payload para Mercado Pago
        let mpPayload = {
            transaction_amount: Number(total.toFixed(2)),
            description: `Pedido: ${description}`,
            payer: payer,
            external_reference: `ORDER-${Date.now()}` // ID interno
        };

        if (paymentMethod === 'pix') {
            mpPayload = {
                ...mpPayload,
                payment_method_id: "pix",
                date_of_expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 min exp
            };
        } else if (paymentMethod === 'card') {
            if (!cardData || !cardData.cardNumber) {
                return res.status(400).json({ error: "Dados do cartão incompletos." });
            }

            // 1. Criar Card Token (Server-side)
            const tokenPayload = {
                card_number: cardData.cardNumber.replace(/\s/g, ''),
                expiration_month: parseInt(cardData.expiryDate.split('/')[0]),
                expiration_year: parseInt('20' + cardData.expiryDate.split('/')[1]),
                security_code: cardData.cvv,
                cardholder: {
                    name: cardData.cardName,
                    identification: payer.identification
                }
            };

            console.log("Gerando Token de cartão...");
            const tokenRes = await fetch(`https://api.mercadopago.com/v1/card_tokens?public_key=APP_USR-e2e72b29-9c7d-452d-a27e-d599c16183c0`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tokenPayload)
            });

            if (!tokenRes.ok) {
                const err = await tokenRes.json();
                throw new Error(`Erro ao tokenizar cartão: ${err.message || JSON.stringify(err)}`);
            }

            const tokenData = await tokenRes.json();

            // Dedução da bandeira
            const cleanNum = cardData.cardNumber.replace(/\D/g, '');
            let paymentMethodId = "master";
            if (cleanNum.startsWith('4')) paymentMethodId = "visa";
            if (cleanNum.startsWith('3')) paymentMethodId = "amex";

            mpPayload = {
                ...mpPayload,
                token: tokenData.id,
                installments: 1,
                payment_method_id: paymentMethodId,
                payer: payer
            };
        }

        console.log(">> Payload MercadoPago:", JSON.stringify(mpPayload, null, 2));

        // Chamada à API de Pagamentos do Mercado Pago
        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
                'X-Idempotency-Key': `Idem-${Date.now()}-${Math.random()}`
            },
            body: JSON.stringify(mpPayload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Erro MP Response:", data);
            return res.status(response.status).json({ error: data.message || "Erro no gateway de pagamento." });
        }

        let frontendResponse = {
            id: data.id.toString(),
            status: data.status,
            expiresAt: data.date_of_expiration,
        };

        if (paymentMethod === 'pix' && data.point_of_interaction) {
            const transactionData = data.point_of_interaction.transaction_data;
            frontendResponse.qrCodeBase64 = `data:image/png;base64,${transactionData.qr_code_base64}`;
            frontendResponse.copyPaste = transactionData.qr_code;
        }

        res.status(201).json(frontendResponse);

    } catch (error) {
        console.error("Erro no Backend:", error.message);
        res.status(500).json({ error: error.message || "Erro interno no processamento do pedido" });
    }
});

// Endpoint de Consulta de Status
router.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ status: "pending" });
        }

        const data = await response.json();
        res.json({
            id: id,
            status: data.status
        });

    } catch (error) {
        console.error("Erro Check Status:", error);
        res.json({ id, status: "pending" });
    }
});

// Registrar Rotas
app.use('/api', router); // Prefixo /api para bater com o redirecionamento do Netlify

// Exportar Handler Serverless
export const handler = serverless(app);
