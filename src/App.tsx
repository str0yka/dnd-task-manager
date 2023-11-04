import { Board } from '~components';
import { Button } from '~components/common';
import { useBoardStore } from '~utils/store';

export const App = () => {
  const { boards, addBoard } = useBoardStore();

  return (
    <main className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="h-full flex items-start overflow-x-auto gap-2 p-5">
        {boards.map((board) => (
          <Board
            key={board.id}
            {...board}
          />
        ))}
      </div>
      <div className="absolute m-auto left-0 right-0 bottom-[35px] w-fit">
        <Button
          variant="text"
          type="button"
          onClick={addBoard}
        >
          Add board
        </Button>
      </div>
    </main>
  );
};
