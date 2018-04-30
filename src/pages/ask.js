import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import $ from 'jquery';

import firebase from '../components/firebase.js';
import history from '../components/history.js';


class Ask extends Component {
            
	askQuestion(speaker, question, contact, callback) {
		var requests = firebase.database().ref('requests/');
        var requestKey = requests.push().key;
        console.log("Generating Request Key: " + requestKey);
        firebase.database().ref('requests/' + requestKey).set({
            speaker: speaker,
            text: question,
            contact : contact,
            visible: false
        }, callback);        
	}
    
    buttonRequest = () => {
        this.askQuestion(
            $("#speakerSelect").val(),
            $("#questionInput").val(),
            "sohampardeshi@gmail.com",
            function() {
                $("#questionInput").val("");
                $('#speakerSelect').prop('selectedIndex',0);
                history.push(`/thank`);
            }
        );
    }
    
	render() {
		return (

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

export default Ask;