"use client";

import { useEffect, useState } from "react";
import styles from './history.module.scss';
import Spinner from "@/UI/atoms/spinner/Spinner";
import ChatList from "@/UI/molecules/chat-list/Chat-list";
import Title from "@/UI/atoms/title/Title";

interface Chat {
    id: number;
    question: string;
    answer: string;
    createdAt: string;
}

export default function History() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch("/api/chat");
            const data = await response.json();
            setChats(data);
            setIsLoading(false);
        };

        fetchChats();
    }, []);

    return (
        <div className={styles.container}>
            <Title level={1}>Chats</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <ChatList chats={chats} />
            )}
        </div>
    );
}
