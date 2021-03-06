import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import $ from 'jquery';

import firebase from '../components/firebase.js';
import history from '../components/history.js';


class Ask extends Component {
          
    constructor(props) {
        super(props);
        
        let hash = window.location.hash.split('/');
        let speaker = hash[2] || 'general';
        console.log(speaker);
        this.state = {
            speaker: speaker
        };
    }
    
	askQuestion(speaker, question, callback) {
		let requests = firebase.database().ref('requests/');
        let requestKey = requests.push().key;
        console.log("Generating Request Key: " + requestKey);
        firebase.database().ref('requests/' + requestKey).set({
            speaker: speaker,
            text: question,
            visible: false
        }, callback);        
	}
    
    buttonRequest = () => {
        let questionText = $("#questionInput").val();
        if(questionText && questionText != "") {
            this.askQuestion(
                this.state.speaker,
                questionText,
                () => {
                    $("#questionInput").val("");
                    history.push(`/thank/` + this.state.speaker);
                }
            );
        }
    }
    
	render() {
		return (

                <div className={css(styles.background)}>
                    <div className={css(styles.popup)}>
                        <div className={css(styles.topbar)}>
                            <button className={css(styles.x)} onClick={() => history.goBack()}>X</button>
                        </div>
                        <div className={css(styles.container)}>
                            <div>
                                <b>What would you like to know?</b> Write a question for the speaker below. 
                            </div>
                            <div className={css(styles.inputContainer)}>
                                 <textarea 
                                    id="questionInput"
                                    className={css(styles.input)}    
                                    type="text" 
                                    name="questionInput"
                                    rows="9"
                                    maxLength="350"
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
        marginTop: '50px',
        marginBottom: '50px',
        marginLeft: '10%',
        marginRight: '10%',
        maxHeight: '475px',
    },
    topbar : {
        background: 'rgb(230, 43, 37)',
        height: '10%',
        WebkitBackfaceVisibility: 'hidden',
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
        width: '100%',
        padding: '10%'
    },
    inputContainer : {
        marginTop: '15px',
    },
    input: {
        width: '100%',
        background: '#f5f5f5',
        border: 'none',
        padding: '5%'
    },
    submit: {
        background: 'rgb(230, 43, 37)',
        WebkitBackfaceVisibility: 'hidden',
        border: 'none',
        color: 'white',
        marginTop: '15px',
        width: '100%',
        height: '40px',
        fontSize: '16px',
        
        ':active' : {
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgb(230, 43, 37)'
        }
    },
    speakerSelect: {
        float: 'right',
    }
});

export default Ask;