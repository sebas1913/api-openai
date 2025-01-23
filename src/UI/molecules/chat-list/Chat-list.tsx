import Title from '@/UI/atoms/title/Title';
import styles from './chat-list.module.scss';
import { Icons } from '@/UI/atoms/icons/Icons';
import Paragraph from '@/UI/atoms/paragraph/Paragraph';

type Chat = {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
};

type ChatListProps = {
  chats: Chat[];
  onChatClick: (chat: Chat) => void;
  onDelete: (id: number) => void;
};

const ChatList: React.FC<ChatListProps> = ({ chats, onChatClick, onDelete }) => {
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
              <div className={styles.chatsContainer} key={chat.id}>
                <li className={styles.list} onClick={() => onChatClick(chat)}>
                  <Paragraph>{chat.question}</Paragraph>
                </li>
                <div className={styles.btnDeleteContainer} onClick={() => onDelete(chat.id)}>
                  <button className={styles.btnDelete}>
                    {Icons.delete}
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
