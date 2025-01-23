"use client";

import { useEffect, useState } from "react";
import styles from './history.module.scss';
import Spinner from "@/UI/atoms/spinner/Spinner";
import ChatList from "@/UI/molecules/chat-list/Chat-list";
import Title from "@/UI/atoms/title/Title";
import Modal from "@/UI/atoms/modal/Modal";
import Message from "@/UI/molecules/message-container/Message";

interface Chat {
    id: number;
    question: string;
    answer: string;
    createdAt: string;
}

export default function History() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch("/api/chat");
            const data = await response.json();
            setChats(data);
            setIsLoading(false);
        };

        fetchChats();
    }, []);
    const openModal = (chat: Chat) => {
        setSelectedChat(chat);
    };

    const closeModal = () => {
        setSelectedChat(null);
    };

    const handleDeleteChat = async (id: number) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este chat?");
        if (!confirmDelete) {
            return; 
        }
        try {
            const response = await fetch(`/api/chat/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete chat");
            }

            setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
            alert('Chat Eliminado')
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Title level={1}>Chats</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <ChatList chats={chats} onChatClick={openModal} onDelete={handleDeleteChat} />
            )}
            <Modal isOpen={!!selectedChat} onClose={closeModal}>
                {selectedChat && (
                    <div>
                        <Message text={`Pregunta: ${selectedChat.question}`} />
                        <Message text={`Respuesta: ${selectedChat.answer}`} />
                    </div>
                )}
            </Modal>
        </div>
    );
}
