import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import css from "./Layout.module.css";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
