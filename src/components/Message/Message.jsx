// import styles from "./Message.module.scss";

// const Message = ({ message }) => {
//   const isUserMessage = message.sender === "me";

//   return (
//     <div
//       className={`${styles.message} ${
//         isUserMessage ? styles.myMessage : styles.otherMessage
//       }`}
//     >
//       <img src={message.avatar} alt="avatar" className={styles.avatar} />
//       <div className={styles.messageContent}>
//         <p>{message.text}</p>
//         {message.files && message.files.length > 0 && (
//           <div className={styles.attachedFiles}>
//             <img
//               src="/images/chats/attach.svg"
//               alt="Attached_file"
//               className={styles.icon}
//             />
//             {message.files.map((file, fileIndex) => (
//               <p key={fileIndex} className={styles.fileName}>
//                 {file.name}
//               </p>
//             ))}
//           </div>
//         )}
//         <div className={styles.timeContainer}>
//           <span className={styles.messageTime}>{message.time}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;
import styles from "./Message.module.scss";
import { useSelector } from "react-redux";
import {
  getEmployerData,
  getApplicantData,
} from "@/store/API/accountUserSlice";
import { useCookie } from "@/hooks/useCookie";

const Message = ({ message, isOwnMessage }) => {
  const employerData = useSelector((state) => state.accountUser.employer);
  const applicantData = useSelector((state) => state.accountUser.applicant);
  const userMode = useCookie("user_mode");
  const file = message.file;
  const getFileName = (fileUrl) => {
    return fileUrl?.split("/").pop();
  };
  const getAvatar = () => {
    if (isOwnMessage && userMode === "employer") {
      return employerData?.logo || "";
    }

    if (!isOwnMessage && userMode !== "employer") {
      return employerData?.logo || "";
    }

    return "";
  };

  const avatar = getAvatar();

  console.log("UserMode:", userMode);
  console.log("isOwnMessage:", isOwnMessage);
  console.log("Avatar:", avatar);

  return (
    <div
      className={`${styles.message} ${
        isOwnMessage ? styles.myMessage : styles.otherMessage
      }`}
    >
      <img src={avatar} alt="avatar" className={styles.avatar} />
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {file && (
          <div className={styles.attachedFiles}>
            <img
              src="/images/chats/attach.svg"
              alt="Attached_file"
              className={styles.icon}
            />
            <a href={file} target="_blank" className={styles.fileName}>
              {getFileName(file)}
            </a>
          </div>
        )}

        <div className={styles.timeContainer}>
          <span className={styles.messageTime}>
            {new Date(message.created_at).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
