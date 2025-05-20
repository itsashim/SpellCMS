import AuthorsTableRow from '../components/ui/Authors/AuthorsTableRow'
import DashboardLayout from '../components/ui/Dashboard/DashboardLayout'
import { useAuthors } from '../hooks/useAuthors'

function Authors() {
    const {data:authors =[]} = useAuthors();
  return (
    <DashboardLayout>
      <div className="rounded-lg border border-gray-200 shadow-sm max-w-[1000px] mx-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-xl">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="table-head">id</th>
              <th className="table-head">Author Name</th>
              <th className="table-head">Avatar</th>
              <th className='table-head'>Bio</th>
              <th className='table-head text-left'>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 text-lg">
            
            {authors.map((author)=>{
                return <AuthorsTableRow data={author}/>
            })}

          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

export default Authors