import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Ask from './pages/ask.js';

class App extends React.Component {
	render() { 
		return (
			<BrowserRouter>
				<Switch> 
					<Route exact path='/' component={Ask}/>
                </Switch>
			</BrowserRouter>
        );
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

// Hot-loading
registerServiceWorker();