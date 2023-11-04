import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { move } from '~utils/helpers';

import { moveTask } from './boards.helpers';

interface BoardState {
  title: string;
  boards: Board[];
  addBoard: () => void;
  removeBoard: (id: number) => void;
  moveBoard: (fromIndex: number, toIndex: number) => void;
  editBoardTitle: (boardId: number, title: string) => void;
  addTask: (boardId: number, text: string) => void;
  removeTask: (boardId: number, taskId: number) => void;
  moveTask: (taskId: number, fromBoardId: number, toBoardId: number, toTaskIndex: number) => void;
  editTaskText: (boardId: number, taskId: number, text: string) => void;
}

export const useBoardStore = create<BoardState>()(
  devtools(
    persist(
      (set) => ({
        title: 'project name',
        boards: [],
        addBoard: () =>
          set((state) => ({
            boards: [
              ...state.boards,
              { id: Date.now().valueOf(), title: 'board title', tasks: [] },
            ],
          })),
        removeBoard: (id) =>
          set((state) => ({
            boards: state.boards.filter((board) => board.id !== id),
          })),
        moveBoard: (fromIndex, toIndex) =>
          set((state) => ({
            boards: move(state.boards, fromIndex, toIndex),
          })),
        editBoardTitle: (boardId, title) =>
          set((state) => ({
            boards: state.boards.map((board) => {
              if (board.id === boardId) {
                return { ...board, title };
              }

              return board;
            }),
          })),
        addTask: (boardId, text) =>
          set((state) => ({
            boards: state.boards.map((board) => {
              if (board.id === boardId) {
                return {
                  ...board,
                  tasks: [...board.tasks, { id: Date.now().valueOf(), text }],
                };
              }

              return board;
            }),
          })),
        removeTask: (boardId, taskId) =>
          set((state) => ({
            boards: state.boards.map((board) => {
              if (board.id === boardId) {
                return { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) };
              }

              return board;
            }),
          })),
        moveTask: (taskId, fromBoardId, toBoardId, toTaskIndex) =>
          set((state) => ({
            boards: moveTask(state.boards, taskId, fromBoardId, toBoardId, toTaskIndex),
          })),
        editTaskText: (boardId: number, taskId: number, text: string) =>
          set((state) => ({
            boards: state.boards.map((board) => {
              if (board.id === boardId) {
                return {
                  ...board,
                  tasks: board.tasks.map((task) => {
                    if (task.id === taskId) {
                      return { ...task, text };
                    }

                    return task;
                  }),
                };
              }

              return board;
            }),
          })),
      }),
      {
        name: 'board-store',
      },
    ),
  ),
);
