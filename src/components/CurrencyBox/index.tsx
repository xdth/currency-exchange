import React from 'react';
import { Container, Select } from './styles';

interface IProps {
  [key: string]: any;
};

interface ICurrency {
  code: string;
  value: number | string;
}

const CurrencyBox: React.FC<IProps> = (props) => {

  const {
    amount,
    allRates,
    onChangeAmount,
    selected
  } = props;

  const onChangeCurrency = props.onChangeCurrencyBox1 || props.onChangeCurrencyBox2;

  return (
    <>
      <Container>
        
        <input
          type="number"
          className="input"
          value={amount}
          onChange={onChangeAmount}
        />

        <Select name="cars" id="cars" value={selected} onChange={onChangeCurrency} >
          {allRates && allRates.map((currency: ICurrency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </Select>
      </Container>
    </>
  );
}
 
export default CurrencyBox;