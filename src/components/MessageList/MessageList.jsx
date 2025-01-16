// import Message from "@/components/Message/Message";
// import styles from "./MessageList.module.scss";

// const MessageList = ({ messages }) => {
//   return (
//     <div className={styles.chatBody}>
//       {messages.map((message, index) => (
//         <div key={index}>
//           {index === 0 || messages[index - 1].date !== message.date ? (
//             <div className={styles.messageDate}>{message.date}</div>
//           ) : null}
//           <Message message={message} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageList;
import Message from "@/components/Message/Message";
import styles from "./MessageList.module.scss";
import ReactionButtons from "../UI/ReactionButtons/ReactionButtons";

const MessageList = ({ messages, currentUserId }) => {
  console.log("currentUserId:", currentUserId);

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = new Date(message.created_at).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className={styles.chatBody}>
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className={styles.messageDate}>{date}</div>
          {dateMessages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isOwnMessage={message.receiver !== currentUserId}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
