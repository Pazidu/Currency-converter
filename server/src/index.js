const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//midle wares
app.use(express.json());
app.use(cors());

//all curencies
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL =
    "https://openexchangerates.org/api/currencies.json?app_id=10af94e7a772459890948b17a9d3dce7";

  try {
    const namesResponce = await axios.get(nameURL);
    const nameData = namesResponce.data;
    return res.json(nameData);
  } catch (err) {
    console.error(err);
  }
});

//conver
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  try {
    const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=10af94e7a772459890948b17a9d3dce7`;
    const dataResponce = await axios.get(dataURL);
    const rates = dataResponce.data.rates;

    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.error(err);
  }
});

//listen port
app.listen(5000, () => {
  console.log("Server Started");
});
