import { useNavigate } from "react-router-dom";


const LandingPage = () => {


const navigate = useNavigate();


return (

<div className="p-10">


<h1 className="text-5xl font-bold">
Welcome Developer
</h1>


<button

onClick={() =>
navigate("/projects")
}

className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"

>
View Projects
</button>


</div>

)

}


export default LandingPage;