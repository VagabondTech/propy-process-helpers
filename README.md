# Propy Process Helpers

Helper tooling to improve the ease of minting & verifying new recipients of Propy NFTs on-chain

## IPFS Metadata Hash

For the IPFS Metadata hash, this refers to the IPFS hash of the token Metadata that has been uploaded to an IPFS provider such as your own IPFS node or something like [Pinata.cloud](https://pinata.cloud/)

Here is an example of NFT metadata, the "image" property should have the `QmXa7itoeFWYsSGxJuZg2FhnUGTsnhc5YemSdzMEbBGW4F` portion of the metadata replaced with your NFT media, the rest of the content should also be adjusted to be applicable to your piece:

```
{
   "name":"The name of your NFT",
   "description":"The description of your NFT",
   "image":"ipfs://QmXa7itoeFWYsSGxJuZg2FhnUGTsnhc5YemSdzMEbBGW4F",
   "attributes":[
      {
         "trait_type":"Type",
         "value":"NFT + Physical"
      },
      {
         "trait_type":"Artist",
         "value":"The Name Of The Artist"
      },
      {
         "trait_type":"Edition",
         "value":"1/1"
      },
      {
         "trait_type":"Dimensions",
         "value":"28.6 x 19.7 x 5 cm / 11.25 x 7.75 x 2 in"
      },
      {
         "trait_type":"Case Dimensions",
         "value":"33.02 x 22.23 x 6.99 cm / 13 x 8.75 x 2.75 in"
      },
      {
         "trait_type":"Medium",
         "value":"Acrylic & Ink"
      },
      {
         "trait_type":"Support",
         "value":"Canvas"
      }
   ]
}
```

Uploading the following JSON data to IPFS will return a hash, in this case `QmbAywJY1pvRkzUBAtDrRXBcT5agncKhmy1PcA1877xxth` which resolves to [this](https://vagabond.mypinata.cloud/ipfs/QmbAywJY1pvRkzUBAtDrRXBcT5agncKhmy1PcA1877xxth), this `QmbAywJY1pvRkzUBAtDrRXBcT5agncKhmy1PcA1877xxth` would then be used in the `Metadata IPFS Hash` field on the minting page (the tokenURI could be stored on-chain as either `ipfs://QmbAywJY1pvRkzUBAtDrRXBcT5agncKhmy1PcA1877xxth` or `https://vagabond.mypinata.cloud/ipfs/QmbAywJY1pvRkzUBAtDrRXBcT5agncKhmy1PcA1877xxth`, it's up to you to decide whether to make use of plain `ipfs://<IPFS-HASH>` URLs or if you would rather point to your own node endpoint, most decent parses should be able to extract the IPFS hash from a URL which points to your own IPFS node, but if you would rather not rely on that, use the `ipfs://<IPFS-HASH>` value as the tokenURI).

## Environment Variables

If you have an Infura API key, add it to the `.env.sample` file and then rename the file to `.env`

## Install Dependencies

### `yarn`

## Start app

### `npm start` or `yarn start`

## Supported Networks

- Ethereum Mainnet
