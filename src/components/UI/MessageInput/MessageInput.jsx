// // import { useRef, useState } from "react";
// // import styles from "./MessageInput.module.scss";

// // const MessageInput = ({ onSend }) => {
// //   const [message, setMessage] = useState("");
// //   const [file, setFile] = useState(null);
// //   const [fileName, setFileName] = useState("");
// //   const fileInputRef = useRef(null);
// //   const textareaRef = useRef(null);

// //   const handleFileChange = (e) => {
// //     const selectedFile = e.target.files[0];
// //     if (selectedFile) {
// //       setFile(selectedFile);
// //       setFileName(selectedFile.name);
// //     }
// //   };

// //   // const handleSend = () => {
// //   //   if (message.trim() || file) {
// //   //     const formData = new FormData();
// //   //     formData.append("message", message);
// //   //     if (file) {
// //   //       const fileURL = URL.createObjectURL(file);

// //   //       const fileWithURL = new File([file], file.name, { type: file.type });
// //   //       fileWithURL.url = fileURL;
// //   //       formData.append("file", fileWithURL);
// //   //     }
// //   //     onSend(formData);
// //   //     setMessage("");
// //   //     setFile(null);
// //   //     setFileName("");
// //   //     if (fileInputRef.current) {
// //   //       fileInputRef.current.value = "";
// //   //     }
// //   //     if (textareaRef.current) {
// //   //       textareaRef.current.style.height = "auto";
// //   //     }
// //   //   }
// //   // };
// //   const handleSend = () => {
// //     if (message.trim() || file) {
// //       const formData = new FormData();
// //       formData.append("message", message.trim());
// //       if (file) {
// //         formData.append("file", file);
// //       }
// //       onSend(formData);
// //       setMessage("");
// //       setFile(null);
// //       setFileName("");
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = "";
// //       }
// //       if (textareaRef.current) {
// //         textareaRef.current.style.height = "auto";
// //       }
// //     }
// //   };

// //   const handleTextareaChange = (e) => {
// //     setMessage(e.target.value);
// //     e.target.style.height = "auto";
// //     e.target.style.height = `${e.target.scrollHeight}px`;
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       handleSend();
// //     }
// //   };

// //   return (
// //     <div className={styles.containerForInput}>
// //       <div className={styles.inputWrapper}>
// //         <button
// //           onClick={() => fileInputRef.current?.click()}
// //           className={styles.attachButton}
// //         >
// //           <img
// //             src="/images/chats/attach.svg"
// //             alt="Прикрепить файл"
// //             className={styles.icon}
// //           />
// //         </button>

// //         <textarea
// //           ref={textareaRef}
// //           value={
// //             fileName ? `${message} (Прикреплен файл: ${fileName})` : message
// //           } // Отображаем имя файла
// //           onChange={handleTextareaChange}
// //           onKeyPress={handleKeyPress}
// //           placeholder="Введите сообщение"
// //           className={styles.textInput}
// //           rows={1}
// //         />

// //         <button onClick={handleSend} className={styles.sendButton}>
// //           <img
// //             src="/images/chats/sendMessage.svg"
// //             alt="Отправить"
// //             className={styles.icon}
// //           />
// //         </button>
// //       </div>

// //       <input
// //         type="file"
// //         ref={fileInputRef}
// //         onChange={handleFileChange}
// //         className={styles.fileInput}
// //         hidden
// //       />
// //     </div>
// //   );
// // };

// // export default MessageInput;

import { useRef, useState } from "react";
import styles from "./MessageInput.module.scss";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        setError("Размер файла не должен превышать 20MB");
        return;
      }

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Разрешены только файлы форматов PDF, JPG, DOC или DOCX");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (message.trim() || file) {
      const formData = new FormData();
      formData.append("message", message.trim());
      if (file) {
        formData.append("file", file);
      }
      onSend(formData);
      setMessage("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.containerForInput}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.inputWrapper}>
        <button
          onClick={() => fileInputRef.current?.click()}
          className={styles.attachButton}
        >
          <img
            src="/images/chats/attach.svg"
            alt="Прикрепить файл"
            className={styles.icon}
          />
        </button>

        <div className={styles.messageContainer}>
          {file && (
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>{file.name}</span>
              <button
                onClick={handleRemoveFile}
                className={styles.removeFileButton}
              >
                x
              </button>
            </div>
          )}
        </div>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение"
          className={styles.textInput}
          rows={1}
        />

        <button onClick={handleSend} className={styles.sendButton}>
          <img
            src="/images/chats/sendMessage.svg"
            alt="Отправить"
            className={styles.icon}
          />
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles.fileInput}
        accept=".pdf,.jpg,.jpeg,.doc,.docx"
        hidden
      />
    </div>
  );
};

export default MessageInput;
