# ⚡ Verificação Rápida - Resposta Automática

## 🎯 Problema
Cliente não recebe email de resposta automática após preencher o formulário.

## ✅ Solução em 3 Passos

### Passo 1️⃣: Verificar Configuração do Template no EmailJS

1. Acesse: https://dashboard.emailjs.com/
2. Vá em: **Email Templates**
3. Selecione o template: **template_48tdlu9** (Resposta Automática)
4. Clique no ícone ⚙️ **Settings**
5. Verifique:

```
┌─────────────────────────────────────────┐
│  Template Settings                      │
├─────────────────────────────────────────┤
│  To Email:    {{to_email}}     ← AQUI!  │
│  From Name:   Magic CleanDom            │
│  From Email:  info@magiccleandom.com    │
│  Reply To:    info@magiccleandom.com    │
└─────────────────────────────────────────┘
```

**⚠️ O campo "To Email" DEVE ser exatamente: `{{to_email}}`**

Se estiver diferente, corrija e salve!

### Passo 2️⃣: Verificar IDs no Código

Abra o arquivo `emailjs-config.js` e confirme:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",       // Sua chave pública
    SERVICE_ID: "service_a436nr6",          // ID do serviço Gmail
    TEMPLATE_ID: "template_h90o89q",        // Template empresa (recebe)
    CUSTOMER_TEMPLATE_ID: "template_48tdlu9" // Template cliente (resposta) ← AQUI!
};
```

**Certifique-se que `CUSTOMER_TEMPLATE_ID` tem o ID correto do template de resposta.**

### Passo 3️⃣: Testar o Formulário

1. Abra o site no navegador
2. Pressione **F12** para abrir o Console
3. Preencha o formulário com **seu email pessoal**
4. Clique em "Send Message"
5. No Console, procure:

```
✅ Logs de Sucesso:
📤 Tentando resposta automática com params: {...}
✅ Resposta automática enviada com sucesso!

❌ Logs de Erro:
⚠️ Erro na resposta automática (não crítico): [erro]
Detalhes do erro: [detalhes]
```

6. Verifique seu email (e pasta SPAM!)

---

## 🔍 Diagnóstico Rápido

| Sintoma | Causa Provável | Solução |
|---------|----------------|---------|
| Console mostra "✅ Resposta automática enviada" mas não chega | Email foi para SPAM | Verificar pasta de spam/lixo |
| Console mostra "⚠️ Erro na resposta automática" | Campo `to_email` não configurado | Seguir Passo 1️⃣ |
| Console mostra "Template not found" | Template ID incorreto | Seguir Passo 2️⃣ |
| Nenhum log aparece | Script não carregou | Verificar console por erros de carregamento |

---

## 📦 O que o Código Envia

Quando o cliente preenche o formulário, o código envia estes dados para o EmailJS:

```javascript
{
    name: "João Silva",           // → Usado em {{name}} no template
    to_email: "joao@email.com",   // → Destinatário (INTERNO do EmailJS)
    message: "Mensagem do cliente" // → Usado em {{message}} no template
}
```

O EmailJS recebe esses dados e:
1. Substitui `{{name}}` e `{{message}}` no template HTML
2. Envia o email para o endereço especificado em `to_email`
3. O cliente recebe o email formatado com o template HTML bonito da Magic CleanDom

---

## 🎯 Resultado Esperado

✅ **Empresa recebe:** Email com os dados do contato do cliente
✅ **Cliente recebe:** Email de confirmação automático com o template HTML da Magic CleanDom

---

## 🆘 Ainda não funciona?

Leia o guia completo: `TROUBLESHOOTING_EMAIL.md`
