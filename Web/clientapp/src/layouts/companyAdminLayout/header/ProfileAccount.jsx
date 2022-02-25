import {  ListItem, Popper } from '@mui/material';
import { AccountCircleOutlined, LogoutOutlined } from '@mui/icons-material';
import { Avatar, Chip, Divider, List, ListItemText, Paper,Box } from '@mui/material';
import React from 'react'
import ClickAwayListener from '@mui/core/ClickAwayListener';
import { CListItemButton, CListItemIcon } from '../../../ui-componets/List';
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router';
import { CTooltip } from '../../../ui-componets';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import {  getLastName, getName,getAccountType } from '../../../services/JWTAuthService';

const ProfileAccount = (props) => {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const togglerRef = React.useRef(null);
  const navigate = useNavigate()
  const { logout, userName, photo } = useAuth()
  async function handleLogout() {
    await logout()
    navigate('/')
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
            (<Avatar alt={userName} src={photo} />)
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
          <Paper elevation={6} sx={{ minWidth: "200px" }}>
            <List>
              <ListItem>
                <ListItemText
                  primary={`${getName()} ${getLastName()} `}
                  secondary={<Box component="span" >نوع حساب : <Box component="span" sx={{ color: "green" }}>{getAccountType()}</Box></Box>}
                />
              </ListItem>
              <CListItemButton onClick={() => {
                toggleMenu()
                navigate("/company/profile")
                }}>
                <CListItemIcon>
                  <AccountCircleOutlined />
                </CListItemIcon>
                <ListItemText>پروفایل کاربری</ListItemText>
              </CListItemButton>
              <CListItemButton onClick={() => {
                toggleMenu()
                navigate("/company/friends/1")}}>
                <CListItemIcon>
                  <GroupOutlinedIcon />
                </CListItemIcon>
                <ListItemText>همکاران</ListItemText>
              </CListItemButton>
              {/* <CListItemButton >
                <CListItemIcon>
                  <SettingsApplicationsOutlined />
                </CListItemIcon>
                <ListItemText>تنظیمات</ListItemText>
              </CListItemButton> */}
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