# Configuração do Email para Magic CleanDom

Este guia explica como configurar o envio de emails através do formulário de contato.

## 📧 Configuração do EmailJS

### Passo 1: Criar conta no EmailJS
1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Confirme seu email

### Passo 2: Configurar Serviço de Email (Google Workspace Business Starter)
1. No painel do EmailJS, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha **Gmail** (funciona com Google Workspace)
4. **IMPORTANTE**: Use as credenciais do email **info@magiccleandom.com**
5. Configure as seguintes opções:
   - **Email**: info@magiccleandom.com
   - **Nome**: Magic CleanDom
   - **Host SMTP**: smtp.gmail.com (padrão)
   - **Porta**: 587 (padrão)
6. **Autenticação OAuth2**: Siga o processo de autorização
7. Anote o **Service ID** gerado

### Passo 3: Criar Template de Email (RECEBER mensagens - Empresa)
1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Configure o template com o seguinte conteúdo:

**Nome do Template:** "Notificação de Contato - Empresa"

**Assunto:**
```
Nova mensagem de contato - Magic CleanDom
```

**Conteúdo do Email:**
```
Olá,

Você recebeu uma nova mensagem de contato através do site Magic CleanDom:

Nome: {{name}}
Email: {{user_email}}
Telefone: {{phone}}
Serviço: {{service}}

Mensagem:
{{message}}

Data: {{data}}

---
Esta mensagem foi enviada automaticamente através do formulário de contato do site.
Para responder, utilize o email: {{reply_to}}
```

4. **Configurações importantes do template:**
   - **To Email**: info@magiccleandom.com (email fixo da empresa)
   - **From Name**: Magic CleanDom Contact Form
   - **From Email**: info@magiccleandom.com
   - **Reply To**: {{reply_to}} (email do cliente)
5. Salve o template e anote o **Template ID** (ex: template_h90o89q)

### Passo 4: Criar Template de Resposta Automática (ENVIAR ao cliente)
1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Configure o segundo template com o seguinte conteúdo:

**Nome do Template:** "Resposta Automática - Cliente"

**Assunto:**
```
Thank you for contacting Magic CleanDom! 🧼✨
```

**Conteúdo do Email (HTML):**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px;">
  <a style="text-decoration: none; outline: none;" href="https://magiccleandom.com" target="_blank" rel="noopener">
    <img style="height: 40px; vertical-align: middle;" src="https://magiccleandom.com/assets/images/logo.png" alt="Magic CleanDom logo">
  </a>

  <p style="padding-top: 16px; border-top: 1px solid #eaeaea;">Hello {{name}},</p>

  <p>👋 Thank you for reaching out to <strong>Magic CleanDom</strong>!</p>

  <p>
    We've received your message and one of our team members will get back to you shortly.
  </p>

  <p>
    Here's a copy of the message you sent us:
  </p>

  <blockquote style="border-left: 3px solid #eaeaea; margin: 16px 0; padding-left: 12px; color: #555;">
    {{message}}
  </blockquote>

  <p>
    If your inquiry is urgent, feel free to contact us directly:
  </p>

  <p>📞 <a title="Call us" href="tel:+13522226476">(352) 222-6476</a></p>

  <p>
    Meanwhile, feel free to explore our services on our website:<br>
    🌐 <a href="https://www.magiccleandom.com" target="_blank" rel="noopener">www.magiccleandom.com</a>
  </p>

  <p style="margin-top: 20px;">
    Thank you for trusting us!<br>
    Best regards,<br>
    <strong>Magic CleanDom Team</strong>
  </p>
</div>
```

**Variáveis usadas no template:**
- `{{name}}` - Nome do cliente
- `{{message}}` - Mensagem enviada pelo cliente

4. **Configurações importantes do template de resposta automática:**
   - **To Email**: {{to_email}} (email do cliente - variável dinâmica) ← **CRÍTICO!**
   - **From Name**: Magic CleanDom
   - **From Email**: info@magiccleandom.com
   - **Reply To**: info@magiccleandom.com
5. Salve o template e anote o **Template ID** (ex: template_48tdlu9)

### Passo 5: Obter Chave Pública
1. Vá em **Account** > **API Keys**
2. Copie sua **Public Key**

### Passo 6: Configurar o Site
1. Abra o arquivo `emailjs-config.js`
2. Substitua os valores pelos seus dados reais:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",       // sua chave pública
    SERVICE_ID: "service_a436nr6",          // seu serviço (Gmail)
    TEMPLATE_ID: "template_h90o89q",        // template para RECEBER mensagens (empresa)
    CUSTOMER_TEMPLATE_ID: "template_48tdlu9" // template para RESPOSTA automática (cliente)
};
```

