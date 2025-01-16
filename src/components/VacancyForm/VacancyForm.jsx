'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Vacancy from './Vacancy/Vacancy';
import Additional from './Additional/Additional';
import styles from './VacancyForm.module.scss';
import useResponsiveLayout from '@/hooks/useResponsiveLayout';
import { closePublishModal } from '@/store/formSlice';
import ModalPublishVacancy from '../modals/ModalPublish/ModalPublishVacancy';
import { setFirstPageForm } from '@/store/pageSlice';

const VacancyForm = () => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const openPublish = useSelector((state) => state.form.openPublish);
  const { isMobile } = useResponsiveLayout();
  const { currentStep } = useSelector((state) => state.progress);

  useEffect(() => {
    if (currentStep === 0) {
      dispatch(setFirstPageForm());
    }
  }, [currentStep]);
  return (
    <>
      {' '}
      {isMobile && openPublish && (
        <>
          {' '}
          <ModalPublishVacancy
            open={openPublish}
            handleClose={(e) => {
              e.preventDefault();
              dispatch(closePublishModal());
            }}
          />
        </>
      )}
      {!openPublish && (
        <form className={styles.form}>
          {page === 0 && <GeneralInfo />}
          {page === 1 && <Vacancy />}
          {page === 2 && <Additional />}
        </form>
      )}
    </>
  );
};

export default VacancyForm;
