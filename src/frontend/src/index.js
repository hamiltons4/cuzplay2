import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './bootstrap-3.3.7-dist/bootstrap-3.3.7-dist/css/bootstrap.css';
import './bootstrap-3.3.7-dist/bootstrap-3.3.7-dist/css/bootstrap-theme.css';


//further css must go below this in order to take precedence
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
