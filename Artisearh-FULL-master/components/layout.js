import React from "react";
import Head from "next/head";
import SideBar from "../components/Sidebar";
import { useRouter } from "next/router";



const Layout = ({ children }) => {
//Hook de router 

  const router = useRouter();

  return (
    <>
      <Head>
        <title> Arti Search </title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {router.pathname === '/login' || router.pathname === '/nuevaCuenta' ? (
        <div className="bg-orange-200 min-h-screen flex flex-col justify-center">
          <div>
            {children}
          </div>
        </div>
      ) : (

     
      <div className="bg-white min-h-screen">
        <div className="flex min-h-screen">
          <SideBar />
          <main className="bg-white sm:w-2/3 xl:w-5/6 sm:min-h-screen p-5">
            {children}
          </main>
        </div>
      </div>
    )}
    </>
  );
};

export default Layout;
