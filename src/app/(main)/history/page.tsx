"use client";

import { useEffect, useState } from "react";
import Spinner from "@/UI/atoms/spinner/Spinner";
// import Message from "@/UI/molecules/message-container/Message";
// import SearchBar from "@/UI/molecules/search-bar/Search-bar";

interface Answer{
    id: string;
    answer: string;
    createdAt: string;
}


export default function History() {

    const [chats, setChats] = useState<Answer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/chat");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setChats(data);

            } catch (error) {
                console.error("Error fetching chats:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Historial</h1>
            <div>
                {loading ? (
                    <p><Spinner /></p>
                ) : (
                    <ul>
                        {chats.map((chat) => (
                            <li key={chat.id}>
                                <p>{chat.createdAt}</p>
                                <p>{chat.answer}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>

    )
}
