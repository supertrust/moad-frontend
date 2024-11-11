import useMediaQuery from "@mui/material/useMediaQuery";
import LogoPc from "@src/components/icons/LogoPc";
import useAuth from "@src/hooks/useAuth";
import clsx from "clsx";

function Footer() {

    const isMobile = useMediaQuery('(max-width:1023px)');
    const { dictionary : { footer}} = useAuth();

    return (
        <div className={'flex flex-col px-[20px] lg:px-[60px] py-[36px] lg:py-10 border-t border-[#cfd2db] mt-3 lg:mt-[48px]'} style={{ width: '100%' }}>
            <LogoPc height={!isMobile ? "38" : "20"} width={!isMobile ? "121" : "64"}/>
            <div className={clsx('flex flex-col gap-1 pb-4 lg:pb-6 pt-7 lg:pt-8 text-sm lg:text-base text-[#2b303b]')}>
         <span className={'font-semibold lg:font-normal'}>
              {footer?.first1} {isMobile? <br/> :<span className={'px-1'}>|</span>}  {footer?.first2}
         </span>
                <span  className={'font-semibold lg:font-normal'}>
              {footer?.second}
          </span>
                <span  className={'font-semibold lg:font-normal'}>
             {footer?.third1} {isMobile? <br/> :<span className={'px-1'}>|</span>}  {footer?.third2}  <a href="mailto:cs@moad.live?subject=MOAD 문의 메일입니다.">
                    <span className={"text-[#2b303b] text-sm lg:text-base font-semibold lg:font-normal"}> cs@moad.live </span></a>
          </span>
            </div>
            <div className={'text-sm text-[#717784] '}>
                © 2024 MOAD. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;
