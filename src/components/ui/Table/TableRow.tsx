import React from 'react'

function TableRow() {
  return (
        <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">How are you</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Ashim</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Technology</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-1.5">
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">Zustand</span>
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">Zustand</span>
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">Zustand</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">Draft</span>
              </td>
              <td className="px-6 py-4 text-lg text-gray-500">
                {new Date("2023-07-18T14:30:00Z").toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-lg font-medium flex justify-center relative">
                {/* <BsThreeDotsVertical className="hover:cursor-pointer"/> */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
        </tr>
  )
}

export default TableRow