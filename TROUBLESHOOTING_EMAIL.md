# 🔧 Troubleshooting - Resposta Automática de Email

## Problema: Cliente não recebe resposta automática

### ✅ Verificações Rápidas

1. **Abra o Console do Navegador (F12)**
   - Vá para a aba "Console"
   - Envie o formulário
   - Procure por:
     - ✅ "✅ Email enviado para empresa com sucesso!"
     - ✅ "✅ Resposta automática enviada com sucesso!"
     - ❌ "⚠️ Erro na resposta automática"

2. **Se aparecer erro de resposta automática, veja:**
   ```
   ⚠️ Erro na resposta automática (não crítico): [mensagem de erro]
   Detalhes do erro: [detalhes técnicos]
   ```

### 🎯 Soluções por Tipo de Erro

#### Erro 1: "The email field is required"
**Causa**: O template do EmailJS não está configurado para receber a variável `to_email`

**Solução**:
1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Vá em "Email Templates"
3. Selecione o template `template_48tdlu9` (resposta automática)
4. Clique em "Settings" (ícone de engrenagem)
5. Em **"To Email"**, coloque: `{{to_email}}`
6. Salve o template
7. Teste novamente

#### Erro 2: "Template not found"
**Causa**: O Template ID está incorreto

**Solução**:
1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Vá em "Email Templates"
3. Copie o **Template ID** do template de resposta automática
4. Abra `emailjs-config.js`
5. Atualize a linha:
   ```javascript
   CUSTOMER_TEMPLATE_ID: "template_48tdlu9" // Cole o ID correto aqui
   ```

#### Erro 3: "Service not found"
**Causa**: O Service ID está incorreto

**Solução**:
1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Vá em "Email Services"
3. Copie o **Service ID**
4. Abra `emailjs-config.js`
5. Atualize a linha:
   ```javascript
   SERVICE_ID: "service_a436nr6" // Cole o ID correto aqui
   ```

#### Erro 4: "550-5.7.26 Your email has been blocked because the sender is unauthenticated"
**Causa**: SPF/DKIM não configurados - Gmail bloqueia emails não autenticados

**Este é um erro CRÍTICO de autenticação!**

**Solução Rápida (RECOMENDADA):**
1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Vá em "Email Services"
3. Remova o serviço atual
4. Adicione novo serviço **Gmail**
5. Use **OAuth2** para conectar com `info@magiccleandom.com`
6. Copie o novo Service ID
7. Atualize `SERVICE_ID` em `emailjs-config.js`
8. Teste novamente

**Por que isso funciona?**
- OAuth2 usa autenticação do Google diretamente
- Não precisa configurar SPF/DKIM manualmente
- Gmail reconhece o email como legítimo

**📖 Leia o guia completo:** `FIX_AUTHENTICATION.md`

#### Erro 5: Email vai para SPAM
**Causa**: Configuração de SPF/DKIM ou conteúdo suspeito

**Solução**:
1. Peça ao cliente verificar a pasta de SPAM/Lixo Eletrônico
2. Se usar OAuth2, o problema de SPAM é minimizado
3. Configure SPF e DKIM no Google Workspace (veja `FIX_AUTHENTICATION.md`)

#### Erro 6: "Invalid public key"
**Causa**: A chave pública está incorreta

**Solução**:
1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Vá em "Account" > "General"
3. Copie a **Public Key**
4. Abra `emailjs-config.js`
5. Atualize:
   ```javascript
   PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr" // Cole a chave correta aqui
   ```

### 📋 Checklist de Configuração do Template de Resposta

No painel do EmailJS, verifique o template de resposta automática:

```
Template Settings:
├─ Template Name: "Resposta Automática - Cliente"
├─ Template ID: template_48tdlu9 (ou seu ID)
│
├─ Settings Tab:
│  ├─ To Email: {{to_email}} ← CRÍTICO!
│  ├─ From Name: Magic CleanDom
│  ├─ From Email: info@magiccleandom.com
│  └─ Reply To: info@magiccleandom.com
│
└─ Content Tab:
   ├─ Subject: "Thank you for contacting Magic CleanDom! 🧼✨"
   └─ Content: Use variáveis {{name}} e {{message}} (HTML personalizado)
```

**Variáveis que o código envia para o template:**
- `{{name}}` - Nome do cliente
- `{{message}}` - Mensagem enviada pelo cliente
- `{{to_email}}` - Email do cliente (usado internamente pelo EmailJS para envio)

### 🔍 Debug Avançado

Se ainda não funcionar, adicione logging extra:

1. Abra `emailjs-config.js`
2. Localize a seção de resposta automática (linha ~53)
3. Veja os logs no console:
   ```javascript
   console.log("📤 Tentando resposta automática com params:", customerParams);
   ```
4. Verifique se `customerParams.to_email` contém o email do cliente

### 🧪 Teste Manual no EmailJS

Para testar diretamente no painel do EmailJS:

1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Vá em "Email Templates"
3. Selecione o template de resposta automática
4. Clique em "Test It"
5. Preencha os campos de teste:
   ```
   to_email: seu-email@gmail.com
   name: João Silva
   message: Olá, gostaria de saber mais sobre seus serviços de limpeza.
   ```
6. Clique em "Send Test Email"
7. Verifique se recebeu o email no endereço informado em `to_email`

**⚠️ IMPORTANTE**: Se o teste falhar com erro tipo "to_email is required", verifique se:
- O campo "To Email" nas configurações do template está definido como `{{to_email}}`
- Você está preenchendo o campo `to_email` no teste

### 📞 Contato de Suporte

Se nenhuma solução funcionar:
- EmailJS Support: https://www.emailjs.com/docs/
- EmailJS Status: https://status.emailjs.com/

### 🎓 Links Úteis

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dynamic Variables](https://www.emailjs.com/docs/user-guide/dynamic-variables/)
- [Google Workspace Email Authentication](https://support.google.com/a/answer/81126)

---

## ✅ Resumo da Solução Aplicada

**O que foi corrigido:**

1. **Código `emailjs-config.js`**:
   - ✅ Adicionado campo `to_email: data.email` (destinatário da resposta automática)
   - ✅ Campo `name: data.name` alinhado com o template HTML
   - ✅ Campo `message: data.message` alinhado com o template HTML
   - ✅ Melhorado logging de erros

2. **Documentação `EMAIL_SETUP.md`**:
   - ✅ Template HTML completo do cliente documentado
   - ✅ Instruções detalhadas para configuração
   - ✅ Variáveis corretas: `{{name}}` e `{{message}}`

3. **Parâmetros enviados pelo código:**
```javascript
customerParams = {
    name: "Nome do Cliente",      // Usado em {{name}}
    to_email: "cliente@email.com", // Destinatário (configuração EmailJS)
    message: "Mensagem do cliente" // Usado em {{message}}
}
```

**Próximos passos:**

1. ⚠️ **CRÍTICO**: Verifique no EmailJS Dashboard:
   - Vá em Email Templates → Selecione template `template_48tdlu9`
   - Clique em Settings (⚙️)
   - Confirme que "To Email" = `{{to_email}}`
   
2. Teste o formulário com seu email pessoal
3. Abra o Console do navegador (F12) e verifique os logs
4. Verifique a caixa de entrada (e SPAM) do email do cliente
