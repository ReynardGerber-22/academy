import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";

export const MainLayout = () => {
    return ( 
    <div>
        <Header />
        <Outlet></Outlet>
    </div>
    )
}