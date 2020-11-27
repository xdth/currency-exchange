import React, { useEffect, useState } from 'react';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import CurrencyBox from './components/CurrencyBox';

interface ICurrency {
  code: string;
  value: number | string;
}
 
const App: React.FC = () => {
  const [rates, setRates] = useState<ICurrency[]>();
  const [amountBox1, setAmountBox1] = useState<number | null>(1)
  const [amountBox2, setAmountBox2] = useState<number | null>(0)
  const [currencyBox1, setCurrencyBox1] = useState<string | null>('EUR')
  const [currencyBox2, setCurrencyBox2] = useState<string | null>('USD')

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
              code: `${key}`,
              value: `${data.rates[key]}`
            });
          }
        }
        // the base currency is always the first value in the array
        ratesArray.unshift({
          code: data.base,
          value: 1
        });

        setRates(ratesArray);
      } catch(err) {
        throw new Error("The rates service is temporarily unavailable. Please try later.");
      }
    }

    fetchRates();
  }, []);

  useEffect(() => {
    // if the conversion is from BASE to X, just multiply value of base * the rate from currencyBox2
    if (amountBox1 && currencyBox1 === 'EUR') {
      const conversionCurrency = rates?.find(currency => currency.code === currencyBox2);
      const conversionRate = conversionCurrency?.value || false;

      console.log(amountBox1 * Number(conversionRate));
      
      conversionRate && setAmountBox2(amountBox1 * Number(conversionRate));
      return;
    }

    // if it's from X to BASE, USD value / USD rate
    if (amountBox1 && currencyBox2 === 'EUR') {
      const conversionCurrency = rates?.find(currency => currency.code === currencyBox1);
      const conversionRate = conversionCurrency?.value || false;

      console.log(amountBox1 / Number(conversionRate));
      
      conversionRate && setAmountBox2(amountBox1 / Number(conversionRate));

      return;
    }

    // if neither currency is base
    if (amountBox1 && currencyBox1 !== 'EUR' && currencyBox2 !== 'EUR') {
      const conversionCurrency = rates?.find(currency => currency.code === currencyBox1);
      const conversionRate = conversionCurrency?.value || false;
      const base = amountBox1 / Number(conversionRate) 
      console.log(amountBox1 / Number(conversionRate));


      const conversionCurrency2 = rates?.find(currency => currency.code === currencyBox2);
      const conversionRate2 = conversionCurrency2?.value || false;
      const converted = base * Number(conversionRate2);
      console.log(base * Number(conversionRate2));
      
      conversionRate && setAmountBox2(converted);

      return;
    }

    
  }, [currencyBox1, amountBox1, currencyBox2, amountBox2, rates]);
  

  function handleAmountChangeBox1(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("ran handleAmountChangeBox1");
    
    setAmountBox1(parseInt(e.target.value));
  }

  function handleAmountChangeBox2(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("ran handleAmountChangeBox2");
    setAmountBox2(parseInt(e.target.value));
  }

  function handleCurrencyChangeBox1(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("ran handleCurrencyChangeBox1");
    setCurrencyBox1(e.target.value);
  }

  function handleCurrencyChangeBox2(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("ran handleCurrencyChangeBox2");
    setCurrencyBox2(e.target.value);
  }

  function handleToggleValues() {
    const oldAmountFrom = amountBox1;
    const oldAmountTo = amountBox2;
    const oldCurrencyFrom = currencyBox1;
    const oldCurrencyTo = currencyBox2;

    setAmountBox1(oldAmountTo);
    setAmountBox2(oldAmountFrom);
    setCurrencyBox1(oldCurrencyTo);
    setCurrencyBox2(oldCurrencyFrom);
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
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

      {rates && rates.map(currency => (
        <div key={currency.code}>
          <strong>{currency.code} - {currency.value}</strong>
        </div>
      ))}
    </>
  );
}

export default App;