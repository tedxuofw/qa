import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import $ from 'jquery';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import firebase from '../components/firebase.js';


class Ask extends Component {
    
    constructor() {
        super();
    }
            
	askQuestion(speaker, question, contact, callback) {
		var requests = firebase.database().ref('requests/');
        var requestKey = requests.push().key;
        console.log("Generating Request Key: " + requestKey);
        firebase.database().ref('requests/' + requestKey).set({
            speaker: speaker,
            text: question,
            contact : contact
        }, callback);        
	}
    
    // TODO: take in based on a form
    buttonRequest = () => {
        this.askQuestion(
            $("#speakerSelect").val(),
            $("#questionInput").val(),
            "sohampardeshi@gmail.com",
            function() {
                $("#questionInput").val("");
            }
        );
    }
    
	render() {
		return (

			<MuiThemeProvider muiTheme={muiTheme}>
                <div className={css(styles.background)}>
                    <div className={css(styles.popup)}>
                        <div className={css(styles.topbar)}>
                            <button className={css(styles.x)}>X</button>
                        </div>
                        <div className={css(styles.container)}>
                            <div>
                                <b>What would you like to know?</b> Write a question for the speaker below. 
                                
                                <select id="speakerSelect" className={css(styles.speakerSelect)}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                            <div className={css(styles.inputContainer)}>
                                 <textarea 
                                    id="questionInput"
                                    className={css(styles.input)}    
                                    type="text" 
                                    name="questionInput"
                                    rows="14"
                                    placeholder="Ask a question...">
                                </textarea>
                            </div>
                            <center>
                            <button className={css(styles.submit)} onClick={this.buttonRequest}>
                                Submit
                            </button>
                            </center>
                        </div>
                    </div>
                </div>
			</MuiThemeProvider>

		);
	}
}

const styles = StyleSheet.create({
    background: {
        background: '#E5E5E5',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
        bottom: '0',
        right: '0'
    },
    popup: {
        background: 'white',
        height: '80%',
        marginTop: '15%',
        marginBottom: '15%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    topbar : {
        background: 'rgba(230, 43, 37)',
        height: '10%'
    },
    x:{
        float: 'right',
        color: 'white',
        background: 'none',
        border: 'none',
        height: '100%',
        width: '20%',
        fontSize: '20px'
    },
    container: {
        height: '90%',
        width: '80%',
        padding: '10%'
    },
    inputContainer : {
        marginTop: '20px',
    },
    input: {
        width: '90%',
        background: '#f5f5f5',
        border: 'none',
        padding: '5%'
    },
    submit: {
        background: 'rgba(230, 43, 37)',
        border: 'none',
        color: 'white',
        marginTop: '20px',
        width: '100%',
        height: '40px',
        fontSize: '16px',
        
        ':active' : {
            background: 'rgba(230, 43, 37, 0.8)'
        }
    },
    speakerSelect: {
        float: 'right',
    }
});


const muiTheme = getMuiTheme({
    palette: {
        textColor: '#fff'
    },
    appBar: {
        color: 'rgba(230, 43, 37)',
    },
});

export default Ask;