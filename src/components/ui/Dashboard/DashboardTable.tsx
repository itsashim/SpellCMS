import type { Post } from "../../../api/posts"
import PostTableRow from "./PostTableRow"

function DashboardTable({data}) {
  return (
        <table className="max-w-[100%] divide-y divide-gray-200 bg-white text-xl">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="table-head">Id</th>
              <th className="table-head">Title</th>
              <th className="table-head">Author</th>
              <th className="table-head">Category</th>
              <th className="table-head">Tags</th>
              <th className="table-head">Status</th>
              <th className="table-head">Created At</th>
              <th className="table-head">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 text-lg">
            {data.map((post:Post)=>{
              return <PostTableRow key={post.id} data={post}/>
            })}
          </tbody>
        </table>
  )
}

export default DashboardTable