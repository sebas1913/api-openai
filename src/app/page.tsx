"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/chat");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <main>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}