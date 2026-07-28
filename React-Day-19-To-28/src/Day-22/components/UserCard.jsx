const UserCard = ({ user }) => {


    return (

        <div
            className="
bg-white
shadow
rounded-xl
p-5
"
        >


            <img

                src={user.avatar_url}

                alt={user.login}

                className="
w-24
h-24
rounded-full
mx-auto
"

            />


            <h2
                className="
text-center
font-bold
mt-3
"
            >

                {user.login}

            </h2>


            <a

                href={user.html_url}

                target="_blank"

                className="
block
text-center
text-blue-600
mt-2
"

            >

                View Profile

            </a>


        </div>


    )

}


export default UserCard;