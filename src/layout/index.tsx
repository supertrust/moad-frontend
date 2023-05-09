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
      <div className="sidebar_menu">
        <Sidebar msg={setMsg} />
      </div>
      <div className="main_content">
        <Header text={text} />
        <main>{props.children}</main>
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
