import { move } from '~utils/helpers';

export const moveTask = (
  boards: Board[],
  taskId: number,
  fromBoardId: number,
  toBoardId: number,
  toTaskIndex: number,
): Board[] => {
  const task = boards.find((board) => board.id === fromBoardId)?.tasks.find((t) => t.id === taskId);

  if (!task) return boards;

  return boards.map((board) => {
    if (board.id === fromBoardId && fromBoardId === toBoardId) {
      const fromTaskIndex = board.tasks.findIndex((t) => t.id === taskId);

      return { ...board, tasks: move(board.tasks, fromTaskIndex, toTaskIndex) };
    }

    if (board.id === fromBoardId) {
      return { ...board, tasks: board.tasks.filter((t) => t.id !== taskId) };
    }

    if (board.id === toBoardId) {
      board.tasks.splice(toTaskIndex, 0, task);
    }

    return board;
  });
};
