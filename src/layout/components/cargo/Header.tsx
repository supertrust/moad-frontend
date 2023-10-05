import { Skeleton } from "@mui/material";
import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from '@src/hooks/useAuth';
import { Button } from '@src/components/common';
import { getFileUrl } from '@src/helpers';
import { styles } from '@src/components/pages/cargo';
import { clsx } from "clsx";

interface HeaderProps {
    text: string;
    profileImage?: File
    onlyTitle?: boolean
}

function Header(props: HeaderProps) {
    const { text, profileImage , onlyTitle } = props;
    const { logout, user, isUserLoading } = useAuth();
    const [showMobileNav, setShowMobileNav] = useState(false);
    const router = useRouter();

    function toggle() {
        setShowMobileNav(!showMobileNav);
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            // console.error('Error logging out:', error);
        }
    };


    return (
        <div className="border-[#F5F7FB] border-b-[5px] py-2">
            <div className={clsx('flex items-center px-[20px] pt-[20px] mb-[8px]', onlyTitle ? 'justify-center' :  'justify-between' )}>
                <h1 className={clsx('logo-wrap', onlyTitle && 'hidden')}>
                    <Link href='/dashboard' className='link'>
                        <Image
                            src='/assets/images/icons/cargo_logo.png'
                            alt=''
                            width={39}
                            height={28}
                        />
                    </Link>
                </h1>
                <div className="text-[18px] font-semibold">{text}</div>
                <div className={clsx('right-wrap flex gap-2 items-center', onlyTitle && 'hidden')}>
                    <Link href='#'>
                        <Image  src={'/images/bell_icon.png'}
                            alt=''
                            className='img'
                            width={24}
                            height={24}
                        />
                    </Link>
                    {/* <Link href='/dashboard/my-info' className=''>
                    {
                                        isUserLoading ? <Skeleton variant="circular" width={40} height={40}/> :
                                            <Image
                                                src={user?.image || '/images/account_circle.png'}
                                                alt=''
                                                className='img rounded-full w-[30px] h-[30px]'
                                                width={30}
                                                height={30}
                                            />
                                    }
                    </Link> */}
                    
                </div>
            </div>
        </div>
    );
}

export default Header;
