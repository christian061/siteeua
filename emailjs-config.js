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
                name: data.name,
                user_email: data.email,
                phone: data.phone,
                service: data.service,
                message: data.message,
                date: new Date().toLocaleString()
            }
        );
        console.log("📩 Email enviado para empresa");

        // 2. Cliente recebe resposta automática
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
            {
                name: data.name,
                user_email: data.email,
                message: data.message
            }
        );
        console.log("📨 Resposta automática enviada para o cliente");

        return true;

    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
        return false;
    }
}

// Exemplo de uso (simulando envio do formulário)
document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
    };

    const success = await sendContactForm(formData);

    if (success) {
        alert("✅ Sua mensagem foi enviada com sucesso!");
    } else {
        alert("❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
    }
});

// Inicializar quando a página carregar
window.addEventListener("load", initEmailJS);
