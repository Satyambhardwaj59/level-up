import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCode,
} from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-gray-50 py-20" id="about">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-indigo-600 font-semibold uppercase tracking-widest">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Learn by Building Real Projects
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            We believe the best way to learn web development is by building
            practical applications. Our courses focus on real-world projects
            that help you become job-ready with modern technologies.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800"
              alt="Programming"
              className="rounded-2xl shadow-xl"
            />
          </div>

          {/* Right Content */}
          <div>

            <h3 className="text-3xl font-bold mb-6">
              Why Choose Us?
            </h3>

            <p className="text-gray-600 leading-8">
              Our platform provides structured learning paths, practical
              coding challenges, and project-based tutorials that help you
              understand development from the ground up.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">

              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaReact className="text-4xl text-sky-500 mb-4" />
                <h4 className="font-bold text-xl mb-2">
                  React Development
                </h4>
                <p className="text-gray-600">
                  Learn Hooks, Routing, State Management, APIs, and more.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaNodeJs className="text-4xl text-green-600 mb-4" />
                <h4 className="font-bold text-xl mb-2">
                  Backend Development
                </h4>
                <p className="text-gray-600">
                  Build REST APIs using Node.js, Express, and MongoDB.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaDatabase className="text-4xl text-orange-500 mb-4" />
                <h4 className="font-bold text-xl mb-2">
                  Database
                </h4>
                <p className="text-gray-600">
                  Learn MongoDB, Mongoose, schema design, and CRUD operations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaCode className="text-4xl text-purple-600 mb-4" />
                <h4 className="font-bold text-xl mb-2">
                  Hands-on Projects
                </h4>
                <p className="text-gray-600">
                  Build portfolio-ready applications with industry best
                  practices.
                </p>
              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 text-center">

              <div>
                <h2 className="text-3xl font-bold text-indigo-600">
                  50K+
                </h2>
                <p className="text-gray-600">
                  Students
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-indigo-600">
                  100+
                </h2>
                <p className="text-gray-600">
                  Projects
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-indigo-600">
                  4.9★
                </h2>
                <p className="text-gray-600">
                  Rating
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;