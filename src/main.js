import React from 'npm:react'
import ReactDOM from 'npm:react-dom'
import {Provider} from 'npm:react-redux'
import Routes from './components/Routes'
import {store} from './reducers'

ReactDOM.render(<Provider store={store}><Routes /></Provider>, document.getElementById('main'));