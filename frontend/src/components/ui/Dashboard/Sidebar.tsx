import { Link } from 'react-router'
import { MdSpaceDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from '../../../context/AuthContext';
import { TbCategoryPlus } from "react-icons/tb";
import { IoMdPeople } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";


function Sidebar({openSidebar:open,setOpen}) {
    const {logout} = useAuth();
    console.log(open);
  return (
    <aside className={`z-10 transition-all duration-700 row-span-2 text-white w-64 bg-gray-50 md:relative md:right-0 fixed ${open ? "left-0": "right-full"}`}>
        <div className='text-xl  text-black absolute top-3.5 right-6 md:hidden'>
            <IoCloseSharp onClick={()=>setOpen((open)=> !open)} className='text-2xl'/>
        </div>
        <h4 className='text-dark-500 text-3xl text-center mt-7 font-medium'>SpellCMS</h4>
        <nav className='mt-10 mb-0'>
            <ul>
                <li className=''>
                   <Link className='sidebar-link' to="/"><MdSpaceDashboard />
                    Dashboard</Link>
                </li>
                <li className=''>
                   <Link className='sidebar-link' to="/category">
                   <TbCategoryPlus />
                    Category
                    </Link>
                </li>
                <li className=''>
                   <Link className='sidebar-link' to="/authors">
                   <IoMdPeople />
                        Authors
                    </Link>
                </li>
            </ul>
            <button onClick={logout} className='sidebar-link w-full'><IoLogOut />Logout</button>
        </nav>
    </aside>
  )
}

export default Sidebar