import React, { useState, useEffect } from "react";

import AppRouter from "./AppRouter.js";
import { getAccount, getHomeTransactions } from "./contracts";

import "./App.css";
import Web3Data from "./components/Web3Data.js";
import { useWeb3 } from "@openzeppelin/network/react";
const infuraProjectId = "af5d20278ea542a091bb19688e414e0a";

const App = () => {
  const web3Context = useWeb3(
    `wss://mainnet.infura.io/ws/v3/${infuraProjectId}`
  );

  const [state, setState] = useState({
    account: null,
    homeTransactions: null,
    web3error: null,
  });
  useEffect(() => {
    const exec = async () => {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
      } catch (error) {
        console.error("FAIL");
      }

      try {
        const account = await getAccount();
        console.log(account, "Account");
        const homeTransactions = await getHomeTransactions();
        console.log(homeTransactions, "Home stransactions");
        setState({ homeTransactions, account });
      } catch (e) {
        setState({ web3error: e });
      }
    };

    exec();
  }, []);

  const { account, homeTransactions, web3error } = state;

  return (
    <>
      <Web3Data title="Votre compte" web3Context={web3Context} />
      <AppRouter
        account={account}
        homeTransactions={homeTransactions}
        web3error={web3error}
      />
    </>
  );
};

export default App;
