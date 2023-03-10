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
import { ERC721ABI, NftContractAddresses, CHAIN_NAMES } from '../utils/constants';

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
    tokenAddress: string;
    tokenId: number;
    verifyAddress: string;
    verifyStatus: boolean;
}

interface ErrorValues {
    tokenAddress: string;
    tokenId: string;
    verifyAddress: string;
    verifyStatus: string;
}

const VerifyRecipientPage = (props: RouteComponentProps) => {
    const classes = useStyles();

    const { history } = props;
    
    const { activateBrowserWallet, deactivate, account, library, chainId, connector } = useEthers()

    const [ isAwaitingMetaMaskConfirmation, setIsAwaitingMetaMaskConfirmation ] = useState(false)
    const [ pendingMintTransaction, setPendingMintTransaction ] = useState<boolean | string>(false)
    const [ mintTransactionSuccessful, setMintTransactionSuccessful] = useState<boolean | string>(false)
    const [ currentKey, setCurrentKey ] = useState(0)
    const [ nftAddress, setNftAddress ] = useState<string>(NftContractAddresses[1]["pNFT"]);
    const [ currentVerificationAddress, setCurrentVerificationAddress ] = useState<boolean | string>(false);
    const [ currentTokenId, setCurrentTokenId ] = useState<boolean | number>(false);
    const [ isCheckingCurrentStatus, setIsCheckingCurrentStatus ] = useState(false);
    const [ currentVerificationAddressStatus, setCurrentVerificationAddressStatus ] = useState<undefined | boolean>();
    const [ contractError, setContractError ] = useState<boolean | string>(false);

    const userBalance = useEtherBalance(account)

    useEffect(() => {
        if(chainId) {
            setNftAddress(NftContractAddresses[chainId]["pNFT"]);
        }
    }, [chainId])

    type FormValues = {
        tokenAddress: string | undefined,
        tokenId: number | string | undefined,
        verifyAddress: string | undefined,
        verifyStatus: boolean,
    };
    const formikRef = useRef<FormikProps<FormValues>>(null);

    useEffect(() => {
        if(formikRef.current && chainId) {
            formikRef.current.setFieldValue('tokenAddress', NftContractAddresses[chainId]);
        }
    }, [chainId])

    useEffect(() => {
        const checkCurrentStatus = async () => {
            if(currentVerificationAddress && currentTokenId && utils.isAddress(currentVerificationAddress.toString())) {
                // Check to see current status of address
                if(library) {
                    try {
                        if(chainId && nftAddress) {
                            setIsCheckingCurrentStatus(true);
                            const signer = library.getSigner()
                            const contract = new Contract(nftAddress, ERC721ABI, signer);
                            let currentlyApprovedAddress = await contract.getApproved(currentTokenId);
                            let isCurrentlyVerified = false;
                            if(currentlyApprovedAddress.toLowerCase() === currentVerificationAddress.toString().toLowerCase()) {
                                isCurrentlyVerified = true;
                            }
                            setCurrentVerificationAddressStatus(isCurrentlyVerified);
                            setIsCheckingCurrentStatus(false);
                        }
                    } catch (error) {
                        console.error(error);
                        setIsCheckingCurrentStatus(false);
                        setCurrentVerificationAddressStatus(undefined);
                    }
                }
            }else{
                setCurrentVerificationAddress(false);
                setCurrentVerificationAddressStatus(undefined);
            }
        }
        checkCurrentStatus();
        return () => {
            setCurrentVerificationAddress(false);
            setCurrentVerificationAddressStatus(undefined);
        }
    }, [currentVerificationAddress, currentTokenId, chainId, nftAddress, library, account])

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
            <h1 style={{marginTop: 0, paddingTop: 0}}>Handle PropyNFT Allowance on {chainId && CHAIN_NAMES[chainId]}</h1>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    tokenAddress: chainId ? NftContractAddresses[chainId]["pNFT"] : NftContractAddresses[1]["pNFT"],
                    tokenId: '',
                    verifyAddress: '',
                    verifyStatus: true,
                }}
                validate={values => {
                    const errors: Partial<ErrorValues> = {};
                    if (!values.tokenAddress) {
                        errors.tokenAddress = 'Required';
                    } else if(!utils.isAddress(values.tokenAddress)) {
                        errors.tokenAddress = 'Invalid contract address';
                    }
                    if (!values.verifyAddress) {
                        errors.verifyAddress = 'Required';
                    } else if(!utils.isAddress(values.verifyAddress)) {
                        errors.verifyAddress = 'Invalid destination address';
                    }
                    if (!values.tokenId || values.tokenId === '') {
                        errors.tokenId = 'Required';
                    } else if(values.tokenId < 1) {
                        errors.tokenId = 'Minimum ID is 1';
                    } else if(typeof values.tokenId === 'number' && (values.tokenId % 1) !== 0) {
                        errors.tokenId = 'Integers only';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    if(library) {
                        try {
                            setContractError(false);
                            if(values.verifyAddress && chainId && nftAddress) {
                                const signer = library.getSigner()
                                const contract = new Contract(nftAddress, ERC721ABI, signer);

                                setIsAwaitingMetaMaskConfirmation(true);

                                let transactionResponse = await contract.approve(values.verifyAddress, values.tokenId);

                                setIsAwaitingMetaMaskConfirmation(false);

                                let transactionHash = transactionResponse.hash;

                                setPendingMintTransaction(transactionHash);

                                await transactionResponse.wait();

                                setSubmitting(false);
                                setPendingMintTransaction(false);
                                setMintTransactionSuccessful(transactionHash);
                            }
                        }catch(error){
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
                                        disabled={true}
                                        type="text"
                                        label="PropyNFT Contract Address"
                                        helperText="The contract address of the PropyNFT token"
                                        name="tokenAddress"
                                        variant="outlined"
                                        style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                    />
                                    <Field
                                        component={TextField}
                                        type="number"
                                        min="1"
                                        step="1"
                                        label="PropyNFT Token ID"
                                        helperText="The token ID of the relevant PropyNFT"
                                        name="tokenId"
                                        variant="outlined"
                                        onChange={(event: any) => {
                                            setFieldValue('tokenId', event.target.value);
                                            setCurrentTokenId(event.target.value);
                                        }}
                                        style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                    />
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Proxy Address (acts on behalf of the owner)"
                                        helperText="Address to grant permission to transfer a PropyNFT on behalf of the owner"
                                        name="verifyAddress"
                                        variant="outlined"
                                        onChange={(event: any) => {
                                            setFieldValue('verifyAddress', event.target.value);
                                            setCurrentVerificationAddress(event.target.value);
                                        }}
                                        style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                    />
                                    <br />
                                    {(currentVerificationAddressStatus === true || currentVerificationAddressStatus === false) && 
                                        <>
                                            <div style={{marginTop: 15}}>
                                                <b>Address currently {currentVerificationAddressStatus ? <span style={{'color': 'green'}}>has allowance</span> : <span style={{'color': 'red'}}>has no allowance</span>}</b>
                                            </div>
                                            <br />
                                        </>
                                    }
                                    <div
                                        style={{marginTop: 15}}
                                    >
                                        <InputLabel
                                            htmlFor="verifyStatus"
                                        >
                                            <Field
                                                component={Switch}
                                                type="checkbox"
                                                label="Verification Status"
                                                name="verifyStatus"
                                                variant="outlined"
                                            />
                                            {values.verifyStatus ? 'Grant Allowance' : 'Revoke Allowance'}
                                        </InputLabel>
                                    </div>
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting || isCheckingCurrentStatus || (currentVerificationAddressStatus === values.verifyStatus)}
                                        onClick={submitForm}
                                        style={{marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%'}}
                                    >
                                        {values.verifyStatus ? 'Grant Allowance To' : 'Revoke Allowance From'} Proxy
                                    </Button>
                                    {
                                        currentVerificationAddressStatus === values.verifyStatus && !errors.verifyAddress && 
                                        <>
                                            <br />
                                            <span style={{'color': 'red'}}>Address already {currentVerificationAddressStatus ? 'has allowance' : 'has no allowance'}</span>
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
                                        <span>Pending Allowance Tx: <a style={{color: '#39bfff'}} href={getEtherscanLink(pendingMintTransaction, 'tx', chainId)} target="_blank" rel="noreferrer noopener">View On Etherscan</a></span>
                                    }
                                    {chainId && mintTransactionSuccessful && typeof mintTransactionSuccessful === "string" && 
                                        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                                            <span>Allowance Tx Successful: <a style={{color: '#39bfff'}} href={getEtherscanLink(mintTransactionSuccessful, 'tx', chainId)} target="_blank" rel="noreferrer noopener">View On Etherscan</a></span>
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
                                                    setFieldValue('tokenId', '');
                                                    setFieldValue('verifyAddress', '');
                                                    setCurrentVerificationAddress(false);
                                                    setCurrentVerificationAddressStatus(undefined);
                                                }}
                                                style={{display: 'block', marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                            >
                                                Modify Allowance For Another Address
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
                                                onClick={() => history.push(`/bid-whitelist`)}
                                                style={{display: 'block', width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                            >
                                                Set Bidder Whitelist Status
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

export default withRouter(VerifyRecipientPage);