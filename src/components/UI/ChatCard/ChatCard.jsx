"use client";

import styles from "./ChatCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setAllChats,
  setCurrentChat,
  setCurrentChatsList,
  setInputValue,
} from "@/store/chatsSlice";
import ChatSkeleton from "@/components/UI/ChatSkeleton/ChatSkeleton";
import { getVacanciesList } from "@/store/API/vacanciesSlice";
import { useUserId } from "@/hooks/useUserId";
import { getApplicantData } from "@/store/API/accountUserSlice";
import { getResumeList } from "@/store/API/resumeSlice";
import {
  deleteChatMessage,
  getAllMessagesFromChat,
  getChat,
  getChatMessages,
} from "@/store/API/chatsSlice";
import { getReactionList } from "@/store/API/reactionSlice";
import {path} from "../../../store/API/path"
import { useCookie } from "@/hooks/useCookie";

const ChatCard = (props) => {
  const dispatch = useDispatch();
  const chat = props.chat;
  console.log(chat);
  const id = chat.id;
  let dataChat = {};
  const reactionList = useSelector((state) => state.registration.reactionList);
  console.log(reactionList);
  // useEffect(() => {
  // },[])
  async function getDataChat(id) {
    // const chatMessages = getAllMessagesFromChat(id);
    // const currentReaction = reactionList.filter(el => )
     try {
          const response = await fetch(`${path}/chat/${id}/messages/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${useCookie("access_token")}`,
            },
          });
          console.log("Response status:", response.status);
    
          if (!response.ok) {
            const errorText = await response.text();
            const errorObject = JSON.parse(errorText);
            console.log("Error response:", errorObject);
          }
    
          const responseJson = await response.json();
          console.log(response, responseJson);
          dataChat.messages = responseJson;
          // return responseJson;
        } catch (error) {
          console.error("Get data error:", error);
        }
    
  } 
  // const id = chat.id;
  // const firstMemberId = chat.members[0];
  // const secondMemberId = chat.members[1];
  // const reactionsFirstMember = dispatch(getReactionById(firstMemberId));
  // const reactionsSecondMember = getReactionById(secondMemberId);
  // console.log(reactionsFirstMember, reactionsSecondMember);
  // const chatMessages = getAllMessagesFromChat(id);
  // console.log(chatMessages);

  //   const messages = getAllMessagesFromChat(id);

  //   const isLoading = useSelector(state => state.chats.isLoading);
  //   useEffect(() => {
  //    //  dispatch(getChat());
  //     // dispatch(getChatMessages(16));
  //     // dispatch(deleteChatMessage(16, 24));
  //     // getAllMessagesFromChat(id);
  //   }, []);

  const currentChat = useSelector((state) => state.userChats.currentChat);
  //   const inputValue = useSelector((state) => state.userChats.inputValue);
  const chatMessages = useSelector((state) => state.chats.chatMessages);
  const currentChatsList = useSelector(
    (state) => state.userChats.currentChatsList
  );
  //   const firstMemberId = chat.members[0];
  //   const secondMemberId = chat.members[1];
  // const reactionsFirstMember = dispatch((firstMemberId));
  // const reactionsSecondMember = dispatch((secondMemberId);
  // console.log(reactionsFirstMember, reactionsSecondMember);
  //   const chatMessages = getAllMessagesFromChat(id);
  // useEffect(() => {
  //   console.log(chatMessages);
  // },[dispatch]);
  const hendleSelectChat = (id) => {
    const newCurrentChat = currentChatsList.find((el) => el.id === id);
    dispatch(setCurrentChat(newCurrentChat));
  };

  return (
    <div
      className={
        id === currentChat.id
          ? `${styles.chat} ${styles.chat_active}`
          : styles.chat
      }
      onClick={() => hendleSelectChat(id)}
    >
      <div className={styles.chat__content}>
        <div className={styles.chat__content__title}>
          <h3 className={styles.chat__content__title__header}>{id}</h3>
          <p className={styles.chat__content__title__time}>
            {/*  {chat.time} */}
          </p>
        </div>
      </div>
      {/* <img className={styles.chat__avatar} src={chat.avatarUrl} alt="avatar" />
      <p className={styles.chat__avatar__span}></p>
      <div className={styles.chat__content}>
        <div className={styles.chat__content__title}>
          <h3 className={styles.chat__content__title__header}>{name}</h3>
          <p className={styles.chat__content__title__time}>{chat.time}</p>
        </div>
        <div
          className={
            chat.lastMessage.length === 0
              ? styles.hidden
              : styles.chat__content__middle
          }
        >
          <p className={styles.chat__content__middle__message}>
            {chat.lastMessage}
          </p>
          <p className={styles.chat__content__middle__net}></p>
        </div>
        <p
          className={
            chat.status == true
              ? styles.chat__content__status_invitation
              : chat.status === null
              ? styles.chat__content__status
              : styles.chat__content__status_refusal
          }
        >
          {chat.status == true
            ? "Приглашение"
            : chat.status === null
            ? "Вы откликнулись"
            : "Отказ"}
        </p>
      </div> */}
    </div>
  );
};

export default ChatCard;
