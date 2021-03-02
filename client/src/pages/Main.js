import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";
import Logo from "../components/Logo";
import { factory, getAccount } from "../contracts";
import JSONTree from "react-json-tree";
import Button from "../components/Button";

const HomeTransaction = ({ homeTransaction, index }) => {
  const [city, setCity] = useState();
  const [picture, setPicture] = useState();
  const [stateSelling, setStateSelling] = useState();
  const [seller, setSeller] = useState();
  const [price, setPrice] = useState();
  const [tokenId, setTokenId] = useState();
  console.log(homeTransaction, "homeTransaction");

  useEffect(() => {
    (async () => {
      if (homeTransaction) {
        const city = await homeTransaction.methods.city().call();
        const picture = await homeTransaction.methods.picture().call();
        const stateSell = await homeTransaction.methods.contractState().call();
        const seller = await homeTransaction.methods.seller().call();
        const price = await homeTransaction.methods.price().call();
        const tokenId = await homeTransaction.methods.tokenId().call();
        setTokenId(tokenId);
        setCity(city);
        setPicture(picture);
        setStateSelling(stateSell);
        setSeller(seller);
        setPrice(price);
      }
    })();
  }, [homeTransaction]);
  return (
    <Link to={`/${index}`} key={index}>
      <div className="Contract">
        <div className="Contract-content">
          <div className="Contract-contentTitle">{`Contract #${index}`}</div>
          <span className="Contract-contentObject">
            {city}- {price}Ether
          </span>
          <p>TOKEN ID : {tokenId}</p>

          {stateSelling == 1 ? (
            <p style={{ color: "red" }}>Pas à vendre</p>
          ) : (
            <p style={{ color: "green" }}>à vendre</p>
          )}
        </div>
        <img src={picture} style={{ width: "100%", height: "90px" }} />
        <p>Propriétaire :</p>
        <span className="Contract-addr">{seller}</span>
      </div>
    </Link>
  );
};

const Main = ({ contracts, homeTransactions }) => {
  const [form, setForm] = useState({});

  const createContract = async () => {
    const from = await getAccount();

    factory.methods
      .create(
        form.address,
        form.picture,
        form.city,
        form.realtorFee,
        form.price
      )
      .send({ from });
  };

  return (
    <div className="Main">
      <h1 className="Main-title">Tous les contrats</h1>{" "}
      <div>
        <p>Entrer les détails du nouvel appartement pour le contrat</p>
        <div className="Contract-form">
          <input
            className="Contract-formInput"
            placeholder="Adresse"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            value={form.address || ""}
          />
          <input
            className="Contract-formInput"
            placeholder="Photo"
            onChange={(e) => setForm({ ...form, picture: e.target.value })}
            value={form.picture || ""}
          />
          <input
            className="Contract-formInput"
            placeholder="Ville"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            value={form.city || ""}
          />
          <input
            className="Contract-formInput"
            placeholder="Commision lors de la vente"
            onChange={(e) => setForm({ ...form, realtorFee: e.target.value })}
            value={form.realtorFee || ""}
          />
          <input
            className="Contract-formInput"
            placeholder="Prix de vente"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            value={form.price || ""}
          />
        </div>
        <Button className="Contract-createBtn" onClick={() => createContract()}>
          Create contract
        </Button>
      </div>
      <div className="Contracts">
        {homeTransactions &&
          homeTransactions.map((homeTransaction, index) => (
            <HomeTransaction
              key={index}
              homeTransaction={homeTransaction}
              index={index}
            />
          ))}
      </div>
    </div>
  );
};

export default Main;
