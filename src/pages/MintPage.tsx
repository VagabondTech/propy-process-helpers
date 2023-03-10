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
import MenuItem from '@material-ui/core/MenuItem';

import { Formik, FormikProps, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField, Select } from 'formik-material-ui';

import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

import { getEtherscanLink } from '../utils';
import { ERC721ABI, NftContractAddresses, CHAIN_NAMES } from '../utils/constants';
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
    contractSelection: string;
    contractAddress: string;
    hash: string;
    mintToAddress: string;
    royaltyReceiver: string;
    royaltyBasisPoints: string;
}

interface IMintProps {
    tokenAddress: string
}

const MintPage = (props: RouteComponentProps & IMintProps) => {
    const classes = useStyles();

    const [selectedContract, setSelectedContract] = useState("pNFT");

    const { history, tokenAddress } = props;
    
    const { activateBrowserWallet, deactivate, account, library, chainId, connector } = useEthers()

    const [ isAwaitingMetaMaskConfirmation, setIsAwaitingMetaMaskConfirmation ] = useState(false)
    const [ pendingMintTransaction, setPendingMintTransaction ] = useState<boolean | string>(false)
    const [ mintTransactionSuccessful, setMintTransactionSuccessful] = useState<boolean | string>(false)
    const [ currentKey, setCurrentKey ] = useState(0)
    const [ contractError, setContractError ] = useState<boolean | string>(false);
    
    type FormValues = {
        contractSelection: string,
        contractAddress: string | undefined,
        hash: string | undefined,
        mintToAddress: string | undefined,
        royaltyReceiver: string | undefined,
        royaltyBasisPoints: number | undefined
    };
    const formikRef = useRef<FormikProps<FormValues>>(null);

    const userBalance = useEtherBalance(account)

    useEffect(() => {
        setCurrentKey(currentKey + 1);
        setMintTransactionSuccessful(false);
    }, [tokenAddress])

    useEffect(() => {
        if(formikRef.current && chainId && selectedContract) {
            // @ts-ignore
            formikRef.current.setFieldValue('contractAddress', NftContractAddresses[chainId][selectedContract]);
        }
    }, [chainId, selectedContract])

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
            <h1 style={{marginTop: 0, paddingTop: 0}}>Mint ERC721 NFT to {chainId && CHAIN_NAMES[chainId]}</h1>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    hash: '',
                    contractSelection: "pNFT",
                    contractAddress: chainId ? NftContractAddresses[chainId]["pNFT"] : NftContractAddresses[1]["pNFT"],
                    mintToAddress: '',
                    royaltyReceiver: '',
                    royaltyBasisPoints: 0
                }}
                validate={values => {
                    const errors: Partial<Values> = {};
                    console.log({values})
                    if (!values.contractSelection) {
                        errors.contractSelection = 'Required';
                    }
                    if (!values.contractAddress) {
                        errors.contractAddress = 'Required';
                    } else if(!utils.isAddress(values.contractAddress)) {
                        errors.contractAddress = 'Invalid contract address';
                    }
                    if (!values.hash) {
                        errors.hash = 'Required';
                    } else if(!multihash(values.hash)) {
                        errors.hash = 'Invalid IPFS Multihash';
                    }
                    if (!values.mintToAddress) {
                        errors.mintToAddress = 'Required';
                    } else if(!utils.isAddress(values.mintToAddress)) {
                        errors.mintToAddress = 'Invalid destination address';
                    }
                    if (!values.royaltyReceiver) {
                        errors.royaltyReceiver = 'Required';
                    } else if(!utils.isAddress(values.royaltyReceiver)) {
                        errors.royaltyReceiver = 'Invalid royalty receiver address';
                    }
                    if (values.royaltyBasisPoints && isNaN(values.royaltyBasisPoints)) {
                        errors.royaltyBasisPoints = 'Required';
                    } else if(values.royaltyBasisPoints && ((values.royaltyBasisPoints > 10000) || (values.royaltyBasisPoints < 0))) {
                        errors.royaltyBasisPoints = 'Basis points must be between 0-10000';
                    } else if(values.royaltyBasisPoints && (values.royaltyBasisPoints % 1 !== 0)) {
                        errors.royaltyBasisPoints = 'Integers only';
                    } 
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    if(library) {
                        try {
                            setContractError(false);
                            if(values.contractAddress && values.hash && values.mintToAddress) {
                                const signer = library.getSigner()
                                const contract = new Contract(values.contractAddress, ERC721ABI, signer);

                                setIsAwaitingMetaMaskConfirmation(true);

                                let ipfsHashToBytes32 = getBytes32FromIpfsHash(values.hash);
                                let transactionResponse = await contract.mintWithHash(values.mintToAddress, ipfsHashToBytes32, values.royaltyReceiver, values.royaltyBasisPoints);

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
                {({ submitForm, isSubmitting, values }) => (
                    <Form>
                        {!mintTransactionSuccessful &&
                            <>
                                <Field
                                    component={Select}
                                    name="contractSelection"
                                    label="Contract Selection"
                                    helperText="Symbol of the NFT contract"
                                    variant="outlined"
                                    style={{width: '456px', maxWidth: '100%'}}
                                    inputProps={{name: 'contractSelection', id: 'contractSelection'}}
                                >
                                    <MenuItem value={"pNFT"} onClick={() => setSelectedContract("pNFT")}>pNFT</MenuItem>
                                    <MenuItem value={"pDeedNFT"} onClick={() => setSelectedContract("pDeedNFT")}>pDeedNFT</MenuItem>
                                </Field>
                                <Field
                                    component={TextField}
                                    name="contractAddress"
                                    type="text"
                                    label="Contract Address"
                                    helperText="Ethereum address of the NFT contract"
                                    variant="outlined"
                                    disabled={true}
                                    style={{width: '456px', maxWidth: '100%', marginTop: 30}}
                                />
                                <Field
                                    component={TextField}
                                    name="hash"
                                    type="name"
                                    label="Metadata IPFS Hash"
                                    helperText="The IPFS hash of the token metadata"
                                    variant="outlined"
                                    style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                />
                                <br />
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Mint To Address"
                                    helperText="The address that the token should be minted into"
                                    name="mintToAddress"
                                    variant="outlined"
                                    style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                />
                                <br />
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Royalty Receiver Address"
                                    helperText="EIP-2981 royalty payment address (secondary sales only)"
                                    name="royaltyReceiver"
                                    variant="outlined"
                                    style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                />
                                <br />
                                <Field
                                    component={TextField}
                                    type="number"
                                    label="Royalty Basis Points (100 = 1%)"
                                    helperText={values.royaltyBasisPoints ? `${values.royaltyBasisPoints} basis points = ${values.royaltyBasisPoints / 100}%` : '0 basis points = 0%'}
                                    name="royaltyBasisPoints"
                                    variant="outlined"
                                    style={{width: '456px', maxWidth: '100%', marginTop: 15}}
                                />
                                <br />
                                <Typography variant="subtitle2" style={{color: 'red', fontWeight: 'bold', marginTop: 10}} component="p">
                                    WARNING: IPFS HASH CAN NOT BE CHANGED
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                    style={{marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%'}}
                                >
                                    Mint ERC721
                                </Button>
                                {contractError &&
                                    <>
                                        <br />
                                        <span>Contract Error:</span>
                                        <br />
                                        <span style={{'color': 'red'}}>{contractError}</span>
                                        {
                                            contractError && typeof contractError === 'string' && (contractError.indexOf('Please proceed to https://propy.com/nft to verify your wallet') > 0) &&
                                            <>
                                                <br />
                                                <br />
                                                <span>Remember that an address must be verified before a PropyNFT can be minted into it</span>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={isSubmitting}
                                                    onClick={() => history.push(`/recipient-verification`)}
                                                    style={{display: 'block', marginBottom: 15, marginTop: 15, width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                                >
                                                    Verify a PropyNFT Recipient
                                                </Button>
                                            </>
                                        }
                                    </>
                                }
                            </>
                        }
                        {(isAwaitingMetaMaskConfirmation || pendingMintTransaction || mintTransactionSuccessful) &&
                            <div>
                                {isAwaitingMetaMaskConfirmation && `Please Check MetaMask`}
                                {chainId && pendingMintTransaction && typeof pendingMintTransaction === "string" && 
                                    <span>Pending Mint Transaction: <a style={{color: '#39bfff'}} href={getEtherscanLink(pendingMintTransaction, 'tx', chainId)} target="_blank" rel="noreferrer noopener">View On Etherscan</a></span>
                                }
                                {chainId && mintTransactionSuccessful && typeof mintTransactionSuccessful === "string" && 
                                    <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                                        <span>Mint Transaction Successful: <a style={{color: '#39bfff'}} href={getEtherscanLink(mintTransactionSuccessful, 'tx', chainId)} target="_blank" rel="noreferrer noopener">View On Etherscan</a></span>
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
                                            }}
                                            style={{display: 'block', marginTop: 15, marginBottom: 15, width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                        >
                                            Mint another NFT
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            onClick={() => history.push(`/recipient-verification`)}
                                            style={{display: 'block', width: '456px', maxWidth: '100%', marginLeft:'auto',marginRight:'auto'}}
                                        >
                                            Verify a PropyNFT recipient
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
                )}
                </Formik>
                </Paper>
            </>
            )}
        </Container>
    )
};

export default withRouter(MintPage);