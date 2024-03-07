import React from 'react'
import * as MUI from '../../../import'
import { useState } from 'react'
import { Link } from 'react-router-dom';


const listItemStyles = {
    paddingLeft: '16px',
  };
  
const CustomListItem = ({ to, icon, secondary, imageSrc, alt }) => (
    <MUI.ListItemButton component={Link} to={to} sx={{ ...listItemStyles }}>
      <MUI.ListItemIcon>{icon}</MUI.ListItemIcon>
      {imageSrc ? (
        <MUI.ListItemIcon>
          <MUI.Box
            component="img"
            sx={{
              height: 40,
              width: 60,
              marginLeft: '-20px',
            }}
            alt={alt}
            src={imageSrc}
          />
        </MUI.ListItemIcon>
      ) : null}
      <MUI.ListItemText secondary={secondary} sx={{ fontSize: '12px !important' }} />
    </MUI.ListItemButton>
  );


export const  DropdownMenu = () =>  {

    const [isCollapse, setIsCollapse] = useState(false);      

    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
    }
    

  return (
        <MUI.List>
          <MUI.ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapse}
          >
            <MUI.ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px:2,
              }}
            >
              <MUI.ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : "auto",
                  justifyContent: "center",
                }}
              >
                <MUI.SchoolOutlinedIcon />
              </MUI.ListItemIcon>
              <MUI.ListItemText secondary="Scholarships" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapse ? <MUI.ExpandLessIcon /> : <MUI.ExpandMoreIcon/>}
            </MUI.ListItemButton>
          </MUI.ListItem>
          <MUI.Collapse in={isCollapse}  unmountOnExit>
          <CustomListItem to="/categories" icon={<MUI.FormatListBulletedIcon />} secondary="Categories" />
          <CustomListItem to="/partner" icon={<MUI.HandshakeOutlinedIcon />} secondary="Partners " />
          </MUI.Collapse>
        </MUI.List>
  )
}


export const DropdownMenu2 = () =>  {

  const [isCollapse, setIsCollapse] = useState(false);      

  const handleCollapse = () => {
      setIsCollapse(!isCollapse);
  }

return (
      <MUI.List>
        <MUI.ListItem
          disablePadding
          sx={{ display: "block" }}
          onClick={handleCollapse}
        >
          <MUI.ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px:2,
            }}
          >
            <MUI.ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 4 : "auto",
                justifyContent: "center",
              }}
            >
              <MUI.DescriptionOutlinedIcon/>
            </MUI.ListItemIcon>
            <MUI.ListItemText secondary="Submissions" sx={{ opacity: open ? 1 : 0 }} />
            {isCollapse ? <MUI.ExpandLessIcon /> : <MUI.ExpandMoreIcon/>}
          </MUI.ListItemButton>
        </MUI.ListItem>
        <MUI.Collapse in={isCollapse}  unmountOnExit>
        <CustomListItem to="/submission-renewal" icon={<MUI.DescriptionOutlinedIcon />} secondary="Renewal Submission" />
        <CustomListItem to="/submission-graduating" icon={<MUI.DescriptionOutlinedIcon/>} secondary="Graduating Submission" />
        <CustomListItem to="/submission-alumni" icon={<MUI.DescriptionOutlinedIcon />} secondary="Alumni Submission" />
        </MUI.Collapse>
      </MUI.List>
)
}


export const DropdownMenu3 = () =>  {

  const [isCollapse, setIsCollapse] = useState(false);      

  const handleCollapse = () => {
      setIsCollapse(!isCollapse);
  }

return (
      <MUI.List>
        <MUI.ListItem
          disablePadding
          sx={{ display: "block" }}
          onClick={handleCollapse}
        >
          <MUI.ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px:2,
            }}
          >
            <MUI.ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 4 : "auto",
                justifyContent: "center",
              }}
            >
              <MUI.DescriptionOutlinedIcon/>
            </MUI.ListItemIcon>
            <MUI.ListItemText secondary="Submissions" sx={{ opacity: open ? 1 : 0 }} />
            {isCollapse ? <MUI.ExpandLessIcon /> : <MUI.ExpandMoreIcon/>}
          </MUI.ListItemButton>
        </MUI.ListItem>
        <MUI.Collapse in={isCollapse}  unmountOnExit>
        <CustomListItem to="/submitted-renewal" icon={<MUI.DescriptionOutlinedIcon />} secondary="Renewal Submission" />
        <CustomListItem to="/submitted-graduating" icon={<MUI.DescriptionOutlinedIcon/>} secondary="Graduating Submission" />
        <CustomListItem to="/submitted-alumni" icon={<MUI.DescriptionOutlinedIcon />} secondary="Alumni Submission" />
        </MUI.Collapse>
      </MUI.List>
)
}