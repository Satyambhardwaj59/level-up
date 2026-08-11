import ProjectCard from "@/components/day-37/projects/ProjectCard";
import { projects } from "@/data/day-37/projects";

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold">
        My Projects
      </h1>

      <p className="mt-4 text-gray-600">
        Some projects I've built while learning
        full-stack development.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}