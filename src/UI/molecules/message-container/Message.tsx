import React from 'react';
import styles from './message.module.scss';
import Paragraph from '@/UI/atoms/paragraph/Paragraph';

interface MessageProps {
    text: string;
    isModal?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isModal }) => {
    return (
        <div className={`${styles.messageContainer} ${isModal ? styles.modal : ''}`}>
            <Paragraph>{text}</Paragraph>
        </div>
    );
};

export default Message;
