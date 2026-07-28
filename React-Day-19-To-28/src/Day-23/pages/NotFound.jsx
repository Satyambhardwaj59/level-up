import { Link } from "react-router-dom";


const NotFound = () => {


    return (

        <div className="text-center p-10">


            <h1 className="text-5xl">
                404
            </h1>


            <p>
                Page Not Found
            </p>


            <Link to="/">
                Go Home
            </Link>


        </div>

    )

}


export default NotFound;