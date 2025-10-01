# 📧 Configuração de Email - Magic CleanDom

## ✅ Status Atual

- **Email**: info@magiccleandom.com (Hostinger)
- **Serviço**: SMTP Hostinger via EmailJS
- **Service ID**: service_a436nr6
- **Template Empresa**: template_h90o89q
- **Template Cliente**: template_48tdlu9
- **SPF**: Configurado ✅

---

## 🎯 Configuração Completa

### EmailJS SMTP
```
Host: smtp.hostinger.com
Port: 587
Security: TLS/STARTTLS
Username: info@magiccleandom.com
Password: [configurado no EmailJS]
```

### Código (`emailjs-config.js`)
```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "w9UgEZ3aGXFWo2lNr",
    SERVICE_ID: "service_a436nr6",
    TEMPLATE_ID: "template_h90o89q",
    CUSTOMER_TEMPLATE_ID: "template_48tdlu9"
};
```

---

## 🧪 Testando

1. Abra o site
2. F12 → Console
3. Preencha o formulário
4. Envie
5. Verifique logs:
   - ✅ "Email enviado para empresa com sucesso!"
   - ✅ "Resposta automática enviada com sucesso!"

---

## 🔧 Solução de Problemas

### Cliente não recebe resposta automática?

1. **Verifique Console do navegador** (F12)
   - Procure por erros em vermelho
   - Copie mensagens de erro

2. **Verifique Template no EmailJS**
   - Dashboard → Email Templates → template_48tdlu9
   - Settings → To Email = `{{to_email}}`

3. **Verifique SPAM**
   - Peça cliente verificar pasta de spam/lixo

4. **Aguarde DNS propagar** (até 24h após configurar SPF)

---

## 📖 Documentação Detalhada

Se precisar de mais informações, consulte:

- **`HOSTINGER_SMTP_SETUP.md`** - Setup completo passo a passo
- **`TROUBLESHOOTING_EMAIL.md`** - Guia de solução de problemas

---

## 📞 Suporte

- **EmailJS**: https://www.emailjs.com/docs/
- **Hostinger**: https://support.hostinger.com/
- **DNS/SPF**: https://mxtoolbox.com/

---

## ⚠️ Próximo Passo IMPORTANTE

**Teste o formulário e me envie os logs do Console** para eu identificar porque a resposta automática não está sendo enviada.

O código está correto, então o problema pode ser:
- Configuração do template no EmailJS
- Propagação do SPF ainda em andamento
- Limitações do SMTP da Hostinger
