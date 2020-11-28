import React, { useEffect, useState } from 'react';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import CurrencyBox from './components/CurrencyBox';

interface ICurrency {
  code: string;
  value: number;
}
 
interface IStoredData {
  rates: ICurrency[];
  ratesUpdatedOn: number;
}

const App: React.FC = () => {
  const [rates, setRates] = useState<ICurrency[]>();
  const [ratesUpdatedOn, setRatesUpdatedOn] = useState<number | null>(null);
  const [amountBox1, setAmountBox1] = useState<number>(1)
  const [amountBox2, setAmountBox2] = useState<number>(0)
  const [currencyBox1, setCurrencyBox1] = useState<string>('EUR')
  const [currencyBox2, setCurrencyBox2] = useState<string>('USD')

  useEffect(() => {
    if (ratesUpdatedOn) {
      localStorage.setItem('dthCurrencyConverter', JSON.stringify({rates: rates, ratesUpdatedOn: ratesUpdatedOn}));
    }
  }, [rates, ratesUpdatedOn]);

  // fetch rates
  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch(
          'https://api.exchangeratesapi.io/latest'
        );
    
        const data = await response.json();

        const ratesArray: ICurrency[] = [];

        for (let key in data.rates){
          if(data.rates.hasOwnProperty(key)){
            ratesArray.push({
              code: key,
              value: data.rates[key]
            });
          }
        }
        // the base currency is always the first value in the array
        ratesArray.unshift({
          code: data.base,
          value: 1
        });

        setRates(ratesArray);
        setRatesUpdatedOn(Date.now());
      } catch(err) {
        throw new Error("The rates service is temporarily unavailable. Please try later.");
      }
    }

    const data = localStorage.getItem('dthCurrencyConverter');
    const storedData: IStoredData = data && JSON.parse(data);

    // if there updated data in localstorage, do not call api
    if (storedData && storedData.rates && storedData.ratesUpdatedOn) {
      const timeElapsed = Date.now() - storedData.ratesUpdatedOn;
      timeElapsed < 3600000
        && setRates(storedData.rates)
        && setRatesUpdatedOn(Date.now());
      // if (timeElapsed < 3600000) {
      //   setRates(storedData.rates)
      //   setRatesUpdatedOn(Date.now());
      // }
    } else {
      // call api
      fetchRates();
    }
  }, []);

  useEffect(() => {
    // if the conversion is from BASE to X, just multiply value of base * the rate from currencyBox2
    if (amountBox1 && currencyBox1 === 'EUR') {
      const conversionCurrency = rates?.find(currency => currency.code === currencyBox2);
      const conversionRate = conversionCurrency?.value || false;
      conversionRate && setAmountBox2(roundNumber(amountBox1 * Number(conversionRate)));
      return;
    }

    // if it's from X to BASE, USD value / USD rate
    if (amountBox1 && currencyBox2 === 'EUR') {
      const conversionCurrency = rates?.find(currency => currency.code === currencyBox1);
      const conversionRate = conversionCurrency?.value || false;
      conversionRate && setAmountBox2(roundNumber(amountBox1 / Number(conversionRate)));
      return;
    }

    // if neither currency is base
    if (amountBox1 && currencyBox1 !== 'EUR' && currencyBox2 !== 'EUR') {
      const conversionCurrency = rates?.find(currency => currency.code === currencyBox1);
      const conversionRate = conversionCurrency?.value || false;
      const base = amountBox1 / Number(conversionRate) 

      const conversionCurrency2 = rates?.find(currency => currency.code === currencyBox2);
      const conversionRate2 = conversionCurrency2?.value || false;
      const converted = base * Number(conversionRate2);
      
      conversionRate && setAmountBox2(roundNumber(converted));

      return;
    }
  }, [currencyBox1, amountBox1, currencyBox2, amountBox2, rates]);
  
  function handleAmountChangeBox1(e: React.ChangeEvent<HTMLInputElement>) {
    setAmountBox1(parseFloat(e.target.value));
  }

  function handleAmountChangeBox2(e: React.ChangeEvent<HTMLInputElement>) {
    setAmountBox2(parseFloat(e.target.value));
  }

  function handleCurrencyChangeBox1(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrencyBox1(e.target.value);
  }

  function handleCurrencyChangeBox2(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrencyBox2(e.target.value);
  }

  function handleToggleValues() {
    const oldAmountBox1 = amountBox1;
    const oldAmountBox2 = amountBox2;
    const oldCurrencyBox1 = currencyBox1;
    const oldCurrencyBox2 = currencyBox2;

    setAmountBox1(oldAmountBox2);
    setAmountBox2(oldAmountBox1);
    setCurrencyBox1(oldCurrencyBox2);
    setCurrencyBox2(oldCurrencyBox1);
  }

  function roundNumber(number: number) {
    return parseFloat(number.toFixed(4));
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <section>
        <div id="converter">
          <CurrencyBox
            amount={amountBox1}
            allRates={rates}
            onChangeAmount={handleAmountChangeBox1}
            onChangeCurrencyBox1={handleCurrencyChangeBox1}
            selected={currencyBox1}
          />

          <button onClick={handleToggleValues}>
            <svg aria-hidden="true" data-id="icon-exchange" viewBox="0 0 50 47" height="32px" width="30px"><path fill="currentColor" fillRule="evenodd" d="M49.897 35.977L26.597 25v7.874H7.144v6.207h19.455v7.874zM.103 11.642l23.3 10.977v-7.874h19.454V8.538H23.402V.664z"></path></svg>
          </button>

          <CurrencyBox
            amount={amountBox2}
            allRates={rates}
            onChangeAmount={handleAmountChangeBox2}
            onChangeCurrencyBox2={handleCurrencyChangeBox2}
            selected={currencyBox2}
          />

          <div id="app-info">
            <p>Source: European Central Bank</p>
            <p>This app is updated hourly.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;