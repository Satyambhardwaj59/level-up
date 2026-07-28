import { useParams } from "react-router-dom";


const BlogDetails = () => {


    const { id } = useParams();


    return (

        <div className="p-10">

            <h1>
                Blog Details
            </h1>


            <p>
                Blog ID : {id}
            </p>


        </div>

    )

}


export default BlogDetails;