import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Switch } from 'react-router-dom';
import history from './components/history'

import Ask from './pages/ask.js';
import Thank from './pages/thank.js';
import Admin from './pages/admin.js';
import Questions from './pages/questions.js';


class App extends React.Component {
	render() { 
        
		return (
			<Router history={history}>
				<Switch> 
					<Route path='/ask' component={Ask}/>
                    <Route path='/thank' component={Thank}/>
                    <Route path='/tedadmin2' component={Admin}/>
                    <Route path='/questions' component={Questions}/>
                </Switch>
			</Router>
        );
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

// Hot-loading
registerServiceWorker();