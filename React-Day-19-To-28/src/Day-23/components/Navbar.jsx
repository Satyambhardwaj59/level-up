import { NavLink } from "react-router-dom";


const Navbar = () => {


const navStyle = ({isActive}) =>
  
  isActive
  ? "text-blue-600 font-bold"
  : "text-gray-700";


return (

<nav className="flex justify-between p-5 shadow">


<h1 className="text-2xl font-bold">
Portfolio
</h1>


<ul className="flex gap-6">

<li>
<NavLink 
to="/"
className={navStyle}
>
Home
</NavLink>
</li>


<li>
<NavLink 
to="/about"
className={navStyle}
>
About
</NavLink>
</li>


<li>
<NavLink 
to="/projects"
className={navStyle}
>
Projects
</NavLink>
</li>


<li>
<NavLink 
to="/contact"
className={navStyle}
>
Contact
</NavLink>
</li>


</ul>


</nav>

)

}


export default Navbar;