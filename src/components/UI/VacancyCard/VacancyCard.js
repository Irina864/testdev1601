"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./VacancyCard.module.scss";
import { calcDaysLeft } from "@/helpers/ageAndMonthCalculaiter";
import { dateCreationFormat } from "@/helpers/dateCreationFormated";
import { deleteVacancy, patchVacancy } from "@/store/API/vacanciesSlice";
import { linkHrefEditVacancy } from "@/Links";
import { setIsPatch } from "@/store/CompanyVacanciesSlice";

const VacancyCard = (props) => {
  const dispatch = useDispatch();
  const modeStep = useSelector((state) => state.vacancies.modeStep);
  const item = props.item;
  const isActive = Boolean(item.is_active === true);
  const isModerated = Boolean(item.is_moderated === true);
  // Стэйт для открытия/закрытия карточки удаления вакансии
  const [isDelCard, setIsDelCard] = useState(false);
  
  const publicationStatus = () => {
    const dateCreate = new Date(item.created_at);
    // if(item.is_active) return calcDaysLeft(item.created_at); //Возвращает количество дней, оставшихся до архивации
    if (item.is_active) return dateCreationFormat(dateCreate);
    if (item.is_archived) return "вакансия в архиве";
    if (item.is_moderated) return "вакансия на модерации";
  };

  const isRemote = () => {
    if (item.remote_is_available) return "можно удалённо";
    else return "";
  };

  const years = () => {
    if (item.experience_to == 1) return "год";
    if (item.experience_to <= 4) return "года";
    if (item.experience_to >= 5) return "лет";
  };
  const handleArhivate = (item) => {
    let id = item.id;
    let data = {
      position: item.position,
      description: item.description,
      qualification_requirements: item.qualification_requirements,
      responsibilities: item.responsibilities,
      address: item.address,
      city: item.city,
      conditions: item.conditions,
      education_level: item.education_level,
      experience_from: item.experience_from,
      experience_to: item.experience_to,
      is_active: false,
      is_archieved: true,
    };
    dispatch(patchVacancy({ id, data }));
    dispatch(setIsPatch());
  };
  const handleActivate = (item) => {
    let data = {
      is_active: true,
      is_archieved: false,
      position: item.position,
      description: item.description,
      qualification_requirements: item.qualification_requirements,
      responsibilities: item.responsibilities,
      address: item.address,
      city: item.city,
      conditions: item.conditions,
      education_level: item.education_level,
      experience_from: item.experience_from,
      experience_to: item.experience_to,
    };
    let id = item.id;
    dispatch(patchVacancy({ id, data }));
    dispatch(setIsPatch());
  };
  const openDeleteModal = () => {
    setIsDelCard(true);
  };
  const closeDeleteModal = () => {
    setIsDelCard(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteVacancy(id));
    dispatch(setIsPatch());
    setIsDelCard(false);
  };

  return (
    <>
      {isDelCard ? (
        <div className={styles.delCard}>
          <h2 className={styles.delCard__header}>Удалить вакансию</h2>
          <div className={styles.delCard__footer}>
            <div
              className={styles.delCard__footer__left}
              onClick={() => handleDelete(item.id)}
            >
              <img
                className={styles.delCard__footer__left__img}
                src="/images/card/trash.svg"
                alt="delete"
              />
              <p className={styles.delCard__footer__left__txt}>Удалить</p>
            </div>
            <button
              className={styles.delCard__footer__right}
              onClick={() => closeDeleteModal()}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <h2
            className={`${styles.card__title} ${
              !isActive ? styles.card__archive : ""
            }`}
          >
            {item.position}
          </h2>
          <div className={styles.card__content}>
            <div className={styles.data}>
              <img
                className={styles.data__img}
                src="/images/card/location.svg"
                alt="location"
              />
              <p className={styles.data__title}>
                {item.city}, {isRemote()}
              </p>
            </div>
            <div className={styles.data}>
              <img
                className={styles.data__img}
                src="/images/card/experience.svg"
                alt="experience"
              />
              <p className={styles.data__title}>
                {item.no_experience
                  ? "Можно без опыта"
                  : `${item.experience_from} - ${
                      item.experience_to
                    } ${years()}`}
              </p>
            </div>
          </div>
          <p
            className={`${styles.card__salary} ${
              !isActive ? styles.card__archive : ""
            }`}
          >
            {item.salary_from} ₽
          </p>
          <div className={styles.card__options}>
            <p
              className={
                isActive
                  ? styles.card__options__days
                  : `${styles.card__options__days} ${styles.card__options__archive}`
              }
            >
              {publicationStatus()}
            </p>

            {isActive || isModerated ? (
              <div className={styles.card__options__icons}>
                <img
                  src="/images/card/archive.svg"
                  alt="archive"
                  className={styles.card__options__icons__img}
                  onClick={() => handleArhivate(item)}
                />
                <a href={linkHrefEditVacancy}>
                  <img
                    src="/images/card/redact.svg"
                    alt="redact"
                    className={styles.card__options__icons__img}
                  />
                </a>
              </div>
            ) : (
              <div className={styles.card__options__icons}>
                <img
                  src="/images/card/restore_trash.svg"
                  alt="archive"
                  className={styles.card__options__icons__img}
                  onClick={() => handleActivate(item)}
                />
                <img
                  src="/images/card/trash.svg"
                  alt="delete"
                  className={styles.card__options__icons__img}
                  onClick={
                    () => openDeleteModal()
                    // handleDelete(item.id)
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VacancyCard;
