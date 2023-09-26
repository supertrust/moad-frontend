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

interface HeaderProps {
    text: string;
    profileImage?: File
}

function Header(props: HeaderProps) {
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
        <div>
            <div
            className='flex items-center justify-between px-[20px] pt-[20px] mb-[8px]'>
                        <h1 className='logo-wrap'>
                            <Link href='/dashboard' className='link'>
                                <Image
                                    src='/assets/images/icons/cargo_logo.png'
                                    alt=''
                                    width={39}
                                    height={28}
                                />
                            </Link>
                        </h1>
                        <div className='right-wrap flex gap-2 items-center'>
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
