import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {


    const isLoggedIn = true;


    if (!isLoggedIn) {

        return (
            <Navigate to="/" />
        )

    }


    return children;


}


export default ProtectedRoute;