import React from 'react';
import Links from './Links';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'container',
})``;

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})``;

const NavBar = () => {
  return (
    <Container>
      <Nav>
        <Links />
      </Nav>
    </Container>
  );
};

export default NavBar;
