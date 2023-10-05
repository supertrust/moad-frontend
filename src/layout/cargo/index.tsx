import { CircularProgress } from "@mui/material";
import useAuth from "@src/hooks/useAuth";
import React, { createContext, ReactNode, useState } from "react";
import { Footer, Header } from "../components/cargo";
import AuthGuard from "@src/guards/AuthGuard";

interface LayoutProps {
  children: ReactNode
}

interface IcarusContextType {
   pageTitle : string,
   setPageTitle :  (prevState: string) => void,
   setProfileImage: (image?: File) => void,
   setShowOnlyTitle: (show: boolean) => void
}

export const IcarusContext = createContext<IcarusContextType | undefined>(undefined);

function CargoLayout(props: LayoutProps) {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [showOnlyTitle, setShowOnlyTitle] = useState(false);
  const {isUserLoading} = useAuth();
  const [profileImage , setProfileImage] = useState<File|undefined>();

  return (
    <div id="cargo-dashboard" className="dashboard page">
      <div className="cargo_content flex flex-col min-h-screen">
        <Header text={pageTitle} profileImage={profileImage} onlyTitle={showOnlyTitle} />
        <main className="flex-grow mb-[80px]">
            <IcarusContext.Provider value={{ pageTitle,setPageTitle, setProfileImage , setShowOnlyTitle}}>
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
    <CargoLayout {...props} />
  </AuthGuard>
)

export default withAuth;
