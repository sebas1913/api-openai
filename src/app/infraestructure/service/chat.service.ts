import { useState } from "react";
import { handleServiceError } from "./error.service";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export function useChatService() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async () => {
        if (!question.trim()) return;

        setIsLoading(true);
        setError(null);

        const userMessage: ChatMessage = {
            role: "user",
            content: question,
        };

        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });

            const data = await handleServiceError(response);

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.answer },
            ]);
            setQuestion(""); // Limpia el input después de enviar
        } catch (error: unknown) {
            setError((error as Error).message);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Lo siento, ocurrió un error al procesar tu mensaje.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        question,
        isLoading,
        error, // Devuelve el error para mostrarlo
        setQuestion,
        handleSendMessage,
    };
}
