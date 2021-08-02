import React from 'react';

export interface TimelineItemProps {
  step: number;
  date: string;
  information: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ step, date, information }) => {
  return (
    <div>
      <p> {step} </p>
      <p> {date} </p>

      <p> {information} </p>
    </div>
  );
};
