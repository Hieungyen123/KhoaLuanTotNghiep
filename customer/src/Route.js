import Home from "./Page/HomePage/Home"
import Search from "./Page/Search/Search"
import Login from "./Page/Login/Login"
import Register from "./Page/Register/Register"
import ProductDetail from "./Page/ProductDetail/ProductDetail"
import CartDetail from "./Page/CartDetail/CartDetail"
import ProductCategory from "./Page/productCategory/ProductCategory"
export const MainRoute = [
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/search",
        element: <Search />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/product/:id",
        element: <ProductDetail />
    },
    {
        path: "/cartdetail",
        element: <CartDetail />
    },
    {
        path: "/product-category/:id",
        element: <ProductCategory />
    },
]
export const NavRoute = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/*",
        element: () => (<div>404</div>)
    },
]
export const EmptyRoute = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/*",
        element: () => (<div>404</div>)
    },
]