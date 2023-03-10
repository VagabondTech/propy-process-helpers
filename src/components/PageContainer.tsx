import React from 'react';
import {Route, withRouter, Switch, RouteComponentProps} from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import VerifyRecipientPage from '../pages/VerifyRecipientPage';
import MintPage from '../pages/MintPage';
import TransferAllowancePage from '../pages/TransferAllowancePage';
import BidWhitelistPage from '../pages/BidWhitelistPage';
import TokenTransferPage from '../pages/TokenTransferPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  }),
);

const PageContainer = () => {

    const classes = useStyles();

    return (
        <Navigation>
            <div className={classes.root}>
                <Switch>
                    <Route path="/" exact render={(props) => homeRoute(props)} />
                    <Route path="/recipient-verification" exact render={(props) => verifyRecipientRoute(props)} />
                    <Route path="/mint" exact render={(props) => mintRoute(props)} />
                    <Route path="/bid-whitelist" exact render={(props) => bidWhitelistRoute(props)} />
                    <Route path="/transfer-allowance" exact render={(props) => allowanceRoute(props)} />
                    <Route path="/token-transfer" exact render={(props) => tokenTransferRoute(props)} />
                </Switch>
            </div>
        </Navigation>
    )
}

const homeRoute = (props: RouteComponentProps) => {
    return (
        <HomePage/>
    )
}

const verifyRecipientRoute = (props: RouteComponentProps) => {
    return (
        <VerifyRecipientPage/>
    )
}

const allowanceRoute = (props: RouteComponentProps) => {
    return (
        <TransferAllowancePage/>
    )
}

const bidWhitelistRoute = (props: RouteComponentProps) => {
    return (
        <BidWhitelistPage/>
    )
}

const tokenTransferRoute = (props: RouteComponentProps) => {
    return (
        <TokenTransferPage/>
    )
}

const mintRoute = (props: RouteComponentProps<{ tokenAddress: string }>) => {
    const {
        match: {
            params: { tokenAddress }
        }
    } = props
    return (
        <MintPage tokenAddress={tokenAddress || ""}/>
    )
}

export default withRouter(PageContainer);