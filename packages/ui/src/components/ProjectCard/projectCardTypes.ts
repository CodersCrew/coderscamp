export type DoneProps = {
  status: 'done';
  points: number;
  pointsMax: number;
  date?: never;
};

export type NotDoneProps = {
  status: 'idle' | 'doing' | 'review';
  date: Date;
  points?: never;
  pointsMax?: never;
};

type CommonProps = {
  image: string;
  title: string;
  url: string;
};

export type ProjectCardProps = CommonProps & (DoneProps | NotDoneProps);
