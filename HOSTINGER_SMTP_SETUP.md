# 📧 Configurar SMTP da Hostinger no EmailJS

## 🎯 Situação

O email `info@magiccleandom.com` é hospedado na **Hostinger**, não no Google Workspace.  
Por isso, não podemos usar OAuth2 - precisamos configurar SMTP manual.

---

## 📋 Informações SMTP da Hostinger

A Hostinger usa as seguintes configurações SMTP:

```
SMTP Host: smtp.hostinger.com
SMTP Port: 587 (TLS) ou 465 (SSL)
Security: TLS/STARTTLS (porta 587) ou SSL (porta 465)
Username: info@magiccleandom.com
Password: [senha do email]
```

---

## 🔧 Configurar no EmailJS

### Passo 1: Acessar EmailJS

1. Vá para: https://dashboard.emailjs.com/
2. Faça login

---

### Passo 2: Adicionar Serviço SMTP

1. Clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Selecione **"Custom SMTP Server"** ou **"Other"**

---

### Passo 3: Preencher Configurações

Configure com estes dados da Hostinger:

```
┌─────────────────────────────────────────────────┐
│ Service Name: Hostinger - Magic CleanDom       │
│                                                 │
│ SMTP Server: smtp.hostinger.com                │
│ Port: 587                                       │
│ Security: TLS/STARTTLS                         │
│                                                 │
│ Username: info@magiccleandom.com               │
│ Password: [sua senha do email]                 │
│                                                 │
│ From Email: info@magiccleandom.com             │
│ From Name: Magic CleanDom                      │
└─────────────────────────────────────────────────┘
```

**⚠️ Importante:**
- Use a **senha real** do email `info@magiccleandom.com`
- Se tiver autenticação de 2 fatores, você pode precisar criar uma senha de aplicativo

---

### Passo 4: Testar Conexão

1. No EmailJS, clique em **"Test Connection"** ou **"Verify"**
2. Se aparecer erro, tente:
   - Porta **465** com **SSL** ao invés de 587 com TLS
   - Verifique se a senha está correta
   - Verifique se o email está ativo na Hostinger

---

### Passo 5: Copiar Service ID

1. Após salvar, copie o **Service ID** gerado
2. Exemplo: `service_xyz123`

---

### Passo 6: Atualizar o Código

1. Abra `emailjs-config.js`
2. Atualize:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",
    SERVICE_ID: "service_xyz123",  // ← Novo Service ID aqui
    TEMPLATE_ID: "template_h90o89q",
    CUSTOMER_TEMPLATE_ID: "template_48tdlu9"
};
```

3. Salve o arquivo

---

### Passo 7: Configurar SPF no DNS (IMPORTANTE!)

Para evitar que emails caiam em SPAM, você **precisa** configurar SPF.

#### No Painel da Hostinger:

1. Acesse: https://hpanel.hostinger.com/
2. Vá em **"Emails"** → **"Email Accounts"**
3. Procure por **"DNS"** ou **"Domain Management"**
4. Adicione um registro TXT:

```
Type: TXT
Name: @ ou magiccleandom.com
Value: v=spf1 include:_spf.mx.cloudflare.net ~all
```

**Ou se a Hostinger usa outro SPF:**
```
Type: TXT
Name: @
Value: v=spf1 include:smtp.hostinger.com ~all
```

5. Salve e aguarde propagação (pode levar até 24h)

---

### Passo 8: Verificar SPF Atual

Antes de adicionar, verifique se já existe um registro SPF:

1. Acesse: https://mxtoolbox.com/spf.aspx
2. Digite: `magiccleandom.com`
3. Verifique o resultado

**Se já existir um SPF**, você precisa **modificar** (não criar novo):
```
v=spf1 include:existente.com include:smtp.hostinger.com ~all
```

---

## 🧪 Testar

1. Abra o site
2. Preencha o formulário com seu email
3. Envie
4. Verifique:
   - ✅ Console: "✅ Resposta automática enviada com sucesso!"
   - ✅ Seu email recebeu a resposta
   - ✅ Não foi para SPAM

---

## ⚠️ Problemas Comuns

### "Authentication failed"
- Senha incorreta
- Usuário incorreto (deve ser email completo)
- 2FA ativo (precisa senha de app)

### "Connection refused"
- Porta errada (tente 587 ou 465)
- Security type errado (tente TLS ou SSL)
- Firewall bloqueando

### Email vai para SPAM
- SPF não configurado (Passo 7)
- Aguardar propagação DNS (até 24h)
- Verificar reputação do domínio

### Limite de envio excedido
- Hostinger tem limite de emails por hora
- Verifique seu plano na Hostinger
- Considere upgrade se necessário

---

## 📊 Limites da Hostinger

| Plano | Emails/hora |
|-------|-------------|
| Single | 100/hora |
| Premium | 100/hora |
| Business | 150/hora |

Se estiver excedendo, considere:
- Upgrade de plano
- Usar serviço dedicado (SendGrid, Mailgun)
- Google Workspace (mais caro mas sem limites baixos)

---

## 🔒 Segurança

**⚠️ Cuidado:**
- Não compartilhe a senha SMTP
- Use senha forte
- Monitore uso de emails
- Configure SPF corretamente

---

## 🆘 Suporte Hostinger

- Documentação SMTP: https://support.hostinger.com/
- Email: support@hostinger.com
- Chat ao vivo no painel Hostinger

---

## ✅ Checklist

```
□ Obtive as credenciais SMTP da Hostinger
□ Acessei EmailJS Dashboard
□ Adicionei Custom SMTP Server
□ Configurei smtp.hostinger.com porta 587
□ Testei a conexão no EmailJS
□ Copiei o novo Service ID
□ Atualizei emailjs-config.js
□ Configurei registro SPF no DNS
□ Testei o formulário
□ Email chegou (não em SPAM)
```

---

## 🎯 Resultado Esperado

✅ Emails enviados via SMTP da Hostinger  
✅ SPF configurado corretamente  
✅ Emails não vão para SPAM  
✅ Cliente recebe resposta automática  

**Tempo de configuração:** 15-20 minutos + 24h para DNS propagar
