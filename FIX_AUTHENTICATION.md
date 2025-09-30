# 🔐 Corrigir Autenticação de Email (SPF/DKIM)

## 🚨 Problema

O Gmail está bloqueando os emails de resposta automática com o erro:
```
550-5.7.26 Your email has been blocked because the sender is unauthenticated.
DKIM = did not pass
SPF [magiccleandom.com] with ip: [23.83.218.249] = did not pass
```

**Causa:** O EmailJS está usando um serviço de relay (MailChannels) que não está autorizado no DNS do domínio `magiccleandom.com`.

---

## ✅ Solução 1: Reconfigurar EmailJS para usar OAuth2 do Gmail (RECOMENDADO)

Esta é a solução **mais simples e eficaz** porque usa o Gmail diretamente, não um relay.

### Passos:

1. **Acesse o EmailJS Dashboard:**
   - https://dashboard.emailjs.com/

2. **Vá em Email Services**

3. **Remova o serviço atual** (se estiver usando SMTP manual)

4. **Adicione novo serviço Gmail:**
   - Clique em "Add New Service"
   - Selecione **Gmail**
   - Clique em "Connect Account"

5. **Autentique com OAuth2:**
   - Faça login com a conta **info@magiccleandom.com**
   - Autorize o EmailJS a enviar emails

6. **Copie o novo Service ID** e atualize em `emailjs-config.js`:
   ```javascript
   SERVICE_ID: "service_xxxxx" // Novo ID gerado
   ```

7. **Teste novamente o formulário**

### Por que isso funciona?
- OAuth2 usa a autenticação do Google diretamente
- O Gmail reconhece o email como legítimo
- Não precisa configurar SPF/DKIM manualmente

---

## ✅ Solução 2: Configurar SPF e DKIM no DNS (Avançado)

Se você **precisa** usar o relay atual, configure autenticação no DNS:

### A. Configurar SPF Record

1. **Acesse o painel de DNS** do seu provedor (onde o domínio magiccleandom.com está registrado)

2. **Adicione um registro TXT** no DNS:
   ```
   Type: TXT
   Name: @  (ou magiccleandom.com)
   Value: v=spf1 include:_spf.google.com include:relay.mailchannels.net ~all
   ```

3. **Salve e aguarde** a propagação do DNS (pode levar até 48h)

### B. Configurar DKIM

1. **No Google Workspace Admin Console:**
   - https://admin.google.com/
   
2. **Vá em Apps → Google Workspace → Gmail → Authenticate email**

3. **Clique em "Generate new record"**

4. **Copie os valores DKIM** fornecidos

5. **No painel DNS**, adicione o registro DKIM:
   ```
   Type: TXT
   Name: google._domainkey.magiccleandom.com
   Value: [valor fornecido pelo Google]
   ```

6. **Salve e aguarde** a propagação

### C. Verificar Configuração

Use estas ferramentas para verificar:
- https://mxtoolbox.com/spf.aspx
- https://mxtoolbox.com/dkim.aspx

---

## ✅ Solução 3: Usar "From Email" Genérico (Temporário)

Se você precisa de uma solução **imediata** enquanto configura autenticação:

1. **No EmailJS Dashboard:**
   - Vá em Email Templates
   - Selecione o template de resposta automática

2. **Nas Settings:**
   - Mude **From Email** para: `noreply@emailjs.com` ou similar
   - ⚠️ Isso pode parecer menos profissional

3. **Teste novamente**

---

## 🎯 Qual Solução Escolher?

| Solução | Dificuldade | Tempo | Profissionalidade |
|---------|-------------|-------|-------------------|
| **1. OAuth2 Gmail** | ⭐ Fácil | 5-10 min | ⭐⭐⭐⭐⭐ Melhor |
| **2. SPF/DKIM** | ⭐⭐⭐ Difícil | 1-2 dias | ⭐⭐⭐⭐⭐ Melhor |
| **3. Email Genérico** | ⭐ Fácil | 2 min | ⭐⭐ Menos profissional |

**Recomendação: Use a Solução 1 (OAuth2)** - É rápida, fácil e profissional!

---

## 📋 Checklist - Solução OAuth2 (Recomendada)

```
□ Acessar EmailJS Dashboard
□ Ir em Email Services
□ Remover serviço atual (se necessário)
□ Adicionar novo serviço Gmail
□ Conectar com OAuth2 (login com info@magiccleandom.com)
□ Copiar novo Service ID
□ Atualizar SERVICE_ID em emailjs-config.js
□ Testar formulário
□ Verificar se email chega (sem bloqueio)
```

---

## 🧪 Como Testar

1. Após aplicar a solução, abra o site
2. Preencha o formulário com seu email
3. Envie a mensagem
4. Verifique:
   - ✅ Console mostra "✅ Resposta automática enviada com sucesso!"
   - ✅ Email chega na caixa de entrada (não SPAM)
   - ✅ Sem mensagens de bounce/rejeição

---

## 🆘 Troubleshooting

### O serviço OAuth2 não conecta
- Certifique-se de estar logado com **info@magiccleandom.com**
- Verifique se a conta tem permissões de envio no Google Workspace
- Tente em modo anônimo do navegador

### Ainda recebe erro de autenticação
- Aguarde alguns minutos após reconfigurar o serviço
- Limpe o cache do navegador
- Teste com um email diferente

### SPF/DKIM não funciona
- Verifique se os registros DNS foram propagados: https://dnschecker.org/
- Pode levar até 48h para propagar
- Use https://mxtoolbox.com/ para verificar

---

## 📞 Suporte

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **Google Email Authentication:** https://support.google.com/mail/answer/81126
- **SPF/DKIM Tools:** https://mxtoolbox.com/

---

## ✅ Status Atual

O código está **funcionando corretamente**. O problema é apenas de **autenticação de domínio**.

**Próximo passo:** Escolha uma das soluções acima e aplique.
