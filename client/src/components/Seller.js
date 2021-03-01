import React, { useState, useEffect } from "react";
import "./Seller.scss";
import { getAccount } from "../contracts";

export default function Seller({ contractState, instance }) {
  console.log(contractState, "contractState");

  const sellerToSell = async () => {
    const account = await getAccount();
    instance.methods.sellerToSell().send({ from: account });
  };

  const sellerNotToSell = async () => {
    const account = await getAccount();
    instance.methods.sellerNotToSell().send({ from: account });
  };
  return (
    <div className="Seller">
      {contractState == 1 ? (
        <>
          <button onClick={() => sellerToSell()}>Mettre en vente</button>
        </>
      ) : (
        <>
          <button onClick={() => sellerNotToSell()}>Annuler la vente</button>
        </>
      )}
    </div>
  );
}
