import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const gridStyle = { minHeight: 300 }

const icon = <svg key="icon" fill="#9ba7b4" style={{ verticalAlign: 'middle' }} height="24" viewBox="0 0 24 24" width="24">
  <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
  <path d="M0 0h24v24H0z" fill="none"/>
</svg>

const columns = [
  { name: 'name', header: <b>{icon} Full Name</b>, defaultFlex: 1 },
  { name: 'age', header: 'Age', defaultFlex: 1, type: 'number', filterEditor: NumberFilter }
]

const dataSource = [
  { name: 'John Grayner', age: 35, uniqueId: 1 },
  { name: 'Mary Stones', age: 25, uniqueId: 2 },
  { name: 'Robert Fil', age: 27, uniqueId: 3 },
  { name: 'Roger Bobson', age: 81, uniqueId: 4 },
  { name: 'Billary Konwik', age: 18, uniqueId: 5 },
  { name: 'Bob Martin', age: 18, uniqueId: 6 },
  { name: 'Matthew Richardson', age: 54, uniqueId: 7 },
  { name: 'Richy Peterson', age: 54, uniqueId: 8 },
  { name: 'Bryan Martin', age: 40, uniqueId: 9}
]

const filterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'age', operator: 'gte', type: 'number' }
];

const Locon = () => {

  return (
    <Fragment>
      <ContentBox className="locon">
        <ReactDataGrid
          idProperty="id"
          style={gridStyle}
          defaultFilterValue={filterValue}
          columns={columns}
          dataSource={dataSource}
          pagination
          defaultLimit={4}
        />
      </ContentBox>
    </Fragment>
  );
};

export default Locon;
