import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { Button, Input } from '~components/common';
import { IconClose, IconTick } from '~components/common/icons';
import { TASK_MIN_LENGHT, TASK_MAX_LENGHT } from '~utils/constants';
import { useBoardStore } from '~utils/store';

interface EditCardValues {
  text: string;
}

interface TaskProps extends Task {
  boardId: number;
}

export const Task: React.FC<TaskProps> = ({ boardId, id, text }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { removeTask, editTaskText } = useBoardStore(
    useShallow((state) => ({
      editTaskText: state.editTaskText,
      removeTask: state.removeTask,
    })),
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditCardValues>({ values: { text } });

  const onEdit = (values: EditCardValues) => {
    setIsEdit(false);
    editTaskText(boardId, id, values.text);
  };

  return (
    <>
      {!isEdit && (
        <button
          onClick={() => setIsEdit(true)}
          key={id}
          type="button"
          className="w-full text-left font-medium text-sm p-2 rounded bg-gray-400/10 hover:bg-gray-400/20"
        >
          {text}
        </button>
      )}
      {isEdit && (
        <form
          className="flex items-start gap-1"
          onSubmit={handleSubmit(onEdit)}
        >
          <Input
            {...(!!errors.text?.message && {
              error: true,
              helperText: errors.text.message,
            })}
            {...register('text', {
              required: {
                value: true,
                message: 'field is required',
              },
              minLength: {
                value: TASK_MIN_LENGHT,
                message: 'min characters is 2',
              },
              maxLength: {
                value: TASK_MAX_LENGHT,
                message: 'max characters is 25',
              },
            })}
          />
          <button
            type="submit"
            aria-hidden="true"
            className="bg-green-300 w-9 h-9 flex items-center justify-center rounded hover:bg-green-400/50"
          >
            <IconTick className="stroke-black" />
          </button>
          <button
            type="submit"
            aria-hidden="true"
            className="bg-red-300 w-9 h-9 flex items-center justify-center rounded hover:bg-red-400/50"
            onClick={() => {
              setIsEdit(false);
              setValue('text', text);
            }}
          >
            <IconClose className="stroke-black" />
          </button>
        </form>
      )}
    </>
  );
};
