import Web3 from "web3";
import Factory from "./contracts/Factory.json";
import HomeTransaction from "./contracts/HomeTransaction.json";

const web3 = new Web3(window.ethereum);

export const factory = new web3.eth.Contract(
  Factory.abi,
  "0x79844765dA3A95DAEccEf5F1d39AAAcea7212548"
);

export const getAccount = async () => (await web3.eth.getAccounts())[0];

export const getHomeTransactions = async () =>
  (await factory.methods.getInstances().call()).map(
    (contract) => new web3.eth.Contract(HomeTransaction.abi, contract)
  );
