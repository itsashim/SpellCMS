import DashboardLayout from "../components/ui/Dashboard/DashboardLayout";
import PostTableRow from "../components/ui/Dashboard/PostTableRow";
import { usePosts } from "../hooks/usePost";
import CreateBtn from "../components/CreateBtn";


interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  content: string;
  coverImage?: string;
}

function Dashboard() {
  const {data:posts = []} = usePosts();
  return (
    <DashboardLayout>
      <CreateBtn width="1600px" to="/create-post" ariaLabel="Create new post">
        Create Post
      </CreateBtn>
      <div className="rounded-lg border border-gray-200 shadow-sm max-w-[1600px] mx-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-xl">
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
            {posts.map((post:Post)=>{
              return <PostTableRow key={post.id} data={post}/>
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard