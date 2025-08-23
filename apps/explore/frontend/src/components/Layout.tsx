import { Outlet } from "react-router";
import { Header } from "./Header";
import Footer from "./Footer";

export const Layout = () => {
    return (
        <>
            <Header />
            <main className="e_Main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
