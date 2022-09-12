import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { TaskTemplate } from '../../../@types/entities/Task';
import { useDebounce } from '../../../hooks/useDebounce';
import closeIcon from './../../../assets/icons/closeRed.svg';

import s from './TemplateElement.module.scss';
interface Props {
  iconColor: string;
  taskType: TaskTemplate;
  onSelect(type: TaskTemplate): void;
  onDeleteTemplate: () => void;
  onChangeTemplateName(templateId: string, value: string): void;
}

export function TemplateElement({
  taskType,
  iconColor,
  onSelect,
  onDeleteTemplate,
  onChangeTemplateName,
}: Props) {
  const [value, setValue] = useState(taskType.templateName);

  const debouncedName = useDebounce(value, 1000);

  useEffect(() => {
    onChangeTemplateName(taskType.id, debouncedName);
  }, [debouncedName]);

  function handleClick(e: MouseEvent) {
    if (e.target instanceof HTMLInputElement && e.target.tagName === 'INPUT') {
      return;
    }
    onSelect(taskType);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div
      title="Название шаблона сохраняется автоматически"
      className={s.taskType}
    >
      <div className={s.name}>
        <input
          className={s.input}
          value={value}
          onChange={onChange}
          placeholder="Введите название шаблона"
        />
        <div
          className={s.delete}
          title="удалить шаблон"
          onClick={onDeleteTemplate}
        >
          <img src={closeIcon} />
        </div>
      </div>
      <div className={s.content} onClick={handleClick}>
        <div className={s.iconBg} style={{ backgroundColor: iconColor }}>
          <img className={s.icon} src={taskType.icon} />
        </div>
        <p>{taskType.title}</p>
      </div>
    </div>
  );
}
