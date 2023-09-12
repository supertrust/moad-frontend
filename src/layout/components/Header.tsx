import { Skeleton } from "@mui/material";
import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import MobileNav from './MobileNav';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from '@src/hooks/useAuth';
import { Button } from '@src/components/common';
import { getFileUrl } from '@src/helpers';

interface HeaderProps {
    text: string;
}

function Header(props: HeaderProps) {
    const { logout, user, isUserLoading } = useAuth();
    // console.log(props.text);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const router = useRouter();

    function toggle() {
        setShowMobileNav(!showMobileNav);
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    console.log('user',user);

    return (
        <div className='inner-header-wrap'>
            <div id='inner_header' className='inner-header'>
                <div className='only-pc'>
                    <div className='header-pc'>
                        <div className='header-title'>
                            {!props.text ? '광고관리' : props.text}
                        </div>
                        <div className='my-info'>
                            <div className='info-wrap'>
                                <Dropdown className='drop-btns'>
                                    <Dropdown.Toggle
                                        id='dropdown-basic'
                                        className='d-flex items-center	'>
                                        <div className='my-photo'>
                                            {
                                                isUserLoading ? <Skeleton variant="circular" width={40} height={40}/> :
                                                    <Image
                                                        src={user?.image || '/images/account_circle.png'}
                                                        alt=''
                                                        className='img rounded-full w-[36px] h-[36px]'
                                                        width={40}
                                                        height={40}
                                                    />
                                            }
                                        </div>
                                        <div className='my-company'>
                                            <div className='company-name'>
                                                {user?.company_name ? user?.company_name :
                                                <Skeleton variant={"text"} width = {110}  sx={{ fontSize: "1rem",
                                                margin : "auto"}}
                                                />}

                                            </div>
                                            <div className='email'>
                                                {isUserLoading ? <Skeleton variant="text" width={135}
                                                                           sx={{ fontSize: '12px' }}/> : user?.email}
                                            </div>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => router.push('/dashboard/my-info')}>
                                            Edit Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={handleLogout}
                                            className='logout-danger'>
                                            Log Out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='only-mb'>
                    <div className='header-mb'>
                        <h1 className='logo-wrap'>
                            <Link href='/dashboard' className='link'>
                                <Image
                                    src='/assets/images/icons/logo-mb.svg'
                                    alt=''
                                    width={120}
                                    height={50}
                                />
                            </Link>
                        </h1>
                        <div className='util-wrap'>
                            <Link href='/dashboard/my-info' className=''>
                                <Image
                                    src={
                                        user?.image
                                            ? getFileUrl(user?.image)
                                            : '/images/account_circle.png'
                                    }
                                    alt=''
                                    className='rounded-full object-cover w-[30px] h-[30px]'
                                    width={30}
                                    height={30}
                                />
                            </Link>
                            <Button
                                onClick={toggle}
                                type='button'
                                id='side_mb_btn'
                                className={showMobileNav ? 'side-close' : 'side-mb-btn'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                id='side_mb'
                className={`side-mb ${showMobileNav ? 'block' : 'hidden'}`}>
                {showMobileNav ? <MobileNav/> : null}
            </div>
        </div>
    );
}

export default Header;
