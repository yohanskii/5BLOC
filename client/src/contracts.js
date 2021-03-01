import Web3 from "web3";
import Factory from "./contracts/Factory.json";
import HomeTransaction from "./contracts/HomeTransaction.json";

const web3 = new Web3(window.ethereum);

export const factory = new web3.eth.Contract(
  Factory.abi,
  "0xBF0339140CA55A83B8280c34639859D2b59340b6"
);

export const getAccount = async () => (await web3.eth.getAccounts())[0];
export const toWei = (amount) => web3.utils.toWei(amount, "ether");
export const getHomeTransactions = async () =>
  (await factory.methods.getInstances().call()).map(
    (contract) => new web3.eth.Contract(HomeTransaction.abi, contract)
  );
