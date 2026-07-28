import { useState } from "react";
import Card from "../components/ui/Card";
import TodoForm from "./TodoForm";
import TodoStats from "./TodoStats";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import { FILTERS } from "./constants";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState(FILTERS.ALL);

  const handleSubmit = () => {
    if (!task.trim()) return;

    if (editingId) {
      setTasks(
        tasks.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: task }
            : todo
        )
      );
      setEditingId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleEdit = (id) => {
    const selected = tasks.find(
      (todo) => todo.id === id
    );

    setTask(selected.text);
    setEditingId(id);
  };

 const filteredTasks = tasks.filter((todo) => {
  switch (filter) {
    case FILTERS.ACTIVE:
      return !todo.completed;

    case FILTERS.COMPLETED:
      return todo.completed;

    default:
      return true;
  }
});

  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <TodoForm
        task={task}
        setTask={setTask}
        onSubmit={handleSubmit}
        editing={editingId}
      />

      <TodoStats tasks={tasks} />

      <TodoFilter
        filter={filter}
        setFilter={setFilter}
      />

      <TodoList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onToggle={handleToggle}
      />

    </Card>
  );
};

export default Todo;