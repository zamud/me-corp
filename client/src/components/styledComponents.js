import styled from 'styled-components';

export const HeaderRow = styled.div.attrs({
  className: 'row mt-2 bg-secondary text-white font-weight-bold',
})`
  padding: 8px 0 8px 0;
`;

export const TransactionRow = styled.div.attrs({
  className: 'row border-top font-weight-bold',
})`
  padding: 8px 0 8px 0;
  color: ${(props) => (props.isIncome ? 'green' : 'black')};
`;

export const DisabledTransactionRow = styled(TransactionRow)`
  opacity: 0.4;
`;
