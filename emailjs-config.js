// Configuração do EmailJS
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",       // sua chave pública
    SERVICE_ID: "service_a436nr6",          // seu serviço SMTP (Hostinger)
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

        // Resposta automática para o cliente
        try {
            const customerParams = {
                name: data.name,           // {{name}} no template HTML
                to_email: data.email,      // Email do cliente (destinatário) - usado pelo EmailJS para enviar
                message: data.message      // {{message}} no template HTML
            };

            console.log("📤 Tentando resposta automática com params:", customerParams);
            console.log("🔧 Usando SERVICE_ID:", EMAILJS_CONFIG.SERVICE_ID);
            console.log("🔧 Usando CUSTOMER_TEMPLATE_ID:", EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID);

            // 2. Cliente recebe resposta automática
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
                customerParams
            );
            console.log("✅ Resposta automática enviada com sucesso!");
            console.log("📧 Response:", response);
        } catch (autoReplyError) {
            console.error("⚠️ ERRO na resposta automática:");
            console.error("- Tipo:", autoReplyError.name);
            console.error("- Mensagem:", autoReplyError.message);
            console.error("- Status:", autoReplyError.status);
            console.error("- Text:", autoReplyError.text);
            console.error("- Objeto completo:", autoReplyError);
            console.log("✅ Email principal foi enviado com sucesso mesmo assim!");
        }

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
