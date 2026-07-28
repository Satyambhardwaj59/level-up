import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SkillCard from "./components/SkillCard";
import ProjectCard from "./components/ProjectCard";
import Section from "./components/Section";
import Footer from "./components/Footer";

import { skills, projects } from "./utils/data";

function Home() {
  return (
    <>
      <Navbar />

      <Hero
        name="Satyam Kumar"
        role="Frontend Developer | React Developer"
        available={true}
      />

      <Section title="Skills">

        <div
          id="skills"
          className="grid md:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
            />
          ))}
        </div>

      </Section>

      <Section title="Projects">

        <div
          id="projects"
          className="grid md:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tech={project.tech}
            />
          ))}
        </div>

      </Section>

      <Footer />
    </>
  );
}

export default Home;