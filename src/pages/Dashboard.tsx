import DashboardLayout from "../components/ui/Dashboard/DashboardLayout";
import TableRow from "../components/ui/Table/TableRow";
// import { BsThreeDotsVertical } from "react-icons/bs";


function Dashboard() {
  return (
    <DashboardLayout>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-xl">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
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
            <TableRow/>
            <TableRow/>
            <TableRow/>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard