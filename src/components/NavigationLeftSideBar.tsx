import React, {useState, useEffect} from 'react';
import { withRouter, RouteComponentProps } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import VerifyIcon from '@material-ui/icons/VerifiedUser';
import MintIcon from '@material-ui/icons/AddPhotoAlternate';
import TransferAllowanceIcon from '@material-ui/icons/AccountBalance';
import BidWhitelistIcon from '@material-ui/icons/Gavel';
import TokenTransferIcon from '@material-ui/icons/Telegram';

import { PropsFromRedux } from '../containers/NavigationLeftSideBarContainer';

const navigationMenu = [
	{
		text: 'Home',
		path: '/',
		icon: <HomeIcon />
	},
  {
		text: 'Mint',
		path: '/mint',
		icon: <MintIcon />
	},
  {
		text: 'Recipient Verification',
		path: '/recipient-verification',
		icon: <VerifyIcon />
	},
  {
    text: 'Bid Whitelist',
		path: '/bid-whitelist',
		icon: <BidWhitelistIcon />
  },
  {
    text: 'Token Transfer',
		path: '/token-transfer',
		icon: <TokenTransferIcon />
  },
  {
    text: 'Transfer Allowance',
		path: '/transfer-allowance',
		icon: <TransferAllowanceIcon />
  }
];

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type PropsWithRouter = RouteComponentProps & PropsFromRedux;

function NavigationLeftSideBar(props: PropsWithRouter) {
  const classes = useStyles();

  const [localShowLeftMenu, setLocalShowLeftMenu] = useState(false)

  useEffect(() => {
    setLocalShowLeftMenu(props.showLeftMenu)
  }, [props.showLeftMenu])

  const toggleDrawer = (setOpen: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    props.setShowLeftMenu(setOpen)
  };

  return (
    <div>
        <React.Fragment key={'left'}>
            <Drawer anchor={'left'} open={localShowLeftMenu} onClose={toggleDrawer(false)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                <List>
                    {navigationMenu.map(item => 
                        <ListItem onClick={() => props.history.push(item.path)} button key={item.text}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    )}
                </List>
                </div>
            </Drawer>
        </React.Fragment>
    </div>
  );
}

export default withRouter(NavigationLeftSideBar)