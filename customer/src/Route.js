import Home from "./Page/HomePage/Home"
import Search from "./Page/Search/Search"
import Login from "./Page/Login/Login"
import Register from "./Page/Register/Register"
import ProductDetail from "./Page/ProductDetail/ProductDetail"
import CartDetail from "./Page/CartDetail/CartDetail"
import ProductCategory from "./Page/productCategory/ProductCategory"
import ProductSubcate from "./Page/ProductSubcate/ProductSubcate"
import DoneChecKout from "./Page/DoneChecKout/DoneChecKout"
import SearchProducts from "./Page/SearchProducts/SearchProducts"
import DetailBlog from "./Page/DetailBlog/DetailBlog"
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
    {
        path: "/product-subcategory/:id",
        element: <ProductSubcate />
    },
    {
        path: "/done-checkout",
        element: <DoneChecKout />
    },
    {
        path: "/search/:keyword",
        element: <SearchProducts />
    },
    {
        path: "/blog/:id",
        element: <DetailBlog />
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