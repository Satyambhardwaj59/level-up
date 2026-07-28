import {
    useState,
    useMemo,
    useCallback
} from "react";


import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

import useGithubUsers from "./hooks/useGithubUsers";



function Home() {


    const [
        search,
        setSearch
    ] = useState("");



    const {
        users,
        loading,
        error
    } = useGithubUsers(search);



    // Memoized filtering

    const filteredUsers = useMemo(() => {


        return users.filter(
            (user) =>
                user.login
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );


    }, [users, search]);



    // Memoized function

    const handleSearch = useCallback(
        (value) => {

            setSearch(value);

        },
        []
    );



    return (

        <div
            className="
max-w-5xl
mx-auto
p-10
"
        >


            <h1
                className="
text-4xl
font-bold
text-center
mb-8
"
            >

                Github User Search

            </h1>



            <SearchBar
                setSearch={handleSearch}
            />



            {
                loading &&
                <Loader />
            }



            {
                error &&
                <ErrorMessage
                    message={error}
                />
            }



            <div
                className="
grid
md:grid-cols-3
gap-6
mt-10
"
            >


                {
                    filteredUsers.map(user => (

                        <UserCard

                            key={user.id}

                            user={user}

                        />

                    ))

                }


            </div>



        </div>

    )


}


export default Home;