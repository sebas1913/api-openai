import Title from '@/UI/atoms/title/Title';
import styles from './chat-list.module.scss';
import Paragraph from '@/UI/atoms/paragraph/Paragraph';

type Chat = {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
};

type ChatListProps = {
  chats: Chat[];
};

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  const groupedChats = chats.reduce((acc, chat) => {
    const date = new Date(chat.createdAt).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(chat);
    return acc;
  }, {} as Record<string, Chat[]>);

  return (
    <div className={styles.container}>
      {Object.entries(groupedChats).map(([date, chatsOnDate]) => (
        <div key={date} className={styles.card}>
          <Title level={3} className={styles.title}>{date}</Title>
          <ul>
            {chatsOnDate.map((chat) => (
              <li key={chat.id} className={styles.list}>
                <Paragraph>{chat.question}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
