import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'react-dates/initialize';
import '../../node_modules/react-vis/dist/style.css';
import NavBar from './common/NavBar';
import Dashboard from './dashboard/Dashboard';
import ImportTransactions from './upload-transactions/import/ImportTransactions';
import AddTransactions from './upload-transactions/manual/AddTransactions';
import ViewTransactions from './view-transactions/ViewTransactions';
import ManageTransactions from './manage-transactions/ManageTransactions';
import UpdateTransaction from './manage-transactions/UpdateTransaction';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/upload" component={ImportTransactions} />
          <Route path="/create" component={AddTransactions} />
          <Route path="/view" component={ViewTransactions} />
          <Route exact path="/manage" component={ManageTransactions} />
          <Route path="/manage/update/:id" component={UpdateTransaction} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
