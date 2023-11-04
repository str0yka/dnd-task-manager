interface Task {
  id: number;
  text: string;
}

interface Board {
  id: number;
  title: string;
  tasks: Task[];
}
