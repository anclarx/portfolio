import emailjs from "@emailjs/browser";
import EMAILJS_CONFIG from "../config/emailJsConfig";

interface SendContactMessage {
  name: string;
  email: string;
  message: string;
}

export const isEmailJsConfigured = () =>
  Boolean(
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID_CONTACT &&
    EMAILJS_CONFIG.PUBLIC_KEY,
  );

export async function sendContactMessage(data: SendContactMessage) {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS não configurado. Verifique o arquivo .env.local.");
  }

  try {
    return await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID!,
      EMAILJS_CONFIG.TEMPLATE_ID_CONTACT!,
      {
        name: data.name, // {{name}}
        email: data.email, // {{email}}
        message: data.message, // {{message}}
      },
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY! },
    );
  } catch (error) {
    console.error("Erro EmailJS:", error);
    throw new Error("Erro ao enviar a mensagem. Tente novamente.", {
      cause: error,
    });
  }
}
