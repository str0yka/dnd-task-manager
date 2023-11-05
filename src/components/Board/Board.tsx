import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { Button, Input } from '~components/common';
import { TASK_MAX_LENGHT, TASK_MIN_LENGHT } from '~utils/constants';
import { useBoardStore } from '~utils/store';

import { Task } from './components';

interface AddCardValues {
  text: string;
}

interface BoardProps extends Board {
  index: number;
}

export const Board: React.FC<BoardProps> = ({ index, id, title, tasks }) => {
  const boardRef = useRef<HTMLElement>(null);
  const taskListRef = useRef<HTMLDivElement>(null);
  const [isAddCardMenuOpen, setIsAddCardMenuOpen] = useState(false);

  const {
    draggedBoard,
    setDraggedBoard,
    setDraggedTask,
    draggedTask,
    addTask,
    moveTask,
    moveBoard,
  } = useBoardStore(
    useShallow((state) => ({
      addTask: state.addTask,
      moveTask: state.moveTask,
      moveBoard: state.moveBoard,
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
  } = useForm<AddCardValues>({
    defaultValues: {
      text: '',
    },
  });

  const handleOpenAddCardMenu = () => setIsAddCardMenuOpen(true);

  const handleCloseAddCardMenu = () => {
    setIsAddCardMenuOpen(false);
    reset();
  };

  const onAddCard = (values: AddCardValues) => {
    addTask(id, values.text);
    handleCloseAddCardMenu();
  };

  return (
    <article
      ref={boardRef}
      className="flex-shrink-0 w-80 max-h-96 overflow-y-auto p-2 flex flex-col gap-2 bg-gray-100 rounded cursor-grab"
      draggable
      onDragStart={(event) => {
        setDraggedBoard({ id, tasks, title });

        event.dataTransfer.setData('method', 'moveBoard');
        event.dataTransfer.setData('fromIndex', index.toString());
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
          const method = event.dataTransfer.getData('method');
          const fromIndex = Number(event.dataTransfer.getData('fromIndex'));

          if (method === 'moveBoard') {
            moveBoard(fromIndex, index);
          }

          setDraggedBoard(null);

          ['outline', 'outline-offset-2', 'outline-2', 'outline-white'].forEach(
            (cn) => boardRef.current?.classList.remove(cn),
          );
        }
      }}
    >
      <div className="p-2">
        <h2 className="font-semibold">{title}</h2>
      </div>
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
            const method = event.dataTransfer.getData('method');

            if (method === 'moveTask') {
              const fromBoardId = Number(event.dataTransfer.getData('fromBoardId'));

              const toTaskIndex = fromBoardId === id ? tasks.length - 1 : tasks.length;

              moveTask(draggedTask.id, fromBoardId, id, toTaskIndex);
            }

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
          onClick={handleOpenAddCardMenu}
        >
          Add card
        </Button>
      )}
      {isAddCardMenuOpen && (
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onAddCard)}
        >
          <Input
            placeholder="card text"
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
                message: 'the field must contain at least 2 characters',
              },
              maxLength: {
                value: TASK_MAX_LENGHT,
                message: 'the maximum allowed number of characters is 25',
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
              onClick={handleCloseAddCardMenu}
            >
              close
            </Button>
          </div>
        </form>
      )}
    </article>
  );
};
