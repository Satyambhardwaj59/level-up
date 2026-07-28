import { useEffect, useState } from "react";
import axios from "axios";


const useGithubUsers = (username) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {

        if (!username) {
            setUsers([]);
            return;
        }


        const fetchUsers = async () => {

            try {

                setLoading(true);
                setError("");


                const response = await axios.get(
                    `https://api.github.com/search/users?q=${username}`
                );


                setUsers(response.data.items);


            } catch (error) {

                setError(
                    "Failed to fetch users"
                );

            }
            finally {

                setLoading(false);

            }

        };


        fetchUsers();


    }, [username]);


    return {
        users,
        loading,
        error
    };

};


export default useGithubUsers;