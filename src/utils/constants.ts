
const ERC721ABI = `[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_admin",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_addressController",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "new_controller",
        "type": "address"
      }
    ],
    "name": "AddressControllerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "MINTER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "baseURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRoleMember",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleMemberCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_royaltyReceiver",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "_royaltyBasisPoints",
        "type": "uint16"
      }
    ],
    "name": "mintWithURI",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_hash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_royaltyReceiver",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "_royaltyBasisPoints",
        "type": "uint16"
      }
    ],
    "name": "mintWithHash",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressController",
        "type": "address"
      }
    ],
    "name": "setAddressController",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_royaltyReceiver",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "_royaltyBasisPoints",
        "type": "uint16"
      }
    ],
    "name": "updateRoyaltyInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "royaltyInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]`

const ERC721ByteCode = "0x60806040523480156200001157600080fd5b50604051620035a0380380620035a0833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011557600080fd5b838201915060208201858111156200012c57600080fd5b82518660018202830111640100000000821117156200014a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200018057808201518184015260208101905062000163565b50505050905090810190601f168015620001ae5780820380516001836020036101000a031916815260200191505b506040525050508181620001cf6301ffc9a760e01b6200030460201b60201c565b8160069080519060200190620001e792919062000415565b5080600790805190602001906200020092919062000415565b50620002196380ac58cd60e01b6200030460201b60201c565b62000231635b5e139f60e01b6200030460201b60201c565b6200024963780e9d6360e01b6200030460201b60201c565b505060006200025d6200040d60201b60201c565b905080600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050620004bb565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415620003a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433136353a20696e76616c696420696e746572666163652069640000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600033905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200045857805160ff191683800117855562000489565b8280016001018555821562000489579182015b82811115620004885782518255916020019190600101906200046b565b5b5090506200049891906200049c565b5090565b5b80821115620004b75760008160009055506001016200049d565b5090565b6130d580620004cb6000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80636c0360eb116100b8578063a22cb4651161007c578063a22cb4651461065a578063b88d4fde146106aa578063c87b56dd146107af578063d0def52114610856578063e985e9c514610945578063f2fde38b146109bf57610137565b80636c0360eb146104be57806370a0823114610541578063715018a6146105995780638da5cb5b146105a357806395d89b41146105d757610137565b806323b872dd116100ff57806323b872dd146102e65780632f745c591461035457806342842e0e146103b65780634f6ccce7146104245780636352211e1461046657610137565b806301ffc9a71461013c57806306fdde031461019f578063081812fc14610222578063095ea7b31461027a57806318160ddd146102c8575b600080fd5b6101876004803603602081101561015257600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610a03565b60405180821515815260200191505060405180910390f35b6101a7610a6a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101e75780820151818401526020810190506101cc565b50505050905090810190601f1680156102145780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61024e6004803603602081101561023857600080fd5b8101908080359060200190929190505050610b0c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102c66004803603604081101561029057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ba7565b005b6102d0610ceb565b6040518082815260200191505060405180910390f35b610352600480360360608110156102fc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610cfc565b005b6103a06004803603604081101561036a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d72565b6040518082815260200191505060405180910390f35b610422600480360360608110156103cc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dcd565b005b6104506004803603602081101561043a57600080fd5b8101908080359060200190929190505050610ded565b6040518082815260200191505060405180910390f35b6104926004803603602081101561047c57600080fd5b8101908080359060200190929190505050610e10565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104c6610e47565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105065780820151818401526020810190506104eb565b50505050905090810190601f1680156105335780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105836004803603602081101561055757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610ee9565b6040518082815260200191505060405180910390f35b6105a1610fbe565b005b6105ab611149565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105df611173565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561061f578082015181840152602081019050610604565b50505050905090810190601f16801561064c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6106a86004803603604081101561067057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050611215565b005b6107ad600480360360808110156106c057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561072757600080fd5b82018360208201111561073957600080fd5b8035906020019184600183028401116401000000008311171561075b57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506113cb565b005b6107db600480360360208110156107c557600080fd5b8101908080359060200190929190505050611443565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561081b578082015181840152602081019050610800565b50505050905090810190601f1680156108485780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61092f6004803603604081101561086c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156108a957600080fd5b8201836020820111156108bb57600080fd5b803590602001918460018302840111640100000000831117156108dd57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061172c565b6040518082815260200191505060405180910390f35b6109a76004803603604081101561095b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061182e565b60405180821515815260200191505060405180910390f35b610a01600480360360208110156109d557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506118c2565b005b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b606060068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b025780601f10610ad757610100808354040283529160200191610b02565b820191906000526020600020905b815481529060010190602001808311610ae557829003601f168201915b5050505050905090565b6000610b1782611ad2565b610b6c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612f9e602c913960400191505060405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610bb282610e10565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c39576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061304e6021913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610c58611aef565b73ffffffffffffffffffffffffffffffffffffffff161480610c875750610c8681610c81611aef565b61182e565b5b610cdc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526038815260200180612ef16038913960400191505060405180910390fd5b610ce68383611af7565b505050565b6000610cf76002611bb0565b905090565b610d0d610d07611aef565b82611bc5565b610d62576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603181526020018061306f6031913960400191505060405180910390fd5b610d6d838383611cb9565b505050565b6000610dc582600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611efc90919063ffffffff16565b905092915050565b610de8838383604051806020016040528060008152506113cb565b505050565b600080610e04836002611f1690919063ffffffff16565b50905080915050919050565b6000610e4082604051806060016040528060298152602001612f53602991396002611f429092919063ffffffff16565b9050919050565b606060098054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610edf5780601f10610eb457610100808354040283529160200191610edf565b820191906000526020600020905b815481529060010190602001808311610ec257829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f70576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180612f29602a913960400191505060405180910390fd5b610fb7600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611f61565b9050919050565b610fc6611aef565b73ffffffffffffffffffffffffffffffffffffffff16600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611088576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060078054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561120b5780601f106111e05761010080835404028352916020019161120b565b820191906000526020600020905b8154815290600101906020018083116111ee57829003601f168201915b5050505050905090565b61121d611aef565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156112be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4552433732313a20617070726f766520746f2063616c6c65720000000000000081525060200191505060405180910390fd5b80600560006112cb611aef565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16611378611aef565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b6113dc6113d6611aef565b83611bc5565b611431576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603181526020018061306f6031913960400191505060405180910390fd5b61143d84848484611f76565b50505050565b606061144e82611ad2565b6114a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f81526020018061301f602f913960400191505060405180910390fd5b6060600860008481526020019081526020016000208054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561154c5780601f106115215761010080835404028352916020019161154c565b820191906000526020600020905b81548152906001019060200180831161152f57829003601f168201915b5050505050905060006009805460018160011615610100020316600290049050141561157b5780915050611727565b6000815111156116545760098160405160200180838054600181600116156101000203166002900480156115e65780601f106115c45761010080835404028352918201916115e6565b820191906000526020600020905b8154815290600101906020018083116115d2575b505082805190602001908083835b6020831061161757805182526020820191506020810190506020830392506115f4565b6001836020036101000a03801982511681845116808217855250505050505090500192505050604051602081830303815290604052915050611727565b600961165f84611fe8565b60405160200180838054600181600116156101000203166002900480156116bd5780601f1061169b5761010080835404028352918201916116bd565b820191906000526020600020905b8154815290600101906020018083116116a9575b505082805190602001908083835b602083106116ee57805182526020820191506020810190506020830392506116cb565b6001836020036101000a038019825116818451168082178552505050505050905001925050506040516020818303038152906040529150505b919050565b6000611736611aef565b73ffffffffffffffffffffffffffffffffffffffff16600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146117f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b611802600b61212f565b600061180e600b612145565b905061181a8482612153565b6118248184612347565b8091505092915050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6118ca611aef565b73ffffffffffffffffffffffffffffffffffffffff16600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461198c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611a12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180612e7b6026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000611ae88260026123d190919063ffffffff16565b9050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16611b6a83610e10565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000611bbe826000016123eb565b9050919050565b6000611bd082611ad2565b611c25576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612ec5602c913960400191505060405180910390fd5b6000611c3083610e10565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611c9f57508373ffffffffffffffffffffffffffffffffffffffff16611c8784610b0c565b73ffffffffffffffffffffffffffffffffffffffff16145b80611cb05750611caf818561182e565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16611cd982610e10565b73ffffffffffffffffffffffffffffffffffffffff1614611d45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180612ff66029913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611dcb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180612ea16024913960400191505060405180910390fd5b611dd68383836123fc565b611de1600082611af7565b611e3281600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061240190919063ffffffff16565b50611e8481600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061241b90919063ffffffff16565b50611e9b818360026124359092919063ffffffff16565b50808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000611f0b836000018361246a565b60001c905092915050565b600080600080611f2986600001866124ed565b915091508160001c8160001c9350935050509250929050565b6000611f55846000018460001b84612586565b60001c90509392505050565b6000611f6f8260000161267c565b9050919050565b611f81848484611cb9565b611f8d8484848461268d565b611fe2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180612e496032913960400191505060405180910390fd5b50505050565b60606000821415612030576040518060400160405280600181526020017f3000000000000000000000000000000000000000000000000000000000000000815250905061212a565b600082905060005b6000821461205a578080600101915050600a828161205257fe5b049150612038565b60608167ffffffffffffffff8111801561207357600080fd5b506040519080825280601f01601f1916602001820160405280156120a65781602001600182028036833780820191505090505b50905060006001830390508593505b6000841461212257600a84816120c757fe5b0660300160f81b828280600190039350815181106120e157fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a848161211a57fe5b0493506120b5565b819450505050505b919050565b6001816000016000828254019250508190555050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156121f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4552433732313a206d696e7420746f20746865207a65726f206164647265737381525060200191505060405180910390fd5b6121ff81611ad2565b15612272576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000081525060200191505060405180910390fd5b61227e600083836123fc565b6122cf81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061241b90919063ffffffff16565b506122e6818360026124359092919063ffffffff16565b50808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b61235082611ad2565b6123a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612fca602c913960400191505060405180910390fd5b806008600084815260200190815260200160002090805190602001906123cc929190612d89565b505050565b60006123e3836000018360001b6128a6565b905092915050565b600081600001805490509050919050565b505050565b6000612413836000018360001b6128c9565b905092915050565b600061242d836000018360001b6129b1565b905092915050565b6000612461846000018460001b8473ffffffffffffffffffffffffffffffffffffffff1660001b612a21565b90509392505050565b6000818360000180549050116124cb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612e276022913960400191505060405180910390fd5b8260000182815481106124da57fe5b9060005260206000200154905092915050565b6000808284600001805490501161254f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612f7c6022913960400191505060405180910390fd5b600084600001848154811061256057fe5b906000526020600020906002020190508060000154816001015492509250509250929050565b6000808460010160008581526020019081526020016000205490506000811415839061264d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156126125780820151818401526020810190506125f7565b50505050905090810190601f16801561263f5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5084600001600182038154811061266057fe5b9060005260206000209060020201600101549150509392505050565b600081600001805490509050919050565b60006126ae8473ffffffffffffffffffffffffffffffffffffffff16612afd565b6126bb576001905061289e565b606061282563150b7a0260e01b6126d0611aef565b888787604051602401808573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015612754578082015181840152602081019050612739565b50505050905090810190601f1680156127815780820380516001836020036101000a031916815260200191505b5095505050505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051806060016040528060328152602001612e49603291398773ffffffffffffffffffffffffffffffffffffffff16612b489092919063ffffffff16565b9050600081806020019051602081101561283e57600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614925050505b949350505050565b600080836001016000848152602001908152602001600020541415905092915050565b600080836001016000848152602001908152602001600020549050600081146129a5576000600182039050600060018660000180549050039050600086600001828154811061291457fe5b906000526020600020015490508087600001848154811061293157fe5b906000526020600020018190555060018301876001016000838152602001908152602001600020819055508660000180548061296957fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506129ab565b60009150505b92915050565b60006129bd8383612b60565b612a16578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050612a1b565b600090505b92915050565b6000808460010160008581526020019081526020016000205490506000811415612ac857846000016040518060400160405280868152602001858152509080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001556020820151816001015550508460000180549050856001016000868152602001908152602001600020819055506001915050612af6565b82856000016001830381548110612adb57fe5b90600052602060002090600202016001018190555060009150505b9392505050565b60008060007fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060001b9050833f9150808214158015612b3f57506000801b8214155b92505050919050565b6060612b578484600085612b83565b90509392505050565b600080836001016000848152602001908152602001600020541415905092915050565b6060612b8e85612afd565b612c00576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000081525060200191505060405180910390fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b60208310612c505780518252602082019150602081019050602083039250612c2d565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114612cb2576040519150601f19603f3d011682016040523d82523d6000602084013e612cb7565b606091505b50915091508115612ccc578092505050612d81565b600081511115612cdf5780518082602001fd5b836040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612d46578082015181840152602081019050612d2b565b50505050905090810190601f168015612d735780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b949350505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10612dca57805160ff1916838001178555612df8565b82800160010185558215612df8579182015b82811115612df7578251825591602001919060010190612ddc565b5b509050612e059190612e09565b5090565b5b80821115612e22576000816000905550600101612e0a565b509056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e64734552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732314d657461646174613a2055524920736574206f66206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a264697066735822122090e400b4dddaa4ac56b17420904bffcc21a67cbada201c49d35222f094bc3b2d64736f6c63430007030033"

