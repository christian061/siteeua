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
    console.log("🚀 Iniciando envio de email...");
    console.log("📋 Dados recebidos:", data);
    console.log("🔧 Configuração EmailJS:", EMAILJS_CONFIG);
    
    try {
        // Verificar se EmailJS está inicializado
        if (typeof emailjs === 'undefined') {
            throw new Error("EmailJS não está carregado");
        }

        const adminParams = {
            name: data.name,           
            user_email: data.email,    
            phone: data.phone,         
            service: data.service,     
            message: data.message,     
            data: new Date().toLocaleString('pt-BR'),
            reply_to: data.email       
        };

        console.log("📤 Enviando email para empresa com params:", adminParams);
        
        // 1. Empresa recebe a mensagem
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            adminParams
        );
        console.log("✅ Email enviado para empresa com sucesso!");

        // TEMPORARIAMENTE DESABILITADO para testar
        console.log("⏸️ Resposta automática desabilitada temporariamente para teste");
        
        /*
        const customerParams = {
            name: data.name,        
            user_email: data.email, // {{user_email}} no template
            message: data.message   
        };

        console.log("📤 Enviando resposta automática com params:", customerParams);

        // 2. Cliente recebe resposta automática
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
            customerParams
        );
        console.log("✅ Resposta automática enviada com sucesso!");
        */

        return true;

    } catch (error) {
        console.error("❌ ERRO DETALHADO:");
        console.error("- Mensagem:", error.message);
        console.error("- Status:", error.status);
        console.error("- Text:", error.text);
        console.error("- Objeto completo:", error);
        return false;
    }
}

// A função sendContactForm será chamada pelo script.js
// Não precisa de event listener aqui para evitar conflitos

// Inicializar quando a página carregar
window.addEventListener("load", initEmailJS);
