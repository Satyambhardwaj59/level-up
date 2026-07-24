const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🚀 Learn React with Hands-on Projects
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build Modern
            <span className="text-yellow-300"> React Applications </span>
            Faster Than Ever
          </h1>

          <p className="mt-6 text-lg text-gray-100 max-w-xl">
            Master React by building real-world projects. Learn Hooks,
            Components, Routing, State Management, API Integration, and more
            with practical examples.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </button>

            <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition">
              Learn More
            </button>
          </div>

          <div className="mt-10 flex justify-center lg:justify-start gap-8">
            <div>
              <h2 className="text-3xl font-bold">50K+</h2>
              <p className="text-gray-200">Students</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">100+</h2>
              <p className="text-gray-200">Projects</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">4.9★</h2>
              <p className="text-gray-200">Rating</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700"
            alt="Developer"
            className="rounded-2xl shadow-2xl w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;