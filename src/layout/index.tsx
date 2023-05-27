import React, { ReactNode, useState } from "react";
import { Footer, Header, Sidebar } from "./components";
import AuthGuard from "@src/guards/AuthGuard";

interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {
  const [text, setText] = useState("");

  const setMsg = (msgTxt: string) => {
    console.log(setText(msgTxt), "yes, I am calling");
  }

  return (
    <div id="dashboard" className="dashboard page">
      <div className="sidebar_menu only-pc">
        <Sidebar msg={setMsg} />
      </div>
      <div className="main_content flex flex-col min-h-screen">
        <Header text={text} />
        <main className="flex-grow">{props.children}</main>
        <Footer />
      </div>
    </div>
  );
}


const withAuth = (props: LayoutProps) => (
  <AuthGuard>
    <Layout {...props} />
  </AuthGuard>
)

export default withAuth;
