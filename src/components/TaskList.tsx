
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">
          No tasks yet. Add a task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
