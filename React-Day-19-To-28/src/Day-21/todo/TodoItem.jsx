import Button from "../components/ui/Button";

const TodoItem = ({
  task,
  onDelete,
  onEdit,
  onToggle,
}) => {
  return (
    <div className="flex justify-between items-center border p-4 rounded-lg">

      <p
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed
            ? "line-through text-gray-400"
            : ""
        }`}
      >
        {task.text}
      </p>

      <div className="flex gap-2">

        <Button
          className="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </Button>

        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>

      </div>

    </div>
  );
};

export default TodoItem;