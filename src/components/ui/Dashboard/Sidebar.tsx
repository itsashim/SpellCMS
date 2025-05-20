import { Link } from 'react-router'
import { MdSpaceDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from '../../../context/AuthContext';
import { TbCategoryPlus } from "react-icons/tb";


function Sidebar() {
    const {logout} = useAuth();
  return (
    <aside className='row-span-2 text-white w-64 bg-gray-50'>
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
                    Category</Link>
                </li>
            </ul>
            <button onClick={logout} className='sidebar-link w-full'><IoLogOut />Logout</button>
        </nav>
    </aside>
  )
}

export default Sidebar