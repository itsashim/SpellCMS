import Sidebar from './Sidebar'
import { type ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}
function DashboardLayout({children}: DashboardLayoutProps) {
  return (
<div className="grid grid-cols-[auto_1fr] min-h-screen">
    <Sidebar />
  <main className="p-6 overflow-auto">
    <section className="mx-auto">
      {children}
    </section>
  </main>
</div>
  )
}

export default DashboardLayout