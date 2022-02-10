import { Popper } from '@mui/material';
import { AccountCircleOutlined, AccountCircleSharp, LogoutOutlined, LogoutSharp, MessageOutlined, MessageSharp, SettingsApplicationsOutlined, SettingsApplicationsSharp } from '@mui/icons-material';
import { Avatar, Chip, Divider, List, ListItemText, Paper } from '@mui/material';
import React from 'react'
import ClickAwayListener from '@mui/core/ClickAwayListener';
import { CListItemButton, CListItemIcon } from '../../../ui-componets/List';
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router';
import { CTooltip } from '../../../ui-componets';

const ProfileAccount = (props) => {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const togglerRef = React.useRef(null);
  const navigate = useNavigate()
  const { logout, userName } = useAuth()
  async function handleLogout() {
    await logout()
    navigate('/home')
  }
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }
  return (
    <>
      <CTooltip title="پروفایل">
        <Chip
          onClick={() => toggleMenu()}
          avatar={
            (<Avatar alt={userName} />)
          }
          label={userName}
          variant="outlined"
          ref={togglerRef}
          color="primary"
          size="medium"
          sx={{
            border: 0,
          }}
        />
      </CTooltip>
      <Popper
        anchorEl={togglerRef.current}
        open={isOpenMenu}
        placement="bottom-end"
        disablePortal
      >
        <ClickAwayListener onClickAway={() => toggleMenu()}>
          <Paper elevation={6} sx={{ minWidth: "150px" }}>
            <List>
              <CListItemButton>
                <CListItemIcon>
                  <AccountCircleOutlined />
                </CListItemIcon>
                <ListItemText>پروفایل کاربری</ListItemText>
              </CListItemButton>
              <CListItemButton>
                <CListItemIcon>
                  <MessageOutlined />
                </CListItemIcon>
                <ListItemText>پیام ها</ListItemText>
              </CListItemButton>
              <CListItemButton >
                <CListItemIcon>
                  <SettingsApplicationsOutlined />
                </CListItemIcon>
                <ListItemText>تنظیمات</ListItemText>
              </CListItemButton>
              <Divider />
              <CListItemButton onClick={() => handleLogout()}>
                <CListItemIcon>
                  <LogoutOutlined />
                </CListItemIcon>
                <ListItemText >خروج</ListItemText>
              </CListItemButton>
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}
export default ProfileAccount