"use client";
import Title from "@/UI/atoms/title/Title";
import SearchBar from "@/UI/molecules/search-bar/Search-bar";
import styles from './chat.module.scss'
import Image from "next/image";
import { useState } from "react";
import Message from "@/UI/molecules/message-container/Message";

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!question.trim()) return;

        setIsLoading(true);
        const userMessage = {
            role: 'user' as const,
            content: question
        };
        
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }), 
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.answer
            }]);
            setQuestion('');
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Lo siento, hubo un error al procesar tu mensaje.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {messages.length === 0 ? (
                <div className={styles.containerTitles}>
                    <Title level={2}>¿Cómo puedo ayudarte con tu búsqueda?</Title>
                    <div className={styles.logo}>
                        <Image src="/images/IA.png" alt="" width={70} height={50} />
                    </div>
                </div>
            ) : (
                <div className={styles.messagesContainer}>
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`${styles.messageWrapper} ${
                                message.role === 'user' ? styles.userMessage : styles.assistantMessage
                            }`}
                        >
                            <Message text={message.content} />
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.searchBarWrapper}>
                <SearchBar
                    placeholder="Escribe tu mensaje aquí..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onSend={handleSendMessage}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
}