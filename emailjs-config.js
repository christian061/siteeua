// Configuração do EmailJS
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",       // sua chave pública
    SERVICE_ID: "service_a436nr6",          // seu serviço (Gmail)
    TEMPLATE_ID: "template_h90o89q",        // template para RECEBER mensagens (empresa)
    CUSTOMER_TEMPLATE_ID: "template_48tdlu9" // template para RESPOSTA automática (cliente)
};

// Inicializar EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log("✅ EmailJS inicializado");
    } else {
        console.error("❌ EmailJS não encontrado");
    }
}

// Função para enviar mensagem
async function sendContactForm(data) {
    try {
        // 1. Empresa recebe a mensagem
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            {
              name: data.name,           // {{name}} no template
              user_email: data.email,    // {{user_email}} no template  
              phone: data.phone,         // {{phone}} no template
              service: data.service,     // {{service}} no template
              message: data.message,     // {{message}} no template
              data: new Date().toLocaleString('pt-BR'), // {{data}} no template
              reply_to: data.email       // Para responder
            }
        );
        console.log("📩 Email enviado para empresa");

        // 2. Cliente recebe resposta automática
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
            {
              name: data.name,        // {{name}} no template
              to_email: data.email,   // Para onde enviar
              message: data.message   // {{message}} no template
            }
          );
        console.log("📨 Resposta automática enviada para o cliente");

        return true;

    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
        return false;
    }
}

// A função sendContactForm será chamada pelo script.js
// Não precisa de event listener aqui para evitar conflitos

// Inicializar quando a página carregar
window.addEventListener("load", initEmailJS);
