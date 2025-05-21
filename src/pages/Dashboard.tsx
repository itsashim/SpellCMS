import { useState } from "react";
import DashboardLayout from "../components/ui/Dashboard/DashboardLayout";
import { usePosts } from "../hooks/usePost";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router";
import DashboardTable from "../components/ui/Dashboard/DashboardTable";
import FilterComponent from "../components/ui/Dashboard/FilterComponent";  // Adjust path as needed

function Dashboard() {
  const { data: posts = [] } = usePosts();
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
  posts.forEach((post) => {
    if (!filteredCategories.includes(post.category)) {
      filteredCategories.push(post.category);
    }
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col-reverse gap-2.5 md:flex-row items-center max-w-[1600px] mx-auto justify-between mb-7">
          <FilterComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={filteredCategories}
          />
        <Link to="/create-post" className="btn-create ms-auto">
          <IoAddSharp className="text-2xl text-white" />
          Create Post
        </Link>
      </div>
      <div className="rounded-lg border border-gray-200 shadow-sm max-w-[1600px] w-full mx-auto overflow-x-scroll">
        <DashboardTable data={filteredPosts} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
