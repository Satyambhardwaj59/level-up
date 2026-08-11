import { Project } from "@/types/day-37";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="rounded-xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h2 className="text-xl font-bold">
        {project.title}
      </h2>

      <p className="mt-3 text-gray-600">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map(
          (technology) => (
            <span
              key={technology}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              {technology}
            </span>
          )
        )}
      </div>
    </article>
  );
}