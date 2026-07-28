import TodoItem from "./TodoItem";

const TodoList = ({
  tasks,
  onDelete,
  onEdit,
  onToggle,
}) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;