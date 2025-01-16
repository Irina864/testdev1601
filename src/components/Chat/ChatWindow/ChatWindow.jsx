// "use client";
// import MessageList from "@/components/MessageList/MessageList";
// import MessageInput from "@/components/UI/MessageInput/MessageInput";
// import UserStatus from "@/components/UserStatus/UserStatus";
// import { useEffect, useState } from "react";
// import styles from "./ChatWindow.module.scss";
// import { useSelector } from "react-redux";

// const ChatWindow = () => {
//   const [messages, setMessages] = useState([]);

//   const handleSendMessage = (formData) => {
//     const message = formData.get("message");
//     const files = formData.getAll("file");

//     const userMessage = {
//       text: message,
//       time: new Date().toLocaleTimeString("ru-RU", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//       }),
//       sender: "me",
//       date: new Date().toLocaleDateString("ru-RU", {
//         day: "numeric",
//         month: "long",
//       }),
//       avatar: "/images/chats/user.svg",
//       files,
//     };

//     setMessages((prevMessages) => [...prevMessages, userMessage]);

//     setTimeout(() => {
//       const botMessage = {
//         text: "Это ответ от бота!",
//         time: new Date().toLocaleTimeString("ru-RU", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: false,
//         }),
//         sender: "other",
//         date: new Date().toLocaleDateString("ru-RU", {
//           day: "numeric",
//           month: "long",
//         }),
//         avatar: "/images/chats/company.svg",
//       };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     }, 1000);
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <UserStatus />
//       <hr />
//       <MessageList messages={messages} />
//       <hr />
//       <MessageInput onSend={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatWindow;

"use client";
import MessageList from "@/components/MessageList/MessageList";
import MessageInput from "@/components/UI/MessageInput/MessageInput";
import UserStatus from "@/components/UserStatus/UserStatus";
import { useEffect, useState } from "react";
import styles from "./ChatWindow.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { postChatMessage, getChatMessages } from "@/store/API/chatsSlice";
import { useUserId } from "@/hooks/useUserId";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const currentUserId = useUserId("access_token");
  console.log("currentUserId из access_token:", currentUserId);

  const messages = useSelector((state) => state.chatsAndMessages.chatMessages);
  const currentChat = useSelector((state) => state.userChats.currentChat);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentChat?.id) {
      dispatch(getChatMessages(currentChat.id));
    }
  }, [currentChat?.id, dispatch]);

  const handleSendMessage = async (formData) => {
    const messageText = formData.get("message").trim();
    const file = formData.get("file");
    setError("");

    console.log("=== Отправка сообщения ===");
    console.log("ID текущего пользователя:", currentUserId);
    console.log("Участники чата:", currentChat?.members);

    if (!currentUserId || currentUserId === "null") {
      setError("Необходимо авторизоваться");
      return;
    }

    if (!currentChat.members || currentChat.members.length !== 2) {
      setError(
        `Ошибка: некорректное количество участников (${currentChat.members?.length})`
      );
      return;
    }

    const receiver = currentChat.members.find(
      (member) => member && member !== currentUserId && member !== "null"
    );

    console.log("Найденный получатель:", receiver);

    if (!receiver) {
      setError("Ошибка: не удалось определить получателя");
      return;
    }

    try {
      let response;

      if (file) {
        if (file) {
          if (file.size > 20 * 1024 * 1024) {
            setError("Размер файла не должен превышать 20MB");
            return;
          }

          const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];

          if (!allowedTypes.includes(file.type)) {
            setError("Разрешены только файлы форматов PDF, JPG, DOC или DOCX");
            return;
          }
        }

        const apiFormData = new FormData();
        apiFormData.append("chat", currentChat.id);
        apiFormData.append("text", messageText);
        apiFormData.append("receiver", receiver);
        apiFormData.append("file", file);

        response = await dispatch(
          postChatMessage({
            formData: apiFormData,
            isFormData: true,
          })
        ).unwrap();
      } else {
        const messageData = {
          chat: currentChat.id,
          text: messageText,
          receiver: receiver,
        };

        response = await dispatch(
          postChatMessage({
            data: messageData,
            isFormData: false,
          })
        ).unwrap();
      }

      console.log("Успешная отправка:", response);
      dispatch(getChatMessages(currentChat.id));
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setError(
        error.non_field_errors?.[0] ||
          error.file?.[0] ||
          "Не удалось отправить сообщение"
      );
    }
  };
  if (!currentChat?.id) {
    return (
      <div className={styles.chatEmptyContainer}>
        <div className={styles.emptyState}>
          Выберите чат, чтобы узнать детали отклика, приглашения или отказа
        </div>
        <hr />
      </div>
    );
  }
  return (
    <div className={styles.chatContainer}>
      <UserStatus />
      <hr />
      {error && <div className={styles.errorMessage}>{error}</div>}
      <MessageList messages={messages} currentUserId={currentUserId} />
      <hr />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
