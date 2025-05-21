import Sidebar from './Sidebar'
import { useState, type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { RxHamburgerMenu } from "react-icons/rx";


interface DashboardLayoutProps {
  children: ReactNode;
}
function DashboardLayout({children}: DashboardLayoutProps) {
  const [sidebarToggle,setSidebarToggle] = useState(false);
  return (
    <>
    <Toaster position="top-center" duration={2000}/>
    <div className="block md:grid grid-cols-[auto_1fr] min-h-screen">
      <Sidebar setOpen={setSidebarToggle} openSidebar={sidebarToggle}/>
      <main className="p-6">
        <section className="mx-auto">
            <RxHamburgerMenu onClick={()=> setSidebarToggle((toggle)=>!toggle)}  className='text-3xl mb-2 md:hidden'/>
          {children}
        </section>
      </main>
    </div>
    </>
  )
}

export default DashboardLayout