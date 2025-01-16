// // import Link from "next/link";
// // import styles from "./UserStatus.module.scss";

// // const UserStatus = ({ currentChat }) => {
// //   if (!currentChat?.id) {
// //     return (
// //       <div className={styles.emptyState}>
// //         Выберите чат, чтобы узнать детали отклика, приглашения или отказа
// //       </div>
// //     );
// //   }
// //   return (
// //     <div className={styles.chatHeader}>
// //       <div className={styles.headerLeft}>
// //         <div className={styles.logoContainer}>
// //           <img
// //             src="/images/chats/company.svg"
// //             alt="logo"
// //             className={styles.logo}
// //           />
// //         </div>
// //         <div className={styles.statusContainer}>
// //           <p className={styles.companyName}>Сбербанк</p>
// //           <p className={styles.status}>Онлайн</p>
// //         </div>
// //       </div>
// //       <div className={styles.headerRight}>
// //         <Link href="/">О компании</Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserStatus;
"use client";
import Link from "next/link";
import styles from "./UserStatus.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployerData,
  getApplicantData,
} from "@/store/API/accountUserSlice";
import { useCookie } from "@/hooks/useCookie";
import { useUserId } from "@/hooks/useUserId";
import {
  linkHrefApplicantAboutEmployer,
  linkHrefApplicantAccount,
} from "@/Links";

const UserStatus = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.userChats.currentChat);
  const currentUserId = useUserId("access_token");
  const employerData = useSelector((state) => state.accountUser.employer);
  const applicantData = useSelector((state) => state.accountUser.applicant);
  const isLoading = useSelector((state) => state.accountUser.isLoading);
  const userMode = useCookie("user_mode");

  useEffect(() => {
    console.log("fetchChatPartnerInfo запустился");
    console.log("currentChat:", currentChat);
    console.log("currentUserId:", currentUserId);
    console.log("members:", currentChat?.members);
    const fetchChatPartnerInfo = async () => {
      if (!currentChat?.members || !currentUserId) return;

      const partnerId = currentChat.members.find(
        (member) => member && member !== currentUserId && member !== "null"
      );

      if (!partnerId) return;

      try {
        if (userMode === "employer") {
          const applicantResult = await dispatch(getApplicantData(partnerId));
          console.log("Получены данные соискателя:", applicantResult.payload);
        } else {
          await dispatch(getEmployerData(partnerId));
        }
      } catch (error) {
        console.error("Ошибка при получении данных собеседника:", error);
      }
    };

    fetchChatPartnerInfo();
  }, [currentChat?.members, currentUserId, dispatch, userMode]);

  const chatPartner = userMode === "employer" ? applicantData : employerData;
  const isEmployerChat = userMode === "applicant";
  const profileImage = isEmployerChat ? chatPartner?.logo || "" : "";

  console.log("Все данные состояния:");
  console.log("employerData:", employerData);
  console.log("applicantData:", applicantData);
  console.log("chatPartner:", chatPartner);

  return (
    <div className={styles.chatHeader}>
      <div className={styles.headerLeft}>
        <div className={styles.logoContainer}>
          <img src={profileImage} alt="profile" className={styles.logo} />
        </div>
        <div className={styles.statusContainer}>
          <p className={styles.companyName}>
            {isEmployerChat
              ? chatPartner?.company_name || "Компания"
              : chatPartner?.first_name && chatPartner?.last_name
              ? `${chatPartner.first_name} ${chatPartner.last_name}`
              : "Пользователь"}
          </p>
          <p className={styles.status}>Онлайн</p>
        </div>
      </div>
      <div className={styles.headerRight}>
        {isEmployerChat && chatPartner && (
          <Link href={linkHrefApplicantAboutEmployer}>О компании</Link>
        )}
        {!isEmployerChat && chatPartner && (
          <Link href={linkHrefApplicantAccount}>Резюме</Link>
        )}
      </div>
    </div>
  );
};

export default UserStatus;
