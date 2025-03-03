import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ClientLayout from "./pages/layouts/ClientLayout"
import ProductDetail from "./pages/ProductDetail"
import AdminLayout from "./pages/layouts/AdminLayout"
import List from "./pages/admin/products/List"
import Add from "./pages/admin/products/Add"
import { Toaster  } from "react-hot-toast"
import Update from "./pages/admin/products/Update"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ListCategory from "./pages/admin/category/ListCategory"
import AddCategory from "./pages/admin/category/AddCategory"
import UpdateCategory from "./pages/admin/category/UpdateCategory"
import PrivateRoute from "./components/PrivateRoute"


function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<ClientLayout/>}>
          <Route index element={<Home />}/>
          <Route path="products" element={<Products />}/>
          <Route path="products/:id" element={<ProductDetail />}/>
          <Route path="sale" element={<h1>Khuyến mãi</h1>}/>
          <Route path="contact" element={<h1>Liên hệ</h1>}/>

          <Route path="register" element = {<Register/>}/>
          <Route path="login" element = {<Login/>}/>
        </Route>
        
        <Route element={<PrivateRoute/>}>
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="products" element={<List />}/> 
            <Route path="products/add" element={<Add />}/> 
            <Route path="products/update/:id" element={<Update />}/> 

            <Route path="categores" element={<ListCategory />}/> 
            <Route path="categores/add" element={<AddCategory />}/> 
            <Route path="categores/update/:id" element={<UpdateCategory />}/> 
          </Route>
        </Route>

        <Route path="*" element={<h1>Not Fount</h1>} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App
