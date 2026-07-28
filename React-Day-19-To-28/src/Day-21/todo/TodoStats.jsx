const TodoStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(
    (t) => t.completed
  ).length;

  return (
    <div className="flex justify-between my-6 font-semibold">
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Pending: {total - completed}</p>
    </div>
  );
};

export default TodoStats;