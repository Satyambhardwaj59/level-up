import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const TodoForm = ({
  task,
  setTask,
  onSubmit,
  editing,
}) => {
  return (
    <div className="flex gap-3 mb-8">
      <Input
        value={task}
        onChange={(e) =>
          setTask(e.target.value)
        }
        placeholder="Enter task..."
      />

      <Button onClick={onSubmit}>
        {editing ? "Update" : "Add"}
      </Button>
    </div>
  );
};

export default TodoForm;