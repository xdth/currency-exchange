import styled from 'styled-components';
 
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  color: #F1F1F1;
  /* background-color: rgba(255, 255, 255, 0.5); */
  margin: 10px;
`;

export const Select = styled.select`
  height: 100%;
  background-color:rgba(0, 0, 0, 0.5);
  color: #F1F1F1;
  padding: 0 10px;
  border: none;

  -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
`;

export const Input = styled.input`
  background-color:rgba(0, 0, 0, 0.5);
  color: #F1F1F1;
  height: 100%;
  padding: 0 10px;
  border: none;
`;