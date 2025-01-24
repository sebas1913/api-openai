"use client";
import SearchBar from "@/UI/molecules/search-bar/Search-bar";
import Message from "@/UI/molecules/message-container/Message";
import styles from "./chat.module.scss";
import Image from "next/image";
import { useChatService } from "@/app/infraestructure/service/chat.service";

export default function ChatView() {
    const { messages, question, isLoading, error, setQuestion, handleSendMessage } = useChatService();

    return (
        <div>
            {messages.length === 0 ? (
                <div className={styles.containerTitles}>
                    <h2>¿Cómo puedo ayudarte con tu búsqueda?</h2>
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
                                message.role === "user" ? styles.userMessage : styles.assistantMessage
                            }`}
                        >
                            {message.role === "assistant" && (
                                <div className={styles.avatar}>
                                    <Image src="/images/IA.png" alt="Logo IA" width={48} height={40} />
                                </div>
                            )}
                            <Message text={message.content} />
                        </div>
                    ))}

                    {/* Mostrar el error como un mensaje de asistente */}
                    {error && (
                        <div className={`${styles.messageWrapper} ${styles.assistantMessage}`}>
                            <div className={styles.avatar}>
                                <Image src="/images/IA.png" alt="Logo IA" width={48} height={40} />
                            </div>
                            <Message text={error} />
                        </div>
                    )}
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