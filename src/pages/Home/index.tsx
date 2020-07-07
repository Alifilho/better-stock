import React, { useEffect, useState } from "react";

import api from "../../services/api";

import Stock from "../../@types/stock";

import "./styles.css";

const Home = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    async function loadData() {
      await api
        .post("/stock")
        .then((response) => {
          setStocks(response.data);
        })
        .catch((error) => console.log(error));
    }

    loadData();
  }, []);

  return (
    <div className="home">
      <ul className="stocks-list">
        <h1 className="title">Bests Stocks to buy today:</h1>
        {stocks.map((stock) => (
          <div className="stock-item" key={stock.phone}>
            <li>
              <img
                className="stock-image"
                src={stock.logo_url}
                alt={stock.shortName}
              />
            </li>
            <div className="stock-info">
              <li className="stock-title">{stock.longName}</li>
              <li>Webstite: {stock.website}</li>
              <li>Stock: {stock.symbol}</li>
              <li>Phone: {stock.phone}</li>
              <li>Sector: {stock.sector}</li>
              <li>
                Adress: {stock.city}, {stock.country}
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
