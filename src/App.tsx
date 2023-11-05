import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Board } from '~components';
import { Button } from '~components/common';
import { useBoardStore } from '~utils/store';

export const App = () => {
  const removeBoardContainerRef = useRef<HTMLDivElement>(null);

  const { boards, addBoard, draggedBoard, removeBoard, setDraggedBoard } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      addBoard: state.addBoard,
      removeBoard: state.removeBoard,
      draggedBoard: state.draggedBoard,
      setDraggedBoard: state.setDraggedBoard,
    })),
  );

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
      {!!boards.length && (
        <div className="absolute inset-x-0 bottom-52 flex justify-center">
          <div
            ref={removeBoardContainerRef}
            className="h-32 w-64 flex items-center justify-center rounded font-medium text-white text-sm bg-white/10"
            onDragOver={(event) => {
              event.preventDefault();
              removeBoardContainerRef.current?.classList.add('bg-white/20');
            }}
            onDragLeave={() => {
              removeBoardContainerRef.current?.classList.remove('bg-white/20');
            }}
            onDrop={() => {
              if (draggedBoard) {
                removeBoard(draggedBoard.id);
                setDraggedBoard(null);
              }

              removeBoardContainerRef.current?.classList.remove('bg-white/20');
            }}
          >
            move board to remove
          </div>
        </div>
      )}
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
