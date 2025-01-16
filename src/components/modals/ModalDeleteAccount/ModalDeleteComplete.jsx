'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import usePreventScroll from '../../../hooks/usePreventScroll';
import styles from './ModalDeleteComplete.module.scss';

const ModalDeleteComplete = ({ open, handleClose, handleNext, handleSkip }) => {
  usePreventScroll(open);

  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const overlayRef = useRef(null);

  const handleModalClose = () => {
    setReason('');
    setError(null);
    handleClose();
  };

  if (!open) return null;

  const handleOverlayClick = (event) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      handleModalClose();
    }
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const sendFeedback = async () => {
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch('https://api.test.job.akatosphere.ru/send_feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: reason }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных. Попробуйте позже.');
      }

      const data = await response.json();
      console.log('Feedback sent successfully:', data);
    } catch (err) {
      console.error(err);
      setError('Ошибка при отправке данных. Попробуйте позже.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSendReason = async () => {
    await sendFeedback();
    handleModalClose();
    handleNext();
  };

  return (
    <div ref={overlayRef} className={styles.modal_overlay} onClick={handleOverlayClick}>
      <div className={styles.modal_info}>
        <h2 className={styles.modal_title}>Ваш аккаунт удалён</h2>
        <div className={styles.modal_content}>
          <p className={styles.modal_content_text}>
            Расскажите о причинах удаления аккаунта
          </p>

          <div className={styles.modal_input_group}>
            <textarea
              id="reason"
              value={reason}
              onChange={handleReasonChange}
              className={styles.modal_input}
              rows="4"
              placeholder="Введите причину (необязательно)"
              disabled={isSending}
            />
          </div>

          {error && <p className={styles.error_text}>{error}</p>}
        </div>

        <div className={styles.modal_actions}>
          <button
            className={`${styles.modal_dialog_button} ${styles.modal_back_btn}`}
            onClick={() => {
              handleSkip(); // Open goodbye modal
              handleModalClose(); // Close the current modal
            }}
            disabled={isSending}
          >
            <span className={styles.first_letter}>Пропустить</span>
          </button>
          <button
            onClick={handleSendReason}
            className={`${styles.modal_dialog_button} ${styles.modal_next_btn}`}
            disabled={isSending || !reason.trim()}
          >
            {isSending ? 'Отправка...' : <span className={styles.first_letter}>Отправить</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteComplete;
