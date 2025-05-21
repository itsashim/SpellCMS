import { useState } from "react";
import DashboardLayout from "../components/ui/Dashboard/DashboardLayout";
import PostTableRow from "../components/ui/Dashboard/PostTableRow";
import { usePosts } from "../hooks/usePost";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router";


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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerSearch) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
    );
  });

  return (
    <DashboardLayout>
      <div className="flex max-w-[1600px] mx-auto justify-between mb-7">
        <div>
            <input className="form-input" type="text" placeholder="Search blog..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Link to="/create-post"  className='btn-create ms-auto'>
          <IoAddSharp className="text-2xl text-white"/>
          Create Post
        </Link>
      </div>
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
            {filteredPosts.map((post:Post)=>{
              return <PostTableRow key={post.id} data={post}/>
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard