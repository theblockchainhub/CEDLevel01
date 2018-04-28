const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledOrganicChecker = require('./build/OrganicChecker.json');
const config = require('../config.json');

const mneumonic = config.MNEUMONIC;
const url = config.URL;

const provider = new HDWalletProvider(
  mneumonic,
  url
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to depoy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledOrganicChecker.interface))
    .deploy({ data: compiledOrganicChecker.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to: ', result.options.address);
};
deploy();
