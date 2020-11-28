import React from 'react';
import { Container, Logo, Menu, MenuItem } from './styles';
 
const Navbar: React.FC = () => {
  return (
    <>
      <Container>
        <Logo>dth|CurrencyConverter</Logo>
        <Menu>
          <MenuItem>GitHub</MenuItem>
          <MenuItem>About</MenuItem>
        </Menu>
      </Container>
    </>
  );
}
 
export default Navbar;