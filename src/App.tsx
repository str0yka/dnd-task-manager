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
      <div className="absolute inset-x-0 bottom-16 flex items-start w-fit">
        <Button
          variant="contained"
          type="button"
          color="violet"
          onClick={addBoard}
        >
          a
        </Button>
        <Button
          variant="outlined"
          type="button"
          color="indigo"
          onClick={addBoard}
        >
          a
        </Button>
        <Button
          variant="text"
          type="button"
          color="slate"
          onClick={addBoard}
        >
          a
        </Button>
      </div>
    </main>
  );
};
