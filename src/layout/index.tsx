import React, { createContext, ReactNode, useState } from "react";
import { Footer, Header, Sidebar } from "./components";
import AuthGuard from "@src/guards/AuthGuard";

interface LayoutProps {
  children: ReactNode
}

interface IcarusContextType {
   pageTitle : string,
   setPageTitle :  (prevState: string) => void
}

export const IcarusContext = createContext<IcarusContextType | undefined>(undefined);

function Layout(props: LayoutProps) {
  const [pageTitle, setPageTitle] = useState<string>("");

  return (
    <div id="dashboard" className="dashboard page">
      <div className="sidebar_menu only-pc">
        <Sidebar msg={setPageTitle} />
      </div>
      <div className="main_content flex flex-col min-h-screen">
        <Header text={pageTitle} />
        <main className="flex-grow">
            <IcarusContext.Provider value={{ pageTitle,setPageTitle}}>
                {props.children}
            </IcarusContext.Provider>
        </main>
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
