import CategoryTableRow from '../components/ui/Category/CategoryTableRow'
import DashboardLayout from '../components/ui/Dashboard/DashboardLayout'
import { useCategories } from '../hooks/useCategories'

function Category() {
    const {data:categories =[]} = useCategories();
  return (
    <DashboardLayout>
      <div className="rounded-lg border border-gray-200 shadow-sm max-w-[800px] mx-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-xl">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="table-head">id</th>
              <th className="table-head">Category Name</th>
              <th className="table-head flex justify-end">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 text-lg">
            {categories.map(category=>{
            return <CategoryTableRow key={category.id} data={category}/>
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

export default Category