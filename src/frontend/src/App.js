import React, { Component } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  createBatchingNetworkInterface,
} from 'react-apollo'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import { Navbar, Button } from 'react-bootstrap';

import CreateView from './views/CreateView'
//import DetailView from './views/DetailView'
import ListView from './views/ListView'
import LoginView from './views/LoginView'
import LogoutView from './views/LogoutView'
import PhotoPageView from './views/PhotoPageView'
import PhotoView from './views/PhotoView'
import GalleryView from './views/GalleryView'

const networkInterface = createBatchingNetworkInterface({
  uri: 'http://localhost:8000/gql',
  batchInterval: 10,
  opts: {
    credentials: 'same-origin',
  },
})

networkInterface.use([
  {
    applyBatchMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      const token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null
      req.options.headers['authorization'] = `JWT ${token}`
      next()
    },
  },
])

const client = new ApolloClient({
  networkInterface: networkInterface,
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <header>
            <div className="logo">
                <h1>Cuzplay</h1>
            </div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/messages/create/">Create Message</Link></li>
              <li><Link to="/login/">Login</Link></li>
              <li><Link to="/logout/">Logout</Link></li>
              {/*<li><Link to="/PhotoPageView/">PhotoPageView</Link></li>*/}
              <li><Link to="/GalleryView/">GalleryView</Link></li>
            </ul>
            
            </header>
            <Route exact path="/" component={ListView} />
            <Route exact path="/login/" component={LoginView} />
            <Route exact path="/logout/" component={LogoutView} />
            {/*<Route exact path ="/PhotoPageView/" component={PhotoPageView} />*/}
            <Route exact path ="/GalleryView/" component={GalleryView} />
            <Switch>
              <Route path="/messages/create/" component={CreateView} />
              <Route path="/messages/:id/" component={PhotoView} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
