"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CompanyVacancies.module.scss";
import Link from "next/link";
import {
  setActiveVacancies,
  setAllVacancies,
  setArchivedVacancies,
  setCurrentVacancies,
  setModeratedVacancies,
  setModeStep,
} from "@/store/CompanyVacanciesSlice";
import ModalDelVacancy from "@/components/modals/ModalDelVacancy/ModalDelVacancy";
import { linkHrefCreateVacancy } from "@/Links";
import { getVacanciesListForEmployer } from "@/store/API/vacanciesSlice";
import VacansyCompanyCardSkeleton from "@/components/UI/VacancyCard/Skelertons/VacancyCompanyCardSkeletons";
import VacancyCard from "@/components/UI/VacancyCard/VacancyCard.js";

const CompanyVacancies = () => {
  const dispatch = useDispatch();
  // Получаем из store modeStep - название активной вкладки
  const modeStep = useSelector((state) => state.companyVacancies.modeStep);
  const isPatch = useSelector((state) => state.companyVacancies.isPatch);
  const vacanciesList = useSelector((state) => state.vacancies.vacanciesList);
  const buttonsList = ["Все вакансии", "Активные", "Архивные", "На модерации"];
  const n = 5;
  // Стэйт для открытия/закрытия модального окна удаления всех архивных вакансий
  const [isOpen, setIsOpen] = useState(false);
  // Стэйт для отображения скелетонов
  const isLoading = useSelector((state) => state.vacancies.isLoading);

  useEffect(() => {
    // dispatch(setModeStep("Все вакансии"));
    //Получаем массив вакансий из бэка и сохраняем в store 
    dispatch(getVacanciesListForEmployer([]));
    
  }, []);
  useEffect(() => {
    //Получаем массив вакансий из бэка и сохраняем в store
    dispatch(getVacanciesListForEmployer([]));
  }, [isPatch]);
  useEffect(() => {
    dispatch(setAllVacancies(vacanciesList));
    //Фильтруем массив вакансий и сохраняем в store получившиеся массивы
    let activeVacancies = vacanciesList.filter(
      (item) => item.is_active === true
    );
    dispatch(setActiveVacancies(activeVacancies));
    let archivedVacancies = vacanciesList.filter(
      (item) => item.is_archieved === true
    );
    dispatch(setArchivedVacancies(archivedVacancies));
    let moderatedVacancies = vacanciesList.filter(
      (item) => item.is_moderated === true
    );
    dispatch(setModeratedVacancies(moderatedVacancies));
    dispatch(setCurrentVacancies());
  }, [vacanciesList]);

  //Получаем из store нужный массив вакансий
  const currentVacancies = useSelector(
    (state) => state.companyVacancies.currentVacancies
  );

  useEffect(() => {
    dispatch(setCurrentVacancies());
  }, [modeStep]);

  const handleChangeMode = (mode) => {
    dispatch(setModeStep(mode));
  };
  const hendelDelete = () => {
    // dispatch(deleteAllVacancies())
    dispatch(setArchivedVacancies([]));
    dispatch(setCurrentVacancies());
    setIsOpen(false);
  };
  const hendleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {isOpen ? (
        <ModalDelVacancy
          open={isOpen}
          hendelDelete={hendelDelete}
          hendleCloseModal={hendleCloseModal}
        />
      ) : (
        ""
      )}
      <div className={styles.container__buttons}>
        {buttonsList.map((button, index) => {
          // console.log(modeStep);
          return (
            <div
              key={index}
              className={` ${
                modeStep === button ? styles.button__active : ""
              } ${styles.container__buttons__button}`}
              onClick={() => handleChangeMode(button)}
            >
              {button}
            </div>
          );
        })}
      </div>
      {modeStep === "Архивные" ? (
        <p
          className={`${styles.container__delBtn} ${
            currentVacancies.length === 0 ? styles.container__hidden : ""
          }`}
          onClick={() => setIsOpen(true)}
        >
          Удалить все архивные вакансии
        </p>
      ) : (
        ""
      )}
      <div className={styles.container__content}>
        {!currentVacancies || currentVacancies.length === 0 ? (
          <p className={styles.container__content__message}>Нет вакансий</p>
        ) : (
          <>
            {isLoading ? (
              [...Array(n)].map((item, index) => (
                <VacansyCompanyCardSkeleton key={index} />
              ))
            ) : (
              <>
                <div
                  className={
                    modeStep === "Все вакансии" || modeStep === "Активные"
                      ? styles.container__content__addBlock
                      : styles.container__hidden
                  }
                >
                  <p className={styles.addBlock__title}>
                    Добавить новую вакансию
                  </p>
                  <Link
                    className={styles.addBlock__button}
                    href={linkHrefCreateVacancy}
                  >
                    <img
                      src="/images/card/plus.png"
                      alt="add vacancy"
                      className={styles.addBlock__button}
                    />
                  </Link>
                </div>
                {currentVacancies.map((item) => {
                  return <VacancyCard key={item.id} item={item} />;
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyVacancies;
