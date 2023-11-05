import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { Button, Input } from '~components/common';
import { IconTrash, IconPen, IconClose, IconTick } from '~components/common/icons';
import {
  BOARD_MAX_LENGHT,
  BOARD_MIN_LENGHT,
  TASK_MAX_LENGHT,
  TASK_MIN_LENGHT,
} from '~utils/constants';
import { useBoardStore } from '~utils/store';

import { Task } from './components';

interface BoardValues {
  boardTitle: string;
  newCardText: string;
}

interface BoardProps extends Board {
  index: number;
}

export const Board: React.FC<BoardProps> = ({ index, id, title, tasks }) => {
  const boardRef = useRef<HTMLElement>(null);
  const taskListRef = useRef<HTMLDivElement>(null);
  const [isEditBoardTitle, setIsEditBoardTitle] = useState(false);
  const [isAddCardMenuOpen, setIsAddCardMenuOpen] = useState(false);

  const {
    draggedBoard,
    setDraggedBoard,
    editBoardTitle,
    setDraggedTask,
    draggedTask,
    addTask,
    moveTask,
    moveBoard,
    removeBoard,
  } = useBoardStore(
    useShallow((state) => ({
      addTask: state.addTask,
      moveTask: state.moveTask,
      moveBoard: state.moveBoard,
      removeBoard: state.removeBoard,
      editBoardTitle: state.editBoardTitle,
      draggedTask: state.draggedTask,
      draggedBoard: state.draggedBoard,
      setDraggedBoard: state.setDraggedBoard,
      setDraggedTask: state.setDraggedTask,
    })),
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardValues>({
    defaultValues: {
      boardTitle: title,
      newCardText: '',
    },
  });

  return (
    <article
      ref={boardRef}
      className="flex-shrink-0 w-80 max-h-96 overflow-y-auto p-2 flex flex-col gap-2 bg-gray-100 rounded cursor-grab"
      draggable={!(isEditBoardTitle || isAddCardMenuOpen)}
      onDragStart={(event) => {
        if (isEditBoardTitle || isAddCardMenuOpen) return;

        setDraggedBoard({ id, tasks, title });

        event.dataTransfer.setData('index', index.toString());
      }}
      onDragEnd={() => {
        setDraggedBoard(null);
      }}
      onDragOver={(event) => {
        if (draggedBoard) {
          event.preventDefault();

          ['outline', 'outline-offset-2', 'outline-2', 'outline-white'].forEach(
            (cn) => boardRef.current?.classList.add(cn),
          );
        }
      }}
      onDragLeave={() => {
        if (draggedBoard) {
          ['outline', 'outline-offset-2', 'outline-2', 'outline-white'].forEach(
            (cn) => boardRef.current?.classList.remove(cn),
          );
        }
      }}
      onDrop={(event) => {
        if (draggedBoard) {
          const fromIndex = Number(event.dataTransfer.getData('index'));

          moveBoard(fromIndex, index);
          setDraggedBoard(null);

          ['outline', 'outline-offset-2', 'outline-2', 'outline-white'].forEach(
            (cn) => boardRef.current?.classList.remove(cn),
          );
        }
      }}
    >
      {!isEditBoardTitle && (
        <div className="p-2 flex items-center gap-1">
          <div className="flex-grow">
            <h2 className="font-semibold">{title}</h2>
          </div>
          <div>
            <Button onClick={() => setIsEditBoardTitle(true)}>
              <IconPen />
            </Button>
          </div>
          <div>
            <Button onClick={() => removeBoard(id)}>
              <IconTrash />
            </Button>
          </div>
        </div>
      )}
      {isEditBoardTitle && (
        <form
          className="flex items-center gap-1"
          onSubmit={handleSubmit((values) => {
            editBoardTitle(id, values.boardTitle);
            setIsEditBoardTitle(false);
          })}
        >
          <div className="flex-grow">
            <Input
              {...register('boardTitle', {
                required: {
                  value: true,
                  message: 'field is required',
                },
                minLength: {
                  value: BOARD_MIN_LENGHT,
                  message: `the field must contain at least ${BOARD_MIN_LENGHT} characters`,
                },
                maxLength: {
                  value: BOARD_MAX_LENGHT,
                  message: `the maximum allowed number of characters is ${BOARD_MAX_LENGHT}`,
                },
              })}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="green"
            >
              <IconTick />
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="red"
              onClick={() => {
                reset({ boardTitle: title });
                setIsEditBoardTitle(false);
              }}
            >
              <IconClose />
            </Button>
          </div>
        </form>
      )}
      <div
        ref={taskListRef}
        className="flex flex-col rounded pb-6"
        onDragOver={(event) => {
          event.preventDefault();

          if (draggedTask) {
            ['outline', 'outline-offset-2', 'outline-2', 'outline-violet-500'].forEach(
              (cn) => taskListRef.current?.classList.add(cn),
            );
          }
        }}
        onDragLeave={(event) => {
          event.preventDefault();

          if (draggedTask) {
            ['outline', 'outline-offset-2', 'outline-2', 'outline-violet-500'].forEach(
              (cn) => taskListRef.current?.classList.remove(cn),
            );
          }
        }}
        onDrop={(event) => {
          if (draggedTask) {
            const fromBoardId = Number(event.dataTransfer.getData('taskBoardId'));
            const toTaskIndex = fromBoardId === id ? tasks.length - 1 : tasks.length;

            moveTask(draggedTask.id, fromBoardId, id, toTaskIndex);

            setDraggedTask(null);

            ['outline', 'outline-offset-2', 'outline-2', 'outline-violet-500'].forEach(
              (cn) => taskListRef.current?.classList.remove(cn),
            );
          }
        }}
      >
        {!!tasks.length &&
          tasks.map((task, taskIndex) => (
            <Task
              key={task.id}
              index={taskIndex}
              boardId={id}
              {...task}
            />
          ))}
        {!tasks.length && (
          <div className="p-2">
            <p className="font-medium text-sm">No cards</p>
          </div>
        )}
      </div>
      {!isAddCardMenuOpen && (
        <Button
          variant="contained"
          onClick={() => setIsAddCardMenuOpen(true)}
        >
          Add card
        </Button>
      )}
      {isAddCardMenuOpen && (
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((values) => {
            addTask(id, values.newCardText);
            setIsAddCardMenuOpen(false);
            reset({ newCardText: '' });
          })}
        >
          <Input
            placeholder="card text"
            {...(!!errors.newCardText?.message && {
              error: true,
              helperText: errors.newCardText.message,
            })}
            {...register('newCardText', {
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
          <div className="flex justify-between gap-2">
            <Button
              variant="contained"
              color="green"
              type="submit"
            >
              add
            </Button>
            <Button
              variant="contained"
              color="red"
              onClick={() => {
                setIsAddCardMenuOpen(false);
                reset({ newCardText: '' });
              }}
            >
              close
            </Button>
          </div>
        </form>
      )}
    </article>
  );
};
