import React, { useState, useEffect, useRef } from 'react';

import { Contract, utils } from 'ethers';

import { multihash } from 'is-ipfs';

import { withRouter, RouteComponentProps } from "react-router";

import bs58 from 'bs58';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from "@material-ui/core/InputLabel";

import { Formik, FormikProps, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField, Switch } from 'formik-material-ui';

import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

import { getEtherscanLink } from '../utils';
import { BidWhitelistABI, WhitelistAddresses, CHAIN_NAMES } from '../utils/constants';
import { getBytes32FromIpfsHash } from '../utils';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 25,
        textAlign: 'center',
    },
    title: {
        fontSize: 14,
    },
    container: {
        marginTop: 25,
        textAlign: 'center'
    },
    connectionButton: {
        width: '100%',
        marginBottom: 15,
    },
    paper: {
        padding: 15,
        marginBottom: 40
    }
});

interface Values {
    bidderAddress: string;
    whitelistStatus: boolean;
}

const BidWhitelistPage = (props: RouteComponentProps) => {
    const classes = useStyles();

    const { history } = props;
    
    const { activateBrowserWallet, deactivate, account, library, chainId, connector } = useEthers()

    const [ isAwaitingMetaMaskConfirmation, setIsAwaitingMetaMaskConfirmation ] = useState(false)
    const [ pendingMintTransaction, setPendingMintTransaction ] = useState<boolean | string>(false)
    const [ mintTransactionSuccessful, setMintTransactionSuccessful] = useState<boolean | string>(false)
    const [ currentKey, setCurrentKey ] = useState(0)
    const [ bidWhitelistAddress, setBidWhitelistAddress ] = useState<string>(WhitelistAddresses[1]);
    const [ currentBidderAddress, setCurrentBidderAddress ] = useState<boolean | string>(false);
    const [ isCheckingCurrentStatus, setIsCheckingCurrentStatus ] = useState(false);
    const [ currentWhitelistStatus, setCurrentBidderAddressStatus ] = useState<undefined | boolean>();
    const [ contractError, setContractError ] = useState<boolean | string>(false);

    const userBalance = useEtherBalance(account)

    useEffect(() => {
        if(chainId) {
            setBidWhitelistAddress(WhitelistAddresses[chainId]);
        }
    }, [chainId])

    useEffect(() => {
        const checkCurrentStatus = async () => {
            if(currentBidderAddress && utils.isAddress(currentBidderAddress.toString())) {
                // Check to see current status of address
                if(library) {
                    try {
                        if(chainId && bidWhitelistAddress) {
                            setIsCheckingCurrentStatus(true);
                            const signer = library.getSigner()
                            const contract = new Contract(bidWhitelistAddress, BidWhitelistABI, signer);
                            let isCurrentlyWhitelisted = await contract.isWhitelisted(currentBidderAddress);
                            setCurrentBidderAddressStatus(isCurrentlyWhitelisted);
                            setIsCheckingCurrentStatus(false);
                        }
                    } catch (error) {
                        setIsCheckingCurrentStatus(false);
                        console.error(error);
                        setCurrentBidderAddressStatus(undefined);
                    }
                }
            }else{
                setCurrentBidderAddress(false);
                setCurrentBidderAddressStatus(undefined);
            }
        }
        checkCurrentStatus();
        return () => {
            setCurrentBidderAddress(false);
            setCurrentBidderAddressStatus(undefined);
        }
    }, [currentBidderAddress, chainId, bidWhitelistAddress, library, account])

    return (
        <Container className={classes.container} maxWidth="md" key={currentKey}>
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
            <Paper className={classes.paper}>
            <h1 style={{marginTop: 0, paddingTop: 0}}>Whitelist Bidder for Feb 10th 2022 Auction on {chainId && CHAIN_NAMES[chainId]}</h1>
            <Formik
                initialValues={{
                    bidderAddress: '',
                    whitelistStatus: true,
                }}
                validate={values => {
                    const errors: Partial<Values> = {};
                    if (!values.bidderAddress) {
                        errors.bidderAddress = 'Required';
                    } else if(!utils.isAddress(values.bidderAddress)) {
                        errors.bidderAddress = 'Invalid destination address';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    if(library) {
                        try {
                            setContractError(false);
                            if(values.bidderAddress && chainId && bidWhitelistAddress) {
                                const signer = library.getSigner()
                                const contract = new Contract(bidWhitelistAddress, BidWhitelistABI, signer);

                                setIsAwaitingMetaMaskConfirmation(true);

                                let transactionResponse = await contract.setWhitelistStatus(values.bidderAddress, !!values.whitelistStatus);

                                setIsAwaitingMetaMaskConfirmation(false);

                                let transactionHash = transactionResponse.hash;

                                setPendingMintTransaction(transactionHash);

                                await transactionResponse.wait();

                                setSubmitting(false);
                                setPendingMintTransaction(false);
                                setMintTransactionSuccessful(transactionHash);
                            }
                        }catch(error){
                            console.log({error})
                            // @ts-ignore
                            if(error?.error?.message) {
                                // @ts-ignore
                                setContractError(error?.error?.message);
                            }
                            setSubmitting(false);
                            setIsAwaitingMetaMaskConfirmation(false);
                            setPendingMintTransaction(false);
                            setMintTransactionSuccessful(false);
                        }
                    }
                }}
                >
                {({ submitForm, isSubmitting, values, errors, setFieldValue }) => {
                    return (
                        <Form>
                            {!mintTransactionSuccessful &&
                                <>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Bidder Address"
                                        helperText="The address that you would like to set the bidding whitelist status for"
                                        name="bidderAddress"
                                        variant="outlined"
                                        onChange={(event: any) => {
                                            setFieldValue('bidderAddress', event.target.value);
                                            setCurrentBidderAddress(event.target.value);
                                        }}
                                        style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                    />
                                    <br />
                                    {(currentWhitelistStatus === true || currentWhitelistStatus === false) && 
                                        <>
                                            <div style={{marginTop: 15}}>
                                                <b>Address currently {currentWhitelistStatus ? <span style={{'color': 'green'}}>whitelisted</span> : <span style={{'color': 'red'}}>not whitelisted</span>}</b>
                                            </div>
                                            <br />
                                        </>
                                    }
                                    <div
                                        style={{marginTop: 15}}
                                    >
                                        <InputLabel
                                            htmlFor="whitelistStatus"
                                        >
                                            <Field
                                                component={Switch}
                                                type="checkbox"
                                                label="Whitelist Status"
                                                name="whitelistStatus"
                                                variant="outlined"
                                            />
                                            {values.whitelistStatus ? 'Add bidder to whitelist' : 'Remove bidder from whitelist'}
                                        </InputLabel>
                                    </div>
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting || isCheckingCurrentStatus || (currentWhitelistStatus === values.whitelistStatus)}
                                        onClick={submitForm}
                                        style={{marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%'}}
                                    >
                                        {values.whitelistStatus ? 'Whitelist bidder' : 'Remove bidder from whitelist'}
                                    </Button>
                                    {
                                        currentWhitelistStatus === values.whitelistStatus && !errors.bidderAddress && 
                                        <>
                                            <br />
                                            <span style={{'color': 'red'}}>Address already {currentWhitelistStatus ? 'whitelisted' : 'not whitelisted'}</span>
                                        </>
                                    }
                                    {contractError &&
                                        <>
                                            <br />
                                            <span>Contract Error:</span>
                                            <br />
                                            <span style={{'color': 'red'}}>{contractError}</span>
                                        </>
                                    }
                                </>
                            }
                            {(isAwaitingMetaMaskConfirmation || pendingMintTransaction || mintTransactionSuccessful) &&
                                <div>
                                    {isAwaitingMetaMaskConfirmation && `Please Check MetaMask`}
                                    {chainId && pendingMintTransaction && typeof pendingMintTransaction === "string" && 
                                        <span>Pending Set Whitelist Status Tx: <a style={{color: '#39bfff'}} href={getEtherscanLink(pendingMintTransaction, 'tx', chainId)} target="_blank" rel="noreferrer noopener">View On Etherscan</a></span>
                                    }
                                    {chainId && mintTransactionSuccessful && typeof mintTransactionSuccessful === "string" && 
                                        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                                            <span>Set Whitelist Status Tx Successful: <a style={{color: '#39bfff'}} href={getEtherscanLink(mintTransactionSuccessful, 'tx', chainId)} target="_blank" rel="noreferrer noopener">View On Etherscan</a></span>
                                            <span style={{marginTop: 15}}>What's Next?</span>
                                            {/* <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={() => history.push(`/mint/${mintTransactionSuccessful}`)}
                                                style={{display: 'block', marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                            >
                                                View On OpenSea
                                            </Button> */}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    setMintTransactionSuccessful(false)
                                                    setFieldValue('bidderAddress', '');
                                                    setCurrentBidderAddress(false);
                                                    setCurrentBidderAddressStatus(undefined);
                                                }}
                                                style={{display: 'block', marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                            >
                                                Set Whitelist Status of Another Address
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={() => history.push(`/recipient-verification`)}
                                                style={{display: 'block', marginBottom: 15, width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                            >
                                                Verify a PropyNFT Recipient
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={() => history.push(`/mint`)}
                                                style={{display: 'block', width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                            >
                                                Mint an NFT
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={() => history.push(`/transfer-allowance`)}
                                                style={{display: 'block', marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                            >
                                                Modify Transfer Allowance For Address
                                            </Button>
                                        </div>
                                    }
                                </div>
                            }
                            <div style={{width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto', marginTop: 15}}>
                                {isSubmitting && <LinearProgress />}
                            </div>
                        </Form>
                    )
                }}
                </Formik>
                </Paper>
            </>
            )}
        </Container>
    )
};

export default withRouter(BidWhitelistPage);