import { CircularProgress } from "@mui/material";
import useAuth from "@src/hooks/useAuth";
import { Footer } from "@src/layout/components";
import clsx from "clsx";
import React, { createContext, ReactNode, useState } from "react";
import { Sidebar, Header } from "../components/advertisementAdmin";
import AuthGuard from "@src/guards/AuthGuard";
import styles from "./styles.module.scss";

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

function AdvertisementAdminLayout(props: LayoutProps) {
    const [pageTitle, setPageTitle] = useState<string>("");
    const [showOnlyTitle, setShowOnlyTitle] = useState(false);
    // const {isUserLoading} = useAuth();
    const [profileImage , setProfileImage] = useState<File|undefined>();

    return (
        <div id="dashboard" className="dashboard page">

               <div className={styles['advertisement-admin-sidebar_menu']}>
                   <Sidebar />
               </div>

            <div className={clsx("flex flex-col min-h-screen w-full",styles['advertisement-admin-main_content'])}>
               <div style={{position : "fixed",width : "inherit"}}>
                   <Header  />
               </div>
                <main className="flex-grow bg-white" style={{paddingTop : "64px"}}>
                    {/*<IcarusContext.Provider>*/}
                        {/*{*/}
                        {/*    isUserLoading ?  <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">*/}
                        {/*        <CircularProgress color="primary" />*/}
                        {/*    </div> :  props.children*/}
                        {/*}*/}
                        {props.children}
                    {/*</IcarusContext.Provider>*/}
                </main>
            </div>
        </div>
    );
}


const withAuth = (props: LayoutProps) => (
    <>
        <AdvertisementAdminLayout {...props} />
    </>
)

export default withAuth;
