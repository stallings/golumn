import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Table, Column, Cell} from 'fixed-data-table';
import css from '../node_modules/fixed-data-table/dist/fixed-data-table.min.css';

const remote = window.require("electron").remote

const App = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.setState({ data: JSON.stringify(remote.getGlobal('data')) });
  },

  render: function render() {
    // Table data as a list of array.
    const rows = [
      ['a1', 'b1', 'c1'],
      ['a2', 'b2', 'c2'],
      ['a3', 'b3', 'c3'],
    ];

    return (
      <div>
        <h2>Golumn</h2>
        { this.state.data }
      </div>
    );
  }
})

// <Table
//   rowHeight={50}
//   rowsCount={rows.length}
//   width={200}
//   height={500}
//   headerHeight={50}>
//   <Column
//     header={<Cell>Col 3</Cell>}
//     cell={({rowIndex, ...props}) => (
//       <Cell {...props}>
//         Data for column 3: {rows[rowIndex][2]}
//       </Cell>
//     )}
//     width={2000}
//     />
// </Table>

export default App;
