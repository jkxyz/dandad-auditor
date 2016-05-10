import React from 'react'
import { connect } from 'react-redux'
import displayValue from '../utils/displayValue'
import mapValues from '../utils/mapValues'

let mapStateToProps = state => {
  return {
    getList (prefix) {
      return state[prefix].list
    }
  }
}

let mapDispatchToProps = dispatch => {
  return {}
}

let TableHeader = ({ columns }) =>
  <thead>
    <tr>
      { mapValues(columns, (c, k) => <th key={ k }>{ c }</th>) }
    </tr>
  </thead>

let TableRow = ({ columns, row }) =>
  <tr>
    { Object.keys(columns).map(k => <td key={ k }>{ displayValue(row[k]) }</td>) }
  </tr>

let TableBody = ({ columns, list }) =>
  <tbody>
    { list.map(row => <TableRow key={ row.id } columns={ columns } row={ row } />) }
  </tbody>

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ prefix, columns, getList }) => {
    return (
      <table className='uk-table'>
        <TableHeader columns={ columns } />
        <TableBody columns={ columns } list={ getList(prefix) } />
      </table>
    )
  }
)
