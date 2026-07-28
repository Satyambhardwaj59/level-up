import { Link } from "react-router-dom";


const Projects = () => {


    const projects = [
        {
            id: 1,
            title: "Doctor Booking App"
        },
        {
            id: 2,
            title: "LMS Platform"
        }
    ];


    return (

        <div className="p-10">


            <h1 className="text-4xl">
                Projects
            </h1>


            {
                projects.map(project => (

                    <div key={project.id}>

                        <h2>
                            {project.title}
                        </h2>


                        <Link
                            to={`/blog/${project.id}`}
                            className="text-blue-600"
                        >
                            Read Details
                        </Link>


                    </div>

                ))

            }


        </div>

    )

}


export default Projects;