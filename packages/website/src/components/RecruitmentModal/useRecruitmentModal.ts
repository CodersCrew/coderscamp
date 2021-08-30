import { useContext } from 'react';

import { RecruitmentModalContext } from './RecruitmentModalProvider';

export const useRecruitmentModal = () => useContext(RecruitmentModalContext);
