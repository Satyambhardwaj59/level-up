const Hero = ({ name, role, available }) => {
  return (
    <section
      id="home"
      className="text-center py-24 bg-gray-100"
    >
      <h1 className="text-5xl font-bold">
        Hi, I'm {name}
      </h1>

      <p className="text-xl mt-4 text-gray-600">
        {role}
      </p>

      {available && (
        <span className="inline-block mt-6 px-5 py-2 bg-green-600 text-white rounded-full">
          ✅ Available for Work
        </span>
      )}
    </section>
  );
};

export default Hero;