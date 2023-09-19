import { CircularProgress } from "@mui/material";
import useAuth from "@src/hooks/useAuth";
import React, { createContext, ReactNode, useState } from "react";
import { Footer, Header, Sidebar } from "./components";
import AuthGuard from "@src/guards/AuthGuard";

interface LayoutProps {
  children: ReactNode
}

interface IcarusContextType {
   pageTitle : string,
   setPageTitle :  (prevState: string) => void,
   setProfileImage: (image?: File) => void
}

export const IcarusContext = createContext<IcarusContextType | undefined>(undefined);

function Layout(props: LayoutProps) {
  const [pageTitle, setPageTitle] = useState<string>("");
  const {isUserLoading} = useAuth();
  const [profileImage , setProfileImage] = useState<File|undefined>();

  return (
    <div id="dashboard" className="dashboard page">
      <div className="sidebar_menu only-pc">
        <Sidebar msg={setPageTitle} />
      </div>
      <div className="main_content flex flex-col min-h-screen">
        <Header text={pageTitle} profileImage={profileImage} />
        <main className="flex-grow">
            <IcarusContext.Provider value={{ pageTitle,setPageTitle, setProfileImage}}>
                {
                    isUserLoading ?  <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                        <CircularProgress color="primary" />
                    </div> :  props.children
                }
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
