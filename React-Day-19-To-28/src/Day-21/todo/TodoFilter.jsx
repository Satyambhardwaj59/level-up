import Button from "../components/ui/Button";
import { FILTER_OPTIONS } from "./constants";

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center gap-4 my-6">
      {FILTER_OPTIONS.map((item) => (
        <Button
          key={item}
          onClick={() => setFilter(item)}
          className={
            filter === item
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 hover:bg-gray-700"
          }
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default TodoFilter;