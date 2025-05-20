import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { type Category } from '../../../api/categories';
import { Link } from 'react-router';

interface CategoryTableRowProps {
  data: Category;
}
function CategoryTableRow({data}:CategoryTableRowProps) {
      const [curId, setCurId] = useState<string | null>(null);
      const handleAction = (id: string) => {
        setCurId((prev) => (prev === id ? null : id));
      };
  return (
        <tr className="hover:bg-gray-50 transition-colors relative">
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{data.id}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{data.name}</td>
            <td className="px-6 py-4 text-lg font-medium flex justify-end relative">
            <BsThreeDotsVertical
                onClick={() => handleAction(data.id)}
                className="hover:cursor-pointer"
            />
    
            {data.id === curId && (
                <div
                className="absolute top-8 right-0 bg-white rounded-sm border border-gray-200 shadow-sm z-10 w-28"
                >
                <ul className="text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to={`/category/edit/${curId}`}>
                        Edit
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Delete
                    </li>
                </ul>
                </div>
            )}
            </td>
        </tr>
  )
}

export default CategoryTableRow