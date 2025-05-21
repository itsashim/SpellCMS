import { BsThreeDotsVertical } from "react-icons/bs"
import type { Authors } from "../../../api/authors"
import { useState } from "react";
import { Link } from "react-router";
import { useDeleteAuthor } from "../../../hooks/useAuthors";

interface AuthorTableProps {
    data: Authors;
}

function AuthorsTableRow({data}:AuthorTableProps) {
    const [curId, setCurId] = useState<string | null>(null);
    const handleAction = (id: string) => {
    setCurId((prev) => (prev == id ? null : id));
    };
    const {mutate} = useDeleteAuthor()

    // Delete Author
    const handleDelete = (id:string) =>{
        mutate(id);
    }
  return (
    <tr className="hover:bg-gray-50 transition-colors relative">
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{data.id}</td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{data.name}</td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
            <img className="w-16" src={data.avatar} alt={data.name} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{data.bio}</td>
        <td className="px-6 py-4 text-lg font-medium relative">
        <BsThreeDotsVertical onClick={() => handleAction(data.id)} className="hover:cursor-pointer ms-auto"/>
        {data.id === curId && (
            <div className="absolute top-17 right-0 bg-white rounded-sm border border-gray-200 shadow-sm z-10 w-28">
                <ul className="text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link to={`/authors/edit/${curId}`}>Edit</Link>
                    </li>
                    <li onClick={()=>handleDelete(data.id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Delete
                    </li>
                </ul>
            </div>
        )}
        </td>
    </tr>
  )
}

export default AuthorsTableRow