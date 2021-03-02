import Web3 from "web3";
import Factory from "./contracts/Factory.json";
import HomeTransaction from "./contracts/HomeTransaction.json";

const web3 = new Web3(window.ethereum);

export const factory = new web3.eth.Contract(
  Factory.abi,
  "0x8c9a81C5F99Df3Ba66163b4dC78ca7B531a01EFd"
);

export const getAccount = async () => (await web3.eth.getAccounts())[0];
export const toWei = (amount) => web3.utils.toWei(amount, "ether");
export const getHomeTransactions = async () =>
  (await factory.methods.getInstances().call()).map(
    (contract) => new web3.eth.Contract(HomeTransaction.abi, contract)
  );
