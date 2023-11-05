import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { Button, Input } from '~components/common';
import { IconClose, IconTick, IconTrash } from '~components/common/icons';
import { TASK_MIN_LENGHT, TASK_MAX_LENGHT } from '~utils/constants';
import { useBoardStore } from '~utils/store';

interface EditCardValues {
  text: string;
}

interface TaskProps extends Task {
  index: number;
  boardId: number;
}

export const Task: React.FC<TaskProps> = ({ boardId, index, id, text }) => {
  const taskRef = useRef<HTMLDivElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { draggedTask, setDraggedTask, moveTask, removeTask, editTaskText } = useBoardStore(
    useShallow((state) => ({
      editTaskText: state.editTaskText,
      removeTask: state.removeTask,
      moveTask: state.moveTask,
      draggedTask: state.draggedTask,
      setDraggedTask: state.setDraggedTask,
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
        <div
          ref={taskRef}
          className="w-full flex items-center justify-between text-left font-medium text-sm p-2 rounded bg-gray-400/10 hover:bg-gray-400/20 cursor-grab"
          aria-hidden="true"
          draggable
          onClick={() => setIsEdit(true)}
          onDragStart={(event) => {
            event.stopPropagation();

            setDraggedTask({ id, text });

            event.dataTransfer.setData('taskBoardId', boardId.toString());

            setTimeout(() => taskRef.current?.classList.add('opacity-25'), 0);
          }}
          onDragOver={(event) => {
            event.preventDefault();

            if (draggedTask) {
              event.stopPropagation();

              ['outline', 'outline-offset-2', 'outine-2', 'outline-violet-400'].forEach(
                (cn) => taskRef.current?.classList.add(cn),
              );
            }
          }}
          onDragLeave={(event) => {
            event.preventDefault();

            if (draggedTask) {
              event.stopPropagation();

              ['outline', 'outline-offset-2', 'outine-2', 'outline-violet-400'].forEach(
                (cn) => taskRef.current?.classList.remove(cn),
              );
            }
          }}
          onDragEnd={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setDraggedTask(null);

            taskRef.current?.classList.remove('opacity-25');
          }}
          onDrop={(event) => {
            if (draggedTask) {
              event.stopPropagation();

              const fromBoardId = Number(event.dataTransfer.getData('taskBoardId'));

              moveTask(draggedTask.id, fromBoardId, boardId, index);
              setDraggedTask(null);

              ['outline', 'outline-offset-2', 'outine-2', 'outline-violet-400'].forEach(
                (cn) => taskRef.current?.classList.remove(cn),
              );
            }
          }}
        >
          <span className="flex-grow">{text}</span>
          <div>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                removeTask(boardId, id);
              }}
            >
              <IconTrash className="stroke-black" />
            </Button>
          </div>
        </div>
      )}
      {isEdit && (
        <form
          className="flex items-start gap-1"
          onSubmit={handleSubmit(onEdit)}
        >
          <div className="flex-grow">
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
                  message: `the field must contain at least ${TASK_MIN_LENGHT} characters`,
                },
                maxLength: {
                  value: TASK_MAX_LENGHT,
                  message: `the maximum allowed number of characters is ${TASK_MAX_LENGHT}`,
                },
              })}
            />
          </div>
          <div>
            <Button
              type="submit"
              aria-hidden="true"
              variant="contained"
              color="green"
            >
              <IconTick className="stroke-white w-4 h-4" />
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              aria-hidden="true"
              variant="contained"
              color="red"
              onClick={() => {
                setIsEdit(false);
                setValue('text', text);
              }}
            >
              <IconClose className="stroke-white w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
