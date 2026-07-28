const Section = ({ title, children }) => {
  return (
    <section className="max-w-6xl mx-auto py-16">
      <h2 className="text-4xl font-bold mb-10 text-center">
        {title}
      </h2>

      {children}
    </section>
  );
};

export default Section;