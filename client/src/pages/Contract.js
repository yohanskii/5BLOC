import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
import cx from "classnames";
import "./Contract.scss";
import JSONTree from "react-json-tree";
import Seller from "../components/Seller";
import Buyer from "../components/Buyer";
import Coop from "../components/Coop";

const timeline = [
  { text: "Contract created" },
  { text: "Seller sign contract" },
  { text: "Buyer sign and deposit to contract" },
  { text: "Realtor sign contract" },
  { text: "Buyer finalize transaction" },
];

export default function Contract({ homeTransaction }) {
  const { index } = useParams();

  const [city, setCity] = useState();
  const [picture, setPicture] = useState();
  const [stateSelling, setStateSelling] = useState();
  const [seller, setSeller] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    (async () => {
      if (homeTransaction) {
        const city = await homeTransaction.methods.city().call();
        const picture = await homeTransaction.methods.picture().call();
        const stateSell = await homeTransaction.methods.contractState().call();
        const seller = await homeTransaction.methods.seller().call();
        const price = await homeTransaction.methods.price().call();

        setCity(city);
        setPicture(picture);
        setStateSelling(stateSell);
        setSeller(seller);
        setPrice(price);
      }
    })();
  }, [homeTransaction]);

  console.log(homeTransaction.options);
  return (
    <div className="ContractPage">
      <div className="ContractPage-body">
        <h1>Contract</h1>
        <span className="Contract-contentObject">
          {city}- {price}Ether
        </span>
        {stateSelling == 1 ? (
          <p style={{ color: "red" }}>Pas à vendre</p>
        ) : (
          <p style={{ color: "green" }}>à vendre</p>
        )}
        <img src={picture} style={{ width: "100%", height: "90px" }} />
        <Route
          exact
          path="/:addr"
          render={() => (
            <div className="Contract-tabs">
              <Link to={`/${index}/buyer`}>Acheteur</Link>
              <Link to={`/${index}/seller`}>Vendeur</Link>
            </div>
          )}
        />
        <Route
          path="/:addr/buyer"
          render={() => (
            <Buyer
              instance={homeTransaction}
              contractState={stateSelling}
              price={price}
            />
          )}
        />
        <Route
          path="/:addr/seller"
          render={() => (
            <Seller contractState={stateSelling} instance={homeTransaction} />
          )}
        />
        <div className="Timeline"></div>
      </div>
    </div>
  );
}
