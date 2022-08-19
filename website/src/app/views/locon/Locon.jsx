import { Card, Grid, styled, useTheme } from '@mui/material';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { Fragment } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { gql, useLazyQuery } from "@apollo/client";

import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'

const DEVICE_QUERY = gql`
query Combo($id: [ID!]) {
  combo(deviceIds: $id) {
    device_id
    comboDevice {
      device_id
      firstname
      lastname
    }
    comboUser {
      user_id
      username
      password
    }
  } 
}
`;

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));





// const columns = [
//   { name: 'device_id', header: <b>{icon} ID</b>, defaultFlex: 1 },
//   { name: 'comboUser.user_id', header: 'User ID', defaultFlex: 1, type: 'number', filterEditor: NumberFilter },
//   { name: 'comboUser.username', header: 'User Name', defaultFlex: 1 },
//   { name: 'comboUser.password', header: 'Password', defaultFlex: 1 },
//   { name: 'comboDevice.firstname', header: 'First Name', defaultFlex: 1 },
//   { name: 'comboDevice.lastname', header: 'last Name', defaultFlex: 1 },
// ]

let dataSource = [
  // { "comboUser.user_id": 1, "comboUser.username": 'John Grayner', device_id: 35, uniqueId: 10 },
  // { "comboUser.user_id": 2, "comboUser.username": 'Mary Stones', device_id: 25, uniqueId: 20 },
  // { "comboUser.user_id": 3, "comboUser.username": 'Robert Fil', device_id: 27, uniqueId: 30 },
  // { "comboUser.user_id": 4, "comboUser.username": 'Roger Bobson', device_id: 81, uniqueId: 40 },
  // { "comboUser.user_id": 5, "comboUser.username": 'Billary Konwik', device_id: 18, uniqueId: 50 },
  // { "comboUser.user_id": 6, "comboUser.username": 'Bob Martin', device_id: 18, uniqueId: 60 },
  // { "comboUser.user_id": 7, "comboUser.username": 'Matthew Richardson', device_id: 54, uniqueId: 70 },
  // { "comboUser.user_id": 8, "comboUser.username": 'Richy Peterson', device_id: 54, uniqueId: 80 },
  // { "comboUser.user_id": 9, "comboUser.username": 'Bryan Martin', device_id: 40, uniqueId: 90}
]

const filterValue = [
  { name: 'comboUser.username', operator: 'startsWith', type: 'string', value: '' },
  { name: 'comboUser.user_id', operator: 'gte', type: 'number' }
];

const flattenObject = (obj, parentKey = '') => {
  if (parentKey !== '') parentKey += '.';
  let flattened = {};
  Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, flattenObject(obj[key], parentKey + key))
      } else {
          flattened[parentKey + key] = obj[key]
      }
  })
  return flattened;
}

const gridStyle = { minHeight: 300 }

const icon = <svg key="icon" fill="#9ba7b4" style={{ verticalAlign: 'middle' }} height="24" viewBox="0 0 24 24" width="24">
  <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
  <path d="M0 0h24v24H0z" fill="none"/>
</svg>

let STORE = {
    columns: [
        { name: 'device_id',              header: <b>{icon} ID</b>,   defaultFlex: 1, visible: true },
        { name: 'comboUser.user_id',      header: 'User ID',          defaultFlex: 1, visible: true, type: 'number', filterEditor: NumberFilter },
        { name: 'comboUser.username',     header: 'User Name',        defaultFlex: 1, visible: true },
        { name: 'comboUser.password',     header: 'Password',         defaultFlex: 1, visible: true },
        { name: 'comboDevice.firstname',  header: 'First Name',       defaultFlex: 1, visible: true },
        { name: 'comboDevice.lastname',   header: 'last Name',        defaultFlex: 1, visible: true },
    ],
    sortInfo: [],
    reservedViewportWidth: 0,
    columnOrder: ['device_id','comboUser.user_id','comboUser.username','comboUser.password','comboDevice.firstname','comboDevice.lastname']
  }

  //here is one column filtering. Other have to be added
