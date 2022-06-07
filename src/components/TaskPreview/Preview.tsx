import React from 'react';
import { SomeTask } from '../../@types/entities/Task';

import { CompetitionTaskPreview } from './Competition/Competition';
import { EventTaskPreview } from './Event/Event';
import { TrainingTaskPreview } from './Training/Training';

type TaskPreviewProps = {
  task: SomeTask;
  isSpecialist: boolean;
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: number | undefined): void;
  onSaveFirstValue(value: number | undefined): void;
  onSaveSecondValue(value: number | undefined): void;
};

export const TaskPreview = ({
  task,
  isSpecialist,
  onSendComment,
  onSaveFactValue,
  onSaveFirstValue,
  onSaveSecondValue,
}: TaskPreviewProps) => {
  switch (task.type) {
    case 'training':
      return (
        <TrainingTaskPreview
          isSpecialist={isSpecialist}
          task={task}
          onSaveFirstValue={onSaveFirstValue}
          onSaveSecondValue={onSaveSecondValue}
          onSendComment={onSendComment}
        />
      );
    case 'event':
      return <EventTaskPreview task={task} onSendComment={onSendComment} />;
    case 'competition':
      return (
        <CompetitionTaskPreview
          isSpecialist={isSpecialist}
          task={task}
          onSaveFactValue={onSaveFactValue}
          onSendComment={onSendComment}
        />
      );
    default:
      return <></>;
  }
};
