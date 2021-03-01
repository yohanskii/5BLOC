import React, { useState, useEffect } from "react";
import "./Buyer.scss";
import Button from "./Button";
import { getAccount, toWei } from "../contracts";

const Buyer = ({ instance, contractState, price }) => {
  console.log(contractState, "contractState");
  console.log(instance, "instance");
  const buyerFinalizeTransaction = async () => {
    const account = await getAccount();
    instance.methods.buyerFinalizeTransaction().send({
      from: account,
      gas: 160000,
      value: toWei(price),
    });
  };

  return (
    <div className="Buyer">
      <div>
        {contractState == 1 ? (
          <p style={{ color: "red" }}>Pas à vendre</p>
        ) : (
          <Button
            className="Buyer-signBtn"
            onClick={() => buyerFinalizeTransaction()}
          >
            Acheter
          </Button>
        )}
      </div>
    </div>
  );
};

export default Buyer;
