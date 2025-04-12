
import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ThemeToggle from '../components/ThemeToggle';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Index = () => {
  // Initialize tasks from localStorage or default to empty array
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Initialize theme from localStorage or default to 'light'
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Update document class for dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Apply dark mode class on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Task handlers
  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: string, title: string, description: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  // Theme toggle handler
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <div className="container mx-auto max-w-lg py-10 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative transition-colors duration-200">
          <ThemeToggle isDarkMode={darkMode} toggleTheme={toggleTheme} />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Smart To-Do List
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Keep track of your tasks efficiently
            </p>
          </div>
          
          <TaskForm onAddTask={handleAddTask} />
          
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
