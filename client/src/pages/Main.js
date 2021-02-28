import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";
import Logo from "../components/Logo";
import { factory, getAccount } from "../contracts";
import JSONTree from "react-json-tree";
import Button from "../components/Button";

const HomeTransaction = ({ homeTransaction, index }) => {
  const [city, setCity] = useState();
  console.log(homeTransaction, "homeTransaction");
  useEffect(() => {
    (async () => {
      if (homeTransaction) {
        const city = await homeTransaction.methods.city().call();

        setCity(city);
      }
    })();
  }, [homeTransaction]);
  return (
    <Link to={`/${index}`} key={index}>
      <div className="Contract">
        <div className="Contract-content">
          <div className="Contract-contentTitle">{`Contract #${index}`}</div>
          <span className="Contract-contentObject">{city}</span>
        </div>
        <span className="Contract-addr">{homeTransaction.options.address}</span>
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
        form.zip,
        form.city,
        form.realtorFee,
        form.price,
        form.seller,
        form.buyer
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
            value={form.address}
          />
          <input
            className="Contract-formInput"
            placeholder="Code postal"
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
            value={form.zip}
          />
          <input
            className="Contract-formInput"
            placeholder="Ville"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            value={form.city}
          />
          <input
            className="Contract-formInput"
            placeholder="Commision lors de la vente"
            onChange={(e) => setForm({ ...form, realtorFee: e.target.value })}
            value={form.realtorFee}
          />
          <input
            className="Contract-formInput"
            placeholder="Prix de vente"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            value={form.price}
          />
          <input
            className="Contract-formInput"
            placeholder="Seller address"
            onChange={(e) => setForm({ ...form, seller: e.target.value })}
            value={form.seller}
          />
          <input
            className="Contract-formInput"
            placeholder="Buyer address"
            onChange={(e) => setForm({ ...form, buyer: e.target.value })}
            value={form.buyer}
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
