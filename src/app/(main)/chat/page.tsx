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

    const handleSendMessage = async () => {
        if (!question.trim()) return;

        const newMessage = {
            role: 'user' as const,
            content: question
        };
        
        setMessages(prev => [...prev, newMessage]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response
            }]);
            setQuestion('');
        } catch (error) {
            console.error('Error:', error);
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
                />
            </div>
        </div>
    );


}