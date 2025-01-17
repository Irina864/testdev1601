'use client';
import Link from 'next/link';
import usePreventScroll from '../../hooks/usePreventScroll';
import styles from './Modals.module.scss';

const ModalCompanyInfo = ({ open, handleNext }) => {
  usePreventScroll(open);

  if (!open) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_company_info}>
        <h2 className={styles.modal_title}>Информация о компании</h2>
        <div className={styles.modal_content}>
          <p className={styles.modal_content_text}>
            Заполните информацию о компании перед созданием вакансии
          </p>
        </div>
        <div className={styles.modal_actions}>
          <Link href="/" passHref className={`${styles.link}`}>
            <button
              className={`${styles.modal_dialog_button} ${styles.modal_back_btn}`}
            >
              <span className={styles.first_letter}>Н</span>а главную
            </button>
          </Link>
          <button
            onClick={handleNext}
            className={`${styles.modal_dialog_button} ${styles.modal_next_btn}`}
          >
            <span className={styles.first_letter}>З</span>аполнить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCompanyInfo;
