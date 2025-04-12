
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div 
      className={`mb-4 rounded-lg shadow-md p-4 transition-all ${
        task.completed ? 'opacity-70' : 'opacity-100'
      } border border-gray-200 dark:border-gray-700`}
    >
      {isEditing ? (
        <div>
          <div className="mb-3">
            <label htmlFor="editTitle" className="block text-sm font-medium mb-1">
              Edit Title
            </label>
            <input
              type="text"
              id="editTitle"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editDescription" className="block text-sm font-medium mb-1">
              Edit Description
            </label>
            <textarea
              id="editDescription"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-grow">
            <h3 
              className={`text-lg font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p 
                className={`mt-1 text-sm ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
          <div className="flex space-x-1 ml-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Edit task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-red-600 hover:text-red-800 transition-colors"
              aria-label="Delete task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
