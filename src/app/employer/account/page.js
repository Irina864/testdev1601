"use client";
import Account from "@/components/Account/AccountEmployer";
import AsideSteps from "@/components/Account/AsideSteps/AsideSteps";
import { useDispatch, useSelector } from "react-redux";
import Nav from "@/components/Nav/Nav";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import useResponsiveLayout from "@/hooks/useResponsiveLayout";
import BackButton from "@/components/UI/BackButton/BackButton";
import { linkHrefCreateVacancy, linkHrefResumes } from "@/Links";
import { getEmployerData } from "@/store/API/accountUserSlice";
import { useUserId } from "@/hooks/useUserId";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";
import Link from "next/link";

export default function EmployerAccount() {
  const dispatch = useDispatch();
  const { isAsideVisible, setAsideVisible, isMobile } = useResponsiveLayout();
  const [currentStepTitle, setCurrentStepTitle] = useState("");
  const isLoading = useSelector((state) => state.accountUser.isLoading);
  const page = useSelector((state) => state.pageSave); // находится в pageSliceAccount
  useEffect(() => {
    dispatch(getEmployerData(useUserId("access_token")));
    console.log(isLoading);
  }, [dispatch]);
  const goBack = () => {
    setAsideVisible(true);
  };
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <main className={styles.main}>
      {!isMobile || (isMobile && !isAsideVisible) ? (
        <nav className={styles.nav}>
          <Nav page="Аккаунт" isMobileAccount={isMobile} />
        </nav>
      ) : null}

      <div className={styles.container}>
        {isMobile ? (
          !isAsideVisible ? (
            <>
              <div className={styles.navBtns}>
              <BackButton
                isMobile={isMobile}
                isAsideVisible={isAsideVisible}
                onGoBack={goBack}
                currentSection={currentStepTitle || "Назад"}
              />
            {page === 1 ? 
            <p className={styles.navBtns__add}><a className={styles.navBtns__add__link} href={linkHrefCreateVacancy}>Добавить новую</a></p> : ''
          }
          </div>
              <Account />
            </>
          ) : (
            <aside>
              <div className={styles.sidebarContainer}>
                <BackButton
                  isMobile={isMobile}
                  isAsideVisible={isAsideVisible}
                  linkToBack={linkHrefResumes}
                  nameLink="Аккаунт"
                />
                <AsideSteps
                  onOptionClick={() => setAsideVisible(false)}
                  setCurrentStepTitle={setCurrentStepTitle}
                />
              </div>
            </aside>
          )
        ) : (
          <>
            <aside>
              <div className={styles.sidebarContainer}>
                <AsideSteps setCurrentStepTitle={setCurrentStepTitle} />
              </div>
            </aside>
            <div>{isLoading ? <LoadingSpinner /> : <Account />}</div>
          </>
        )}
      </div>
    </main>
  );
}
