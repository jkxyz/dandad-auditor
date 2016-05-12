import React from 'react'
import { connect } from 'react-redux'
import displayValue from '../utils/displayValue'
import mapValues from '../utils/mapValues'
import _ from 'lodash'

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

let TableHeader = ({ columns }) => (
  <thead><tr>{ mapValues(columns, (c, k) => <th key={ k }>{ c }</th>) }</tr></thead>
)

let TableRow = ({ columns, row }) => (
  <tr>
    { Object.keys(columns).map(k => <td key={ k }>{ displayValue(row[k]) }</td>) }
  </tr>
)

let TableBody = ({ columns, list }) => (
  <tbody>
    { list.map(row => <TableRow key={ row.id } columns={ columns } row={ row } />) }
  </tbody>
)

export default connect(mapStateToProps, mapDispatchToProps)(
  React.createClass({
    getInitialState () {
      return { list: this.props.getList(this.props.prefix) }
    },
    componentWillReceiveProps (nextProps) {
      this.setState({ list: nextProps.getList(nextProps.prefix) })
    },
    shouldComponentUpdate (nextProps, nextState) {
      return !_.isEqual(nextProps.getList(nextProps.prefix), this.state.list)
    },
    render () {
      return (
        <div className='uk-overflow-container'>
          <table className='uk-table'>
            <TableHeader columns={ this.props.columns } />
            <TableBody columns={ this.props.columns } list={ this.state.list } />
          </table>
        </div>
      )
    }
  })
)
