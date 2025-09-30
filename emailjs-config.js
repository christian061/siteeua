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
    
    // ID do template para RECEBER mensagens (info@magiccleandom.com)
    TEMPLATE_ID: "template_n2pm9bq", // Crie um novo template para receber dados
    
    // ID do template para RESPOSTA AUTOMÁTICA ao cliente
    CUSTOMER_TEMPLATE_ID: "template_tfm6nu8" // Seu template atual de confirmação
};

// Template de email sugerido para RECEBER mensagens (info@magiccleandom.com):
/*
CONFIGURAÇÕES DO TEMPLATE:
- To Email: info@magiccleandom.com
- From Name: Magic CleanDom Contact Form  
- From Email: info@magiccleandom.com
- Reply To: {{user_email}}

ASSUNTO:
🔔 Nova mensagem de contato - Magic CleanDom

CONTEÚDO HTML:
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px;">
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #2c3e50; margin: 0;">📬 Nova Mensagem de Contato</h2>
    <p style="color: #666; margin: 5px 0 0 0;">Recebida através do site Magic CleanDom</p>
  </div>

  <div style="background: white; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
    <h3 style="color: #2c3e50; margin-top: 0;">👤 Informações do Cliente:</h3>
    
    <p><strong>Nome:</strong> {{name}}</p>
    <p><strong>Email:</strong> <a href="mailto:{{user_email}}">{{user_email}}</a></p>
    <p><strong>Telefone:</strong> {{phone}}</p>
    <p><strong>Serviço:</strong> {{service}}</p>
    <p><strong>Data:</strong> {{date}}</p>

    <h3 style="color: #2c3e50;">💬 Mensagem:</h3>
    <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
      {{message}}
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea;">
      <p style="color: #666; font-size: 14px;">
        📧 Para responder diretamente ao cliente, clique no email acima ou responda este email.<br>
        🌐 Esta mensagem foi enviada através do formulário de contato do site.
      </p>
    </div>
  </div>
</div>
*/

// Template para RESPOSTA AUTOMÁTICA ao cliente (template_tfm6nu8):
/*
CONFIGURAÇÕES DO TEMPLATE:
- To Email: {{user_email}} (email do cliente)
- From Name: Magic CleanDom
- From Email: info@magiccleandom.com
- Reply To: info@magiccleandom.com

ASSUNTO:
Thank you for contacting Magic CleanDom! 

CONTEÚDO HTML:
(Use o template HTML que você já tem - está perfeito!)

<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px;">
  <a style="text-decoration: none; outline: none;" href="https://magiccleandom.com" target="_blank" rel="noopener">
    <img style="height: 32px; vertical-align: middle;" src="https://magiccleandom.com/assets/images/logo.png" alt="logotipo">
  </a>

  <p style="padding-top: 16px; border-top: 1px solid #eaeaea;">Hello {{name}},</p>

  <p>Hello! 👋</p>

  <p>
    Thank you for reaching out to <strong>Magic Cleandom</strong>.<br>
    We've received your message and one of our team members will get back to you shortly.
  </p>

  <p>
    Here's a copy of the message you sent us:
  </p>

  <blockquote style="border-left: 3px solid #eaeaea; margin: 16px 0; padding-left: 12px; color: #555;">
    {{message}}
  </blockquote>

  <p>
    If your inquiry is urgent, feel free to contact us directly via WhatsApp or phone:
  </p>

  <p>📞 <a title="Call us" href="tel:+13522226476">(352) 222-6476</a></p>

  <p>
    Meanwhile, feel free to explore our services on our website:<br>
    🌐 <a href="https://www.magiccleandom.com" target="_blank" rel="noopener">www.magiccleandom.com</a>
  </p>

  <p>
    Thank you for trusting us!<br>
    Best regards,<br>
    <strong>Magic Cleandom Team</strong>
  </p>
</div>
*/

// Função para inicializar EmailJS de forma segura
function initEmailJS() {
    if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
        try {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('✅ EmailJS inicializado com sucesso');
            return true;
        } catch (error) {
            console.error('❌ Erro ao inicializar EmailJS:', error);
            return false;
        }
    }
    return false;
}

// Auto-inicializar quando disponível
if (typeof window !== 'undefined') {
    window.addEventListener('load', initEmailJS);
}
