import { 
  Drawer, 
  IconButton, 
  styled, 
  List, 
  ListItem, 
  ListItemButton
} from "@mui/material";
import useAuth from "@src/hooks/useAuth";
import { PageRouting } from "@src/utils/values";
import CloseIcon from '@mui/icons-material/Close';
import { Icon1, Icon2, Icon3, Icon4 } from "@src/components/icons";
import Link from "next/link";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  theme: any;
  text: any;
}

function MobileNav({ open, onClose, theme, text }: MobileNavProps) {
  const { logout, dictionary: { pageTitle, sidebar } } = useAuth();

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const handleLogout = async () => {
    onClose();
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right" className="side-content">
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <div className="inner-header-wrap"></div>
      <div className="side-menu-wrap d-flex flex-col justify-between h-[100%] w-[300px]">
        <List className="menu-wrap py-0">
          <ListItem className={`${text === pageTitle['top_bar_dashboard'] ? 'active' : ''} list-menu home`}>
            <ListItemButton className="p-0">
              <Link onClick={onClose} href={PageRouting.dashboard} className="link text-[14px] w-[100%]">
                <Icon1 selected={text === pageTitle['top_bar_dashboard']} />
                <div className="text !text-[#606060] ml-3">{sidebar.advertisementManagement}</div>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem className={`${text === pageTitle['top_bar_statistics'] ? 'active' : ''} list-menu statistics`}>
            <ListItemButton className="p-0">
              <Link onClick={onClose} href={PageRouting.statistics} className="link w-[100%]">
                <Icon2 selected={text === pageTitle['top_bar_statistics']} />
                <div className="text !text-[#606060] ml-3">{sidebar.statistics}</div>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem className={`${text === pageTitle['top_bar_my_page'] ? 'active' : ''} list-menu mypage`}>
            <ListItemButton className="p-0">
              <Link onClick={onClose} href={PageRouting.myInfo} className="link w-[100%]">
                <Icon3 selected={text === pageTitle['top_bar_my_page']} />
                <div className="text !text-[#606060] ml-3">{sidebar.myInfo}</div>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem
            className={`
              ${(text === pageTitle['top_bar_announcement'] 
                || text === pageTitle['top_bar_guide'] 
                || text === pageTitle['top_bar_faq'] 
                || text === pageTitle['top_bar_inquiry']
                || text === pageTitle['top_bar_policies_and_terms']) 
                  ? 'active' 
                  : ''} list-menu center d-block
            `}
          >
            <ListItemButton className="p-0">
              <Link onClick={onClose} href={PageRouting.notice} className="link w-[100%]">
                <Icon4 selected={text === sidebar.customerService} />
                <div className="text !text-[#606060] ml-3">{sidebar.customerService}</div>
              </Link>
            </ListItemButton>
            <List className="sub-wrap-menu p-0">
              <ListItem className="sub-list notice ml-[20px]">
                <ListItemButton className="py-0">
                  <Link onClick={onClose} href={PageRouting.notice} className={`${text === pageTitle['top_bar_announcement'] ? 'active' : '!text-[#606060]'} sub-link`}>{sidebar.notice}</Link>
                </ListItemButton>
              </ListItem>
              <ListItem className="sub-list guide ml-[20px]">
                <ListItemButton className="py-0">
                  <Link onClick={onClose} href={PageRouting.guide} className={`${text === pageTitle['top_bar_guide'] ? 'active' : '!text-[#606060]'} sub-link`}>{sidebar.guide}</Link>
                </ListItemButton>
              </ListItem>
              <ListItem className="sub-list faq ml-[20px]">
                <ListItemButton className="py-0">
                  <Link onClick={onClose} href={PageRouting.faq} className={`${text === pageTitle['top_bar_faq'] ? 'active' : '!text-[#606060]'} sub-link`}>{sidebar.faq}</Link>
                </ListItemButton>
              </ListItem>
              <ListItem className="sub-list inquire ml-[20px]">
                <ListItemButton className="py-0">
                  <Link onClick={onClose} href={PageRouting.inquire} className={`${text === pageTitle['top_bar_inquiry'] ? 'active' : '!text-[#606060]'} sub-link`}>{sidebar.inquiry}</Link>
                </ListItemButton>
              </ListItem>
              <ListItem className="sub-list terms ml-[20px]">
                <ListItemButton className="py-0">
                  <Link onClick={onClose} href={PageRouting.terms} className={`${text === pageTitle['top_bar_policies_and_terms'] ? 'active' : '!text-[#606060]'} sub-link`}>{sidebar.termsAndPolicies}</Link>
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
        <div className="side-logout d-flex align-items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
          <a onClick={handleLogout} className="logout-btn">
            <i className="ic-logout"></i>
            <div className="text-white">{sidebar.logout}</div>
          </a>
        </div>
      </div>
    </Drawer>
  );
}

export default MobileNav;