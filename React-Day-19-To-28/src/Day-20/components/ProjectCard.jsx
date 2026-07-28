const ProjectCard = ({ title, description, tech }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

      <p className="mt-4 font-medium">
        Tech: {tech}
      </p>
    </div>
  );
};

export default ProjectCard;