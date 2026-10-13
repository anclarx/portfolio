const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  TEMPLATE_ID_CONTACT: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT as
    | string
    | undefined,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
};

export default EMAILJS_CONFIG;
