import React, { useState } from 'react';
import styles from './Security.module.scss';
import FormPassword from '@/components/UI/Form/FormPassword/FormPassword';
import Notification from '@/components/UI/Notification/Notification';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useCookie } from '@/hooks/useCookie';

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const accessToken = useCookie('access_token');

  const validateNewPassword = (password) => {
    const validationErrors = [];
    if (password.length < 8) {
      validationErrors.push('Пароль должен содержать минимум 8 символов.');
    }
    if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(password)) {
      validationErrors.push('Допустима только латиница.');
    }
    if (!/[0-9!@#$%^&*]/.test(password)) {
      validationErrors.push(
        'Пароль должен содержать хотя бы одну цифру или специальный символ.'
      );
    }
    return validationErrors;
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    setErrors([]);
  };


  const changePassword = async () => {
    if (!accessToken) {
      setErrors(['Не удалось найти токен для авторизации']);
      return;
    }


    const newPasswordErrors = validateNewPassword(newPassword);
    if (newPasswordErrors.length > 0) {
      setErrors(newPasswordErrors);
      return;
    }


    const changePasswordResponse = await fetch('https://api.test.job.akatosphere.ru/change-password/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        password: currentPassword,
        new_password: newPassword,
      }),
    });

    const data = await changePasswordResponse.json();
    console.log('API Response:', data); 

    if (!changePasswordResponse.ok) {
      setErrors([data.error || 'Ошибка при изменении пароля. Попробуйте позже.']);
      return;
    }


    if (changePasswordResponse.status === 200) {
      setShowNotification(true);
      setCurrentPassword('');
      setNewPassword('');
      setIsChangingPassword(false);
      setErrors([]);
    } else {
      setErrors(['Неверный текущий пароль']);
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    await changePassword();
    setIsSaving(false);
  };

  return (
    <div className={styles.container}>
      {showNotification && (
        <div className={styles.notification}>
          <Notification
            text="Пароль изменен"
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <div className={styles.inputContainer}>
          <FormPassword
            value={currentPassword}
            label={'Текущий пароль'}
            id="currentPassword"
            biggerErrorText={true}
            inputName="currentPassword"
            placeholder={isChangingPassword ? '' : '••••••••'}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.input}
            disabled={!isChangingPassword}
          />
          {!isChangingPassword && (
            <button
              className={styles.changePasswordButton}
              onClick={handleChangePasswordClick}
            >
              Изменить пароль
            </button>
          )}
        </div>

        {isChangingPassword && (
          <>
            <div className={styles.formGroup}>
              <FormPassword
                value={newPassword}
                label="Новый пароль"
                id="newPassword"
                inputName="newPassword"
                biggerErrorText={true}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            {errors.length > 0 && (
              <div className={styles.errorMessage}>
                {errors.map((error, index) => (
                  <ErrorMessage
                    key={index}
                    text={error}
                    noimg={false}
                    center={true}
                    biggerText={true}
                  />
                ))}
              </div>
            )}
            <div className={styles.boxBtn}>
              <button
                className={styles.saveButton}
                onClick={handleSaveClick}
                disabled={isSaving}
              >
                Сохранить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Security;