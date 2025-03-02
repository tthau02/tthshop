import { Link, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
  {/* <!-- Sidebar --> */}
  <aside className="w-64 bg-gray-800 text-white flex flex-col">
    <div className="p-4 text-center bg-gray-900">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
    </div>
    <nav className="mt-5 flex-grow">
      <Link to="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Dashboard</Link>
      <Link to="categores" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Category</Link>
      <Link to="products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Products</Link>
      <Link to="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">User</Link>
      <Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Orders</Link>
      <Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Settings</Link>
    </nav>
    <div className="p-4 bg-gray-900 text-center">
      <button className="w-full py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  </aside>

  {/* <!-- Content Area --> */}
  <div className="flex-grow">
    {/* <!-- Navbar --> */}
    <header className="bg-white p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="px-4 py-2 border rounded-md" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Search</button>
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
      </div>
    </header>

    {/* <!-- Main Content --> */}
    <main className="p-6">
      <Outlet />
    </main>
  </div>
</div>

  )
}

export default AdminLayout