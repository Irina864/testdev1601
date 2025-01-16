import React from "react";
import { useDispatch } from "react-redux";
import styles from "./ReactionButtons.module.scss";
import { patchReaction } from "@/store/API/reactionSlice";

const ReactionButtons = ({ reactionId }) => {
  const dispatch = useDispatch();

  const handleAction = (action) => {
    const data = {
      id: reactionId,
      reaction_to_vacancy: action,
    };
    dispatch(patchReaction(data));
  };

  return (
    <div className={styles.reaction_buttons}>
      <button onClick={() => handleAction(1)} className={styles.decline}>
        Отказать
      </button>
      <button onClick={() => handleAction(2)} className={styles.accept}>
        Принять
      </button>
    </div>
  );
};

export default ReactionButtons;
