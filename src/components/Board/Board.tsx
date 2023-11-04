import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '~components/common';
import { TASK_MAX_LENGHT, TASK_MIN_LENGHT } from '~utils/constants';
import { useBoardStore } from '~utils/store';

import { Task } from './components';

interface AddCardValues {
  text: '';
}

type BoardProps = Board;

export const Board: React.FC<BoardProps> = ({ id, title, tasks }) => {
  const [isAddCardMenuOpen, setIsAddCardMenuOpen] = useState(false);

  const addTask = useBoardStore((state) => state.addTask);

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
    <article className="w-72 p-2 flex flex-col gap-2 bg-gray-100 rounded">
      <div className="p-2">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task
            boardId={id}
            {...task}
          />
        ))}
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
              type="submit"
            >
              add
            </Button>
            <Button
              variant="contained"
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