const PropyAddressControllerABI = `[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_propyControllerAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "AddressDelisted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "AddressVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "VERIFIER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRoleMember",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleMemberCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "verifiedRecipients",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "setVerifiedAddressMeta",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_verified",
        "type": "bool"
      }
    ],
    "name": "setVerifiedAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "verifyHash",
    "outputs": [
      {
        "internalType": "address",
        "name": "signer",
        "type": "address"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "checkAddress",
        "type": "address"
      }
    ],
    "name": "isVerified",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]`

const BidWhitelistABI = `[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "whitelistAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "WhitelistStatusSet",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WHITELISTER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "_whitelisters",
        "type": "address[]"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isInitialized",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isWhitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_status",
        "type": "bool"
      }
    ],
    "name": "setWhitelistStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]`

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  xDai = 100,
  Localhost = 1337,
}

const NftContractAddresses = {
  // 1: '0x2dbC375B35c5A2B6E36A386c8006168b686b70D3', // old non-2981
  // 1: '0x97cFad0B1625423ee88f76ebbF394CB74Aa54175',
  1: {
    'pDeedNFT': '0x47fbCb84eF3813FF19E2991D83444bD7bb6c301d',
    'pNFT': '0x97cFad0B1625423ee88f76ebbF394CB74Aa54175',
  },
  3:  {
    'pDeedNFT': '',
    'pNFT': '',
  },
  4:  {
    'pDeedNFT': '',
    'pNFT': '',
  },
  // 4: '0x43af1504E26110Ee0a5cb43d0F25d2E97aBF9171', // old non-2981
  // 4: '0x27bE8c99F3cac85ED8496883CcB9a63D564Ad7c3',
  5: {
    'pDeedNFT': '0x4680D93361bbB872D6Bc65c3160EF8AA40987567',
    'pNFT': '0x162862fe805c9e454B03a917e77a3988572Be731',
  },
  42:  {
    'pDeedNFT': '',
    'pNFT': '',
  },
  100:  {
    'pDeedNFT': '',
    'pNFT': '',
  },
  1337:  {
    'pDeedNFT': '',
    'pNFT': '',
  },
}

