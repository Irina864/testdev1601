// "use client";
// import ChatWindow from "@/components/Chat/ChatWindow/ChatWindow";
// import SearchAndMenu from "@/components/Chat/SearchAndMenu/SearchAndMenu";
// import Nav from "@/components/Nav/Nav";
// import styles from "./page.module.scss";
// import { addBackLink } from "@/helpers/addBackLinkToNavigationSlice";
// import { linkHrefApplicantAboutEmployer } from "@/Links";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getChat } from "@/store/API/chatsSlice";
// import { useSelector } from "react-redux";

// export default function ApplicantChat() {
//   const dispatch = useDispatch();
//   const chats = useSelector((state) => state.chatsAndMessages.chats);
//   const searchParams = useSearchParams();
//   const chatId = searchParams.get("chatId");

//   useEffect(() => {
//     dispatch(getChat());
//   }, [dispatch]);

//   return (
//     <main className={styles.main}>
//       <nav className={styles.nav}>
//         <Nav page="Чат и отклики" />
//       </nav>
//       <div className={styles.container}>
//         <div className={styles.container__aside}>
//           <SearchAndMenu />
//         </div>
//         <div className={styles.container__content}>
//           <ChatWindow
//             addBackLink={() =>
//               addBackLink(
//                 linkHrefApplicantAboutEmployer,
//                 "Чат и отклики",
//                 "О компании/Вакансии компании"
//               )
//             }
//           />
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import ChatWindow from "@/components/Chat/ChatWindow/ChatWindow";
import SearchAndMenu from "@/components/Chat/SearchAndMenu/SearchAndMenu";
import Nav from "@/components/Nav/Nav";
import styles from "./page.module.scss";
import { addBackLink } from "@/helpers/addBackLinkToNavigationSlice";
import { linkHrefApplicantAboutEmployer } from "@/Links";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat, getChatMessages } from "@/store/API/chatsSlice";

export default function ApplicantChat() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatsAndMessages.chats);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Чат и отклики" />
      </nav>
      <div className={styles.container}>
        <div className={styles.container__aside}>
          <SearchAndMenu />
        </div>
        <div className={styles.container__content}>
          <ChatWindow
            addBackLink={() =>
              addBackLink(
                linkHrefApplicantAboutEmployer,
                "Чат и отклики",
                "О компании/Вакансии компании"
              )
            }
          />
        </div>
      </div>
    </main>
  );
}
