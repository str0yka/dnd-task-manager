import { Board } from '~components';
import { Button } from '~components/common';
import { useBoardStore } from '~utils/store';

export const App = () => {
  const { boards, addBoard } = useBoardStore();

  return (
    <main className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="w-full h-full flex items-start overflow-x-auto gap-2 p-5">
        {boards.map((board, index) => (
          <Board
            key={board.id}
            index={index}
            {...board}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <div>
          <Button
            variant="text"
            type="button"
            color="white"
            onClick={addBoard}
          >
            Add board
          </Button>
        </div>
      </div>
    </main>
  );
};