## 🧪 Testando

### Teste Completo do Sistema de Email Duplo

1. Abra o site no navegador
2. Vá até a seção "Get In Touch"
3. Preencha o formulário com **seu email pessoal** para testar
4. Clique em "Send Message"
5. Verifique:
   - ✅ **Email 1**: A empresa (info@magiccleandom.com) recebeu a mensagem?
   - ✅ **Email 2**: Você (cliente) recebeu a resposta automática no seu email?
6. Verifique o console do navegador (F12) para logs de debug

### Checklist de Configuração do Template de Resposta Automática

**⚠️ CRÍTICO**: Verifique no painel do EmailJS se o template de resposta automática está configurado corretamente:

#### No EmailJS Dashboard → Email Templates → Template de Resposta:

1. ✅ **Settings Tab** (clique no ícone ⚙️):
   - **To Email**: `{{to_email}}` ← **ESTE É O MAIS IMPORTANTE!**
   - **From Name**: `Magic CleanDom`
   - **From Email**: `info@magiccleandom.com`
   - **Reply To**: `info@magiccleandom.com`

2. ✅ **Content Tab** (HTML):
   - Deve conter as variáveis: `{{name}}` e `{{message}}`
   - Template HTML já está configurado com o design da Magic CleanDom

3. ✅ **Template ID**: 
   - Copie o ID e confirme que está correto em `emailjs-config.js`
   - Exemplo: `CUSTOMER_TEMPLATE_ID: "template_48tdlu9"`

**Se o cliente NÃO recebe a resposta automática, verifique:**
- ❌ O campo **"To Email"** do template não está como `{{to_email}}`
- ❌ O **Template ID** está incorreto no `emailjs-config.js`
- ❌ O **Service ID** está incorreto
- ❌ O email está indo para **SPAM/Lixo Eletrônico**
- ❌ O serviço Gmail não está **autorizado** no EmailJS

## 📝 Funcionalidades

- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Estado de carregamento no botão
- ✅ Mensagens de sucesso/erro
- ✅ Backup no Firebase (se configurado)
- ✅ Envio para info@magiccleandom.com

## 🏢 Configurações Específicas do Google Workspace

### Preparação do Email Corporativo
1. **Acesse o Admin Console** do Google Workspace
2. Vá em **Segurança** > **Controles de acesso e dados**
3. **Ative** "Acesso de aplicativos menos seguros" (se necessário)
4. Ou configure **OAuth2** (recomendado)

### Configurações de Segurança
1. **2FA**: Se ativado, você precisará de uma senha de aplicativo
2. **OAuth2**: Método mais seguro, use quando disponível
3. **Domínio personalizado**: Confirme que info@magiccleandom.com está ativo

### Teste de Conectividade
1. Teste enviando um email manual primeiro
2. Verifique se não há bloqueios de firewall
3. Confirme que o domínio está verificado no Google Workspace

## 🔧 Solução de Problemas

**Erro: "EmailJS configuration not found"**
- Verifique se o arquivo `emailjs-config.js` está configurado corretamente
- Certifique-se de que as chaves estão corretas

**Email não chega**
- Verifique se o serviço de email está ativo no EmailJS
- Confirme se o template está configurado corretamente
- Verifique a pasta de spam

**Erro de CORS**
- Adicione seu domínio nas configurações do EmailJS
- Para testes locais, adicione `localhost` ou `127.0.0.1`

**Problemas específicos do Google Workspace:**
- **Erro de autenticação**: Verifique se OAuth2 está configurado corretamente
- **Email bloqueado**: Confirme que o domínio está verificado no Google Workspace
- **Limite de envio**: Google Workspace tem limites diários de envio
- **Senha de aplicativo**: Se usar 2FA, gere uma senha específica para aplicativos

## 💰 Limites da Conta Gratuita

- 200 emails por mês
- Para mais emails, considere upgradar para um plano pago

## 🔒 Segurança

- As chaves do EmailJS são públicas e podem ser expostas
- Configure restrições de domínio no painel do EmailJS
- Monitore o uso para evitar spam
