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

### Passo 3: Criar Template de Email
1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Configure o template com o seguinte conteúdo:

**Assunto:**
```
Nova mensagem de contato - Magic CleanDom
```

**Conteúdo do Email:**
```
Olá,

Você recebeu uma nova mensagem de contato através do site Magic CleanDom:

Nome: {{from_name}}
Email: {{from_email}}
Telefone: {{phone}}
Serviço: {{service}}

Mensagem:
{{message}}

---
Esta mensagem foi enviada automaticamente através do formulário de contato do site.
Para responder, utilize o email: {{reply_to}}
```

4. **Configurações importantes do template:**
   - **To Email**: {{to_email}} (será preenchido automaticamente)
   - **From Name**: Magic CleanDom Contact Form
   - **From Email**: info@magiccleandom.com
   - **Reply To**: {{reply_to}} (email do cliente)
5. Salve o template e anote o **Template ID**

### Passo 4: Obter Chave Pública
1. Vá em **Account** > **API Keys**
2. Copie sua **Public Key**

### Passo 5: Configurar o Site
1. Abra o arquivo `emailjs-config.js`
2. Substitua os valores pelos seus dados reais:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",
    SERVICE_ID: "service_a436nr6", 
    TEMPLATE_ID: "template_tfm6nu8"
};
```

## 🧪 Testando

1. Abra o site no navegador
2. Vá até a seção "Get In Touch"
3. Preencha o formulário
4. Clique em "Send Message"
5. Verifique se o email chegou em info@magiccleandom.com

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
