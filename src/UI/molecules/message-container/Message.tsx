import React from 'react';
import styles from './message.module.scss';
import Paragraph from '@/UI/atoms/paragraph/Paragraph';

interface MessageProps {
    text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
    return (
        <div className={styles.messageContainer}>
            <Paragraph>{text}</Paragraph>
        </div>
    );
};

export default Message;
