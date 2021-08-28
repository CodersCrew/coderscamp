import { BoxProps } from '../Box';

type DoneProps = {
  status: 'done';
  points: number;
  pointsMax: number;
  date?: never;
};

type NotDoneProps = {
  status: 'idle' | 'doing' | 'review';
  date: Date;
  points?: never;
  pointsMax?: never;
};

type CommonProps = {
  image: string;
  title: string;
  url: string;
  onButtonClick: (url: string) => void;
};

type ProjectCardStatus = 'idle' | 'doing' | 'review' | 'done';

type ProjectCardOptions = Record<ProjectCardStatus, { statusText: string; timeStatus: string }>;

export const PROJECT_CARD_TEXT: ProjectCardOptions = {
  idle: {
    statusText: 'Nie rozpoczęty',
    timeStatus: 'Rozpoczęcie',
  },
  doing: {
    statusText: 'W trakcie',
    timeStatus: 'Deadline',
  },
  review: {
    statusText: 'W ocenie',
    timeStatus: 'Demo',
  },
  done: {
    statusText: 'Zakończony',
    timeStatus: 'Punkty',
  },
};

export type ProjectCardProps = CommonProps & (DoneProps | NotDoneProps) & BoxProps;
