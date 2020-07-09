import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
  className: 'collapse navbar-collapse',
})``;

const List = styled.ul.attrs({
  className: 'navbar-nav mr-auto',
})``;

const Item = styled.li.attrs({
  className: 'nav-item',
})``;

const Links = () => {
  return (
    <React.Fragment>
      <Link to="/" className="navbar-brand">
        MeCorp
      </Link>
      <Collapse>
        <List>
          <Item className="dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Add Transactions
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link to="/upload" className="dropdown-item">
                  Upload Transactions
                </Link>
              </li>
              <li>
                <Link to="/create" className="dropdown-item">
                  Create Transactions
                </Link>
              </li>
            </ul>
          </Item>
          <Item>
            <Link to="/view" className="nav-link">
              View Transactions
            </Link>
          </Item>
          <Item>
            <Link to="/manage" className="nav-link">
              Manage Transactions
            </Link>
          </Item>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default Links;
