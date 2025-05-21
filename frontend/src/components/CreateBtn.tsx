import type { ReactNode } from 'react';
import { IoAddSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

interface CreateBtnProps {
  children: ReactNode;
  to: string;
  ariaLabel: string;
  width: string;
}
function CreateBtn({children,to,ariaLabel,width}: CreateBtnProps) {
  return (
    <div className={`mx-auto mb-7 max-w-[${width}]`}>
        <Link to={to} aria-label={ariaLabel} className='btn-create ms-auto'>
          <IoAddSharp className="text-2xl text-white"/>
          {children}
        </Link>
    </div>
  )
}

export default CreateBtn