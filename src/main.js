import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Routes from './components/Routes'
import {store} from './reducers'

ReactDOM.render(<Provider store={store}><Routes /></Provider>, document.getElementById('main'));