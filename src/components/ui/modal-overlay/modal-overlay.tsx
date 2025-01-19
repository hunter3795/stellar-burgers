import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div id='overlay' className={styles.overlay} onClick={onClick} />
);
