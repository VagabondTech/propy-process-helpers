import React from 'react';

import { withRouter, RouteComponentProps } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import VerifyIcon from '@material-ui/icons/VerifiedUser';
import TransferAllowanceIcon from '@material-ui/icons/AccountBalance';
import MintIcon from '@material-ui/icons/AddPhotoAlternate';
import BidWhitelistIcon from '@material-ui/icons/Gavel';
import TokenTransferIcon from '@material-ui/icons/Telegram';

import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 25,
        textAlign: 'center',
    },
    pageOption: {
        minWidth: 275,
        textAlign: 'center',
    },
    title: {
        fontSize: 14,
    },
    container: {
        marginTop: 25,
    },
    connectionButton: {
        width: '100%',
        marginBottom: 15,
    },
});

const HomePage = (props: RouteComponentProps) => {
    const classes = useStyles();

    const { history } = props;
    
    const { activateBrowserWallet, deactivate, account } = useEthers()
    
    const userBalance = useEtherBalance(account)

    return (
        <Container className={classes.container} maxWidth="md">
            <div className="button-container">
                {!account &&
                    <Button className={classes.connectionButton} color="primary" variant="contained" onClick={() => activateBrowserWallet()}>Connect</Button>
                }
            </div>
            <div>
                {account && (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Account:
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {account}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
                {account && (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Ether balance:
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {userBalance ? `${formatEther(userBalance)} ETH` : `Loading...`}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </div>
            {account && (
                <>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Card className={classes.pageOption}>
                                <CardActionArea style={{paddingBottom: '10px'}} onClick={() => history.push('/mint')}>
                                    <CardContent>
                                        <MintIcon style={{width: '100px', height: '120px'}}/>
                                        <Typography variant="h5" component="h2">
                                            Mint
                                        </Typography>
                                        <div style={{maxWidth: '600px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <Typography variant="subtitle1" component="h2">
                                                Handles the minting of a new token using an IPFS hash (CID) to a verified recipient
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card className={classes.pageOption}>
                                <CardActionArea style={{paddingBottom: '10px'}} onClick={() => history.push('/recipient-verification')}>
                                    <CardContent>
                                        <VerifyIcon style={{width: '100px', height: '120px'}}/>
                                        <Typography variant="h5" component="h2">
                                            Verify Recipient
                                        </Typography>
                                        <div style={{maxWidth: '600px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <Typography variant="subtitle1" component="h2">
                                                Provides functionality to grant or revoke permission for an account to receive a PropyNFT
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card className={classes.pageOption}>
                                <CardActionArea style={{paddingBottom: '10px'}} onClick={() => history.push('/bid-whitelist')}>
                                    <CardContent>
                                        <BidWhitelistIcon style={{width: '100px', height: '120px'}}/>
                                        <Typography variant="h5" component="h2">
                                            Bid Whitelist
                                        </Typography>
                                        <div style={{maxWidth: '600px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <Typography variant="subtitle1" component="h2">
                                                Grants or revokes permission for a specified account to bid on Propy Auctions.
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card className={classes.pageOption}>
                                <CardActionArea style={{paddingBottom: '10px'}} onClick={() => history.push('/token-transfer')}>
                                    <CardContent>
                                        <TokenTransferIcon style={{width: '100px', height: '120px'}}/>
                                        <Typography variant="h5" component="h2">
                                            Transfer Token
                                        </Typography>
                                        <div style={{maxWidth: '600px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <Typography variant="subtitle1" component="h2">
                                                Provides functionality to transfer a token of a specified ID from the current owner to a verified recipient.
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Card className={classes.pageOption}>
                                <CardActionArea style={{paddingBottom: '10px'}} onClick={() => history.push('/transfer-allowance')}>
                                    <CardContent>
                                        <TransferAllowanceIcon style={{width: '100px', height: '120px'}}/>
                                        <Typography variant="h5" component="h2">
                                            Transfer Allowance
                                        </Typography>
                                        <div style={{maxWidth: '600px', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <Typography variant="subtitle1" component="h2">
                                                Grants or revokes permission for a specified account to transfer a token on behalf of the existing owner of a token (e.g. allows an auction contract to transfer a token to a verified winner on behalf of the existing NFT owner)
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    )
};

export default withRouter(HomePage);