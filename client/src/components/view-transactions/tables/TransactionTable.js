import React from 'react';
import DataTable from 'react-data-table-component';

const monthCols = [
  {
    name: 'January',
    selector: 'jan',
    sortable: false,
  },
  {
    name: 'February',
    selector: 'feb',
    sortable: false,
  },
  {
    name: 'March',
    selector: 'mar',
    sortable: false,
  },
  {
    name: 'April',
    selector: 'apr',
    sortable: false,
  },
  {
    name: 'May',
    selector: 'may',
    sortable: false,
  },
  {
    name: 'June',
    selector: 'jun',
    sortable: false,
  },
  {
    name: 'July',
    selector: 'jul',
    sortable: false,
  },
  {
    name: 'August',
    selector: 'aug',
    sortable: false,
  },
  {
    name: 'September',
    selector: 'sep',
    sortable: false,
  },
  {
    name: 'October',
    selector: 'oct',
    sortable: false,
  },
  {
    name: 'November',
    selector: 'nov',
    sortable: false,
  },
  {
    name: 'December',
    selector: 'dec',
    sortable: false,
  },
];

const groupColumns = [
  {
    name: '',
    selector: '',
    sortable: false,
  },
  {
    name: '',
    selector: 'group',
    sortable: true,
  },
].concat(monthCols);

const categoryColumns = [
  {
    name: 'Group',
    selector: 'group',
    sortable: true,
  },
  {
    name: 'Category',
    selector: 'displayName',
    sortable: false,
  },
].concat(monthCols);

const netColumns = [
  {
    name: '',
    selector: '',
    sortable: false,
  },
  {
    name: '',
    selector: 'row',
    sortable: false,
  },
].concat(monthCols);

const TransactionTable = ({ categoryData, groupData, netData }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            title="By Category"
            columns={categoryColumns}
            data={categoryData}
            defaultSortField="group"
            dense={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <DataTable
            title="By Group"
            columns={groupColumns}
            data={groupData}
            defaultSortField="group"
            dense={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <DataTable title="Net Income" columns={netColumns} data={netData} dense={true} />
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