const sort = (arr, sortInfoList) => {
    arr = [].concat(arr)
    let sortInfo;
    if(sortInfoList.length>0){
      sortInfo = sortInfoList[0];
    }
    else return arr;

    if (!sortInfo) {
      return arr
    }
    return arr.sort((o1, o2) => {
      const v1 = o1[sortInfo.name]
      const v2 = o2[sortInfo.name]
  
      const result = sortInfo.type == 'number'
        ? v1 - v2
        : v1.localeCompare(v2)
  
      return result * sortInfo.dir
    })
  }

const Locon = () => {
  const [gridState, setGridState] = React.useState(dataSource);
  const initialState = Object.assign({}, STORE, {
    loading: false,
    dataSource: []
  });
  const [state, setState] = useState(initialState);

  const [getDevices, { loading, error, data }] = useLazyQuery(DEVICE_QUERY, {
    //TODO: insert parameters with devices
    variables: { id: [1,2,3,4,5,6] },
    onCompleted: (data) => {
      if (data) {
        let normalizeDS = data.combo.map(o => flattenObject(o))
        setGridState(sort(normalizeDS, state.sortInfo));
      }
    },
  });

  const saveState = () => {
    STORE = {
      reservedViewportWidth: state.reservedViewportWidth,
      columnOrder: state.columnOrder,
      columns: state.columns,
      sortInfo: state.sortInfo
    }
    setState(Object.assign({}, state, {
      savedState: JSON.stringify(STORE, null, 2)
    }))
  }

  const restoreState = () => {
    setState(Object.assign({}, state, Object.assign({}, STORE, {
      savedState: null
    })));
  }

  const onSortInfoChange = (sortInfo) => {
    setState(Object.assign({}, state, { sortInfo }));

    setGridState(sort(gridState, sortInfo));
  }

  const onColumnOrderChange = (columnOrder) => {
    setState(Object.assign({}, state, {
      columnOrder
    }));
  }

  const onColumnVisibleChange = ({column, visible}) => {
    const colsMap = state.columns.reduce((p, c) => {
      p[column.name] = { visible }
      return p
    }, {})

    const columns = state.columns.map(c => {
      if(c.name == c.name){
        return Object.assign({}, c, colsMap[c.name])
      }
      return Object.assign({}, c, c)
    })

    setState(Object.assign({}, state, {
      columns,
    }));
  }

  const onBatchColumnResize = (batchColumnInfo, {reservedViewportWidth}) => {
    const colsMap = batchColumnInfo.reduce((acc, colInfo) => {
      const { column, width, flex} = colInfo
      acc[column.name] = { width, flex}
      return acc
    }, {})

    const columns = state.columns.map(c => {
      return Object.assign({}, c, colsMap[c.name])
    })

    setState(Object.assign({}, state, {
      columns,
      reservedViewportWidth
    }))
  }

  const onLoadingChange = (loading) => {
    setState(Object.assign({}, state, { loading }));
  }

  const loadData = () => {
    getDevices();
  };

  return (
    <Fragment>
      <ContentBox className="locon">
      <Button onClick={loadData}>Pobierz</Button>
      <Button onClick={saveState}>Save State</Button>
      <Button onClick={restoreState}>Load State</Button>
        <ReactDataGrid
          idProperty="uniqueId"
          style={gridStyle}
          defaultFilterValue={filterValue}
          columns={state.columns}
          sortInfo={state.sortInfo}
          columnOrder={state.columnOrder}
          dataSource={gridState}
          pagination
          defaultLimit={4}
          reservedViewportWidth={state.reservedViewportWidth}
          onSortInfoChange={onSortInfoChange}
          onBatchColumnResize={onBatchColumnResize}
          onColumnOrderChange={onColumnOrderChange}
          onColumnVisibleChange={onColumnVisibleChange}
          onLoadingChange={onLoadingChange}
        />
      </ContentBox>
    </Fragment>
  );
};

export default Locon;