const AccessControllerAddresses = {
  1: '0xe8076bbf5fbe67b3370a04b23e0193dc1beca1d8',
  3: '',
  4: '0x8CE3FcAC8Df9F3C0dA5b45181D849D8D9a6F4DBC',
  5: '0xbEcA655Fa9B1Cf7Fe4Ffb6Eee34cAF1C140A93b8',
  42: '',
  100: '',
  1337: '',
}

const WhitelistAddresses = {
  1: '0xBE2779646C64e0f7111F4Dd32f3a6940B4717629',
  3: '',
  4: '0xBFE0783A932F5e05BD91c642Fef4f560A5A1282B',
  5: '',
  42: '',
  100: '',
  1337: '',
}

const CHAIN_NAMES = {
  [ChainId.Mainnet]: 'Mainnet',
  [ChainId.Ropsten]: 'Ropsten',
  [ChainId.Kovan]: 'Kovan',
  [ChainId.Rinkeby]: 'Rinkeby',
  [ChainId.Goerli]: 'Goerli',
  [ChainId.xDai]: 'xDai',
  [ChainId.Localhost]: 'Localhost',
}

export {
  ERC721ABI,
  ERC721ByteCode,
  PropyAddressControllerABI,
  BidWhitelistABI,
  CHAIN_NAMES,
  WhitelistAddresses,
  NftContractAddresses,
  AccessControllerAddresses
}