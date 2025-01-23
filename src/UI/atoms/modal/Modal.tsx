import styles from "./modal.module.scss";
import Button from "../button/Button";
import { Icons } from "../icons/Icons";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <Button variant="secondary" className={styles.closeButton} onClick={onClose}>
                    {Icons.close}
                </Button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
