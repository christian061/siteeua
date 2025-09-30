// EmailJS Configuration para Google Workspace Business Starter
// Para configurar o EmailJS com email corporativo:
// 1. Crie uma conta em https://www.emailjs.com/
// 2. Crie um serviço de email escolhendo "Gmail" (funciona com Google Workspace)
// 3. Use as credenciais do email info@magiccleandom.com
// 4. Configure OAuth2 ou senha de aplicativo se usar 2FA
// 5. Crie um template de email
// 6. Substitua as chaves abaixo pelas suas chaves reais

const EMAILJS_CONFIG = {
    // Sua chave pública do EmailJS (encontrada em Account > API Keys)
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",
    
    // ID do seu serviço de email (encontrado em Email Services)
    SERVICE_ID: "service_a436nr6",
    
    // ID do seu template de email (encontrado em Email Templates)
    TEMPLATE_ID: "template_tfm6nu8"
};

// Template de email sugerido para o EmailJS (Google Workspace):
/*
CONFIGURAÇÕES DO TEMPLATE:
- To Email: info@magiccleandom.com (ou use {{to_email}})
- From Name: Magic CleanDom Contact Form
- From Email: info@magiccleandom.com
- Reply To: {{reply_to}}

ASSUNTO:
Nova mensagem de contato - Magic CleanDom

CONTEÚDO:
Olá equipe Magic CleanDom,

Você recebeu uma nova mensagem de contato através do site:

👤 Nome: {{from_name}}
📧 Email: {{from_email}}
📱 Telefone: {{phone}}
🛠️ Serviço: {{service}}

💬 Mensagem:
{{message}}

---
📅 Data: {{date}}
🌐 Site: Magic CleanDom
📧 Para responder diretamente ao cliente: {{reply_to}}

Esta mensagem foi enviada automaticamente através do formulário de contato.
*/

// Inicializar EmailJS quando o arquivo for carregado
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}
