import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import firebase from '../components/firebase.js';


class Home extends Component {
    
    constructor() {
        super();
    }
    
	askQuestion(speaker, question, contact) {
		var requests = firebase.database().ref('requests/');
        var requestKey = requests.push().key;
        console.log("Generating Request Key: " + requestKey);
        firebase.database().ref('requests/' + requestKey).set({
            speaker: speaker,
            text: question,
            contact : contact
        });        
	}
    
    // TODO: take in based on a form
    buttonRequest = () => {
        this.askQuestion(
            Math.random().toString(36).substring(8),
            Math.random().toString(36).substring(6),
            Math.random().toString(36).substring(5)
        )
    }
    
	render() {
		return (

			<MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    
                    <AppBar  
                        title="TEDxUofW 2018" 
                        titleStyle={{
                            fontSize: '16px',
                            fontWeight:'bold',
                            textAlign: 'center'
                        }}
            
                        style={{
                            boxShadow: 'none'      
                        }}            
            
                        iconClassNameRight="muidocs-icon-navigation-expand-more" 
                    />

                    <button onClick={this.test}>
                        Click Me!
                    </button>
                    
                          
                </div>
			</MuiThemeProvider>

		);
	}
}

const styles = StyleSheet.create({
    
});


const muiTheme = getMuiTheme({
    palette: {
        textColor: '#fff'
    },
    appBar: {
        color: 'rgba(230, 43, 37)',
    },
});

export default Home;