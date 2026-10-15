import React, { useState } from "react";
import Text from "./text";
import Input from "./input";
import Button from "./button";
import { sendContactMessage } from "../services/sendMessageService";
import { useLanguage } from "../context/languageContext";

export default function Form() {
  const { translations } = useLanguage();
  const t = translations.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function validateEmail(emailStr: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  }

  function clearMessages() {
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();

    if (!name.trim()) {
      setErrorMessage(t.errors.requiredName);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage(t.errors.invalidEmail);
      return;
    }

    if (!message.trim()) {
      setErrorMessage(t.errors.emptyMessage);
      return;
    }

    const formData = { name, email, message };

    try {
      setIsLoading(true);
      await sendContactMessage(formData);

      setSuccessMessage(t.success);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t.errors.genericError,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex flex-col w-full max-w-xl p-8 bg-white shadow-xl rounded-sm border border-black"
    >
      <div className="flex flex-col gap-2 mb-6">
        <Input
          label={t.nameLabel}
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearMessages();
          }}
          placeholder={t.namePlaceholder}
        />
        <Input
          label={t.emailLabel}
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearMessages();
          }}
          placeholder={t.emailPlaceholder}
        />
      </div>

      <div className="mb-6">
        <Input
          name="message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            clearMessages();
          }}
          placeholder={t.messagePlaceholder}
          rows={10}
        />
      </div>

      <div className="flex items-center justify-between gap-4 min-h-10">
        <div className="flex-1" role="status" aria-live="polite">
          {errorMessage && (
            <Text variant="body-normal" className="block text-red-600">
              {errorMessage}
            </Text>
          )}
          {successMessage && (
            <Text variant="body-normal" className="block text-green-700">
              {successMessage}
            </Text>
          )}
        </div>

        <Button variant="outline" disabled={isLoading}>
          <Text variant="body-normal-uppercase">
            {isLoading ? t.submittingButton : t.submitButton}
          </Text>
        </Button>
      </div>
    </form>
  );
}
