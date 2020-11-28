import React from 'react';
import { Container, Select } from './styles';

interface ICurrency {
  code: string;
  value: number | string;
}

interface IProps {
  amount: number;
  allRates: ICurrency[] | undefined;
  onChangeAmount(event: React.ChangeEvent<HTMLInputElement>): void;
  onChangeCurrencyBox1?(event: React.ChangeEvent<HTMLSelectElement>): void;
  onChangeCurrencyBox2?(event: React.ChangeEvent<HTMLSelectElement>): void;
  selected: string;
};

// interface IProps {
//   [key: string]: any;
// };

const CurrencyBox: React.FC<IProps> = (props) => {

  console.log(props);
  
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

        <Select value={selected} onChange={onChangeCurrency} >
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