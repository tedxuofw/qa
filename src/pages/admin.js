import React, { Component } from 'react';

import speakers from '../components/data.js';

import Question from '../components/admin-q.js';
import firebase from '../components/firebase.js';
import { Grid } from 'react-bootstrap';


class Admin extends Component {
    
    constructor() {
        super();
        
        let hash = window.location.hash.split('/');
        let speaker = hash[2];        
        
        this.state = {
            questions: {},
            filtered: (speaker in speakers),
            speaker: speaker
        }  
        
        this.addQuestion = this.addQuestion.bind(this);
    }
    
    componentDidMount() {        
        const requestsRef = firebase.database().ref('requests/');
        requestsRef.on('value', (requests) => {
            requests.forEach((question) => {
                let key = question.key;
                let childData = question.val();
                
                if(!this.state.filtered || childData.speaker === this.state.speaker) {
                    this.addQuestion(key, childData);
                }
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
                        admin={false}
                      />);
        }
        
        return <Grid>{rows}</Grid>;
	}
}

export default Admin;