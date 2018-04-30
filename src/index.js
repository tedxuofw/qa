import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Switch } from 'react-router-dom';
import history from './components/history'

import Ask from './pages/ask.js';
import Thank from './pages/thank.js';
import Admin from './pages/admin.js';


class App extends React.Component {
	render() { 
        
		return (
			<Router history={history}>
				<Switch> 
					<Route exact path='/ask' component={Ask}/>
                    <Route exact path='/thank' component={Thank}/>
                    <Route exact path='/tedadmin2' component={Admin}/>
                </Switch>
			</Router>
        );
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

// Hot-loading
registerServiceWorker();