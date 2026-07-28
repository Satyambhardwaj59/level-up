const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 hover:shadow-xl transition">
      <h2 className="text-xl font-semibold">
        {skill}
      </h2>
    </div>
  );
};

export default SkillCard;