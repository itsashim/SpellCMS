import { useState, } from "react";
import { type Post } from "../../../api/posts";
import { BsThreeDotsVertical } from "react-icons/bs";
import dayjs from "dayjs";
import { useDeletePost } from "../../../hooks/usePost";

interface PostTableRowProps {
  data: Post;
}

function PostTableRow({ data }: PostTableRowProps) {
  const [curId, setCurId] = useState<string | null>(null);
  const handleAction = (id: string) => {
    setCurId((prev) => (prev === id ? null : id));
  };

  const {mutate:deletePost} = useDeletePost()
  const handleDelete = (id:string)=>{
    deletePost(id);
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors relative">
        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        {data.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        {data.title.length < 40 ? data.title : ` ${data.title.substring(0, 20)}...`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
        {data.author}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
        {data.category}
      </td>
      <td className="px-6 py-4 gap-2 flex flex-wrap items-center">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-sm rounded-full ${data.status == "draft" ? "bg-yellow-100 text-yellow-800": "bg-green-100 text-green-800"}`}>
          {data.status}
        </span>
      </td>
      <td className="px-6 py-4 text-lg text-gray-500">
        {dayjs(data.createdAt).format("MMM D, YYYY h:mm A")}
      </td>

      <td className="px-6 py-4 text-lg font-medium flex justify-center relative">
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
                Edit
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {data.status === "draft" ? "Published" : "Draft"}
              </li>
              <li onClick={()=> handleDelete(data.id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Delete
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
}

export default PostTableRow;
