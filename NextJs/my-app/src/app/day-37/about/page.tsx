export default function AboutPage() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold">
        About Me
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
        I'm a Full Stack Developer passionate about
        creating modern, scalable and user-friendly
        web applications.
      </p>

      <h2 className="mt-12 text-2xl font-bold">
        Technologies
      </h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-gray-100 px-4 py-2"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}