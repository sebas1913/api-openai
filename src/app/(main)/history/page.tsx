"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    return (
        <div className={styles.container}>
        <Title level={1}>Chats</Title>
        {isLoading ? (
            <Spinner />
        ) : (
            <ChatList chats={chats} onChatClick={openModal} />
        )}
        <Modal isOpen={!!selectedChat} onClose={closeModal}>
            {selectedChat && (
                <div>
                    <div className={styles.headerModal}>
                        <Image src={'/images/IA.png'} height={30} width={40} alt="Logo SIEK" />
                        <Title level={3}>{selectedChat.question}</Title>
                    </div>
                    <Message text={selectedChat.answer} isModal={true} />
                </div>
            )}
        </Modal>
    </div>
    );
}
