import { useState } from "react";
import DashboardLayout from "../components/ui/Dashboard/DashboardLayout";
import { usePosts } from "../hooks/usePost";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router";
import DashboardTable from "../components/ui/Dashboard/DashboardTable";

function Dashboard() {
  const {data:posts = []} = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredPosts = posts.filter((post) => {
    // Search for Tag and Title
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter Status
      const statusMatch = statusFilter === "all" || post.status === statusFilter;
      // Filter Category
    const categoryMatch = categoryFilter === "all" || post.category === categoryFilter;

    return searchMatch && statusMatch && categoryMatch;
  });

  const filteredCategories: string[] = [];
    posts.forEach(post => {
      if (!filteredCategories.includes(post.category)) {
        filteredCategories.push(post.category);
      }
    });
  return (
    <DashboardLayout>
      <div className="flex flex-col-reverse gap-2.5 md:flex-row items-center max-w-[1600px] mx-auto justify-between mb-7">
        <div className="flex me-auto">
          <input
            className="form-input"
            type="text"
            placeholder="Search blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option disabled>Status</option>
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option disabled>Categories</option>
            <option value="all">All</option>
            {filteredCategories.map((category,index) => (
              <option key={index} value={category as string}>{category as string}</option>
            ))}
          </select>
        </div>
        <Link to="/create-post"  className='btn-create ms-auto'>
          <IoAddSharp className="text-2xl text-white"/>
          Create Post
        </Link>
      </div>
      <div className="rounded-lg border border-gray-200 shadow-sm max-w-[1600px] w-full mx-auto overflow-x-scroll">
          <DashboardTable data={filteredPosts}/>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard