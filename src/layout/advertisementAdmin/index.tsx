import { CircularProgress } from "@mui/material";
import useAuth from "@src/hooks/useAuth";
import { Footer } from "@src/layout/components";
import clsx from "clsx";
import React, { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { Sidebar, Header } from "../components/advertisementAdmin";
import AuthGuard from "@src/guards/AuthGuard";
import styles from "./styles.module.scss";
import Arrow from '@images/ic-arrow-prev.png';
import Image from "next/image";
import ArrowBack from "@src/components/icons/ArrowBack";
import Head from "next/head";

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


    const [expanded, setExpanded] = useState(false);
    const windowWidth = useRef(window.innerWidth);

    useEffect(() => {

        const handleExpande = () => {
            const shouldBeExpanded = windowWidth.current >= 1024
            if(expanded == shouldBeExpanded) return;
            setExpanded(shouldBeExpanded);
        }


        window.addEventListener('resize', handleExpande)
        return () => {
            window.removeEventListener('resize', handleExpande)
        }
    },[windowWidth.current]);

    return (
        <div id="dashboard" className={clsx("dashboard page " , expanded && 'sidebar-expanded')}>
            <Head>
                <title>이카루스 광고주 어드민</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <div className={styles['advertisement-admin-sidebar_menu']}>
                <Sidebar />
            </div>
            <div className={clsx("flex flex-col min-h-screen",styles['advertisement-admin-main_content'])}>
               <div style={{position : "fixed",width : "inherit",zIndex : 1}}>
                   <Header  />

                    <button
                        className={clsx(
                            "absolute top-4 -left-4 bg-admin-primary border-5 border-[#F8FBFF]",
                            "h-8 w-8 rounded-full pt-1 cursor-pointer lg",
                            expanded ?  "pl-1" : "pl-[5px]"
                        )}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <ArrowBack
                            className={clsx(
                                "transform transition duration-300 ease-in-out" ,
                                expanded ? "rotate-0" : "rotate-180"
                            )}
                            background="#F8FBFF"
                            width={14}
                            height={14}
                            handleAction={() => {}}
                        />
                    </button>
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
