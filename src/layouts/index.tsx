import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { store } from "@/redux/store";
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

import { Inter } from "next/font/google";
import NotVerified from "@/components/NotVerified";
const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export default function Layouts({ children }: Props) {
  return (
    <Provider store={store}>
      <div className={`${inter.className} text-slate-500`}>
        <Navbar />
        <main>{children}</main>
        <NotVerified />
        {/* <footer>Footer</footer> */}
      </div>
    </Provider>
  );
}
