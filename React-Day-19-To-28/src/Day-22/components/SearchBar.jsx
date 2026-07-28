import {
    useRef,
    useEffect,
    useCallback
} from "react";

import debounce from "../utils/debounce";


const SearchBar = ({
    setSearch
}) => {


    const inputRef = useRef(null);


    // Focus input when component loads

    useEffect(() => {

        inputRef.current.focus();

    }, []);



    const handleSearch = useCallback(

        debounce((value) => {

            setSearch(value);

        }, 500),

        [setSearch]

    );



    return (

        <input

            ref={inputRef}

            type="text"

            placeholder="Search Github user..."

            onChange={(e) =>
                handleSearch(e.target.value)
            }

            className="
border
rounded-lg
px-4
py-2
w-full
focus:ring-2
focus:ring-blue-500
"

        />

    );


};


export default SearchBar;