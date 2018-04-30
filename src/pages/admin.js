import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Question from '../components/question.js';
import firebase from '../components/firebase.js';
import { Grid } from 'react-bootstrap';


class Admin extends Component {
    
    constructor() {
        super();
        this.state = {
            questions: {}
        }  
        
        this.addQuestion = this.addQuestion.bind(this);
    }
    
    componentDidMount() {
        const requestsRef = firebase.database().ref('requests/');
        requestsRef.on('value', (requests) => {
            requests.forEach((question) => {
                let key = question.key;
                let childData = question.val();
                
                this.addQuestion(key, childData);
            });
        });
    }
    
    addQuestion = (key, data) => {
        const updated = this.state.questions;
        updated[key] = data;
        this.setState({ questions: updated });
    }

    
    
	render() {
        var rows = [];
        for(let key in this.state.questions) {
            let question = this.state.questions[key];
            rows.push(<Question
                        key={key}
                        id={key}
                        visible={question.visible}
                        speaker={question.speaker}
                        text={question.text}
                        contact={question.contact}
                      />);
        }
        
        return <Grid>{rows}</Grid>;
	}
}

export default Admin;