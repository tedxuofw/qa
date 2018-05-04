import React, { Component } from 'react';

import speakers from '../components/data.js';

import Question from '../components/admin-q.js';
import firebase from '../components/firebase.js';
import { Grid } from 'react-bootstrap';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import TEDMenu from '../components/ted-menu.js';

class Admin extends Component {
    
    constructor() {
        super();
        
        let hash = window.location.hash.split('/');
        let speaker = hash[2];        
        
        this.state = {
            questions: {},
            filtered: (speaker in speakers),
            speaker: speaker,
            open: false
        }  
        
        this.addQuestion = this.addQuestion.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    
	openMenu() {
		this.setState({ open: true });
	}

	closeMenu() {
		this.setState({ open: false });
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
        
        requestsRef.on("child_removed", (question) => {
            let key = question.key;
            this.removeQuestion(key);
        });
    }
    
    removeQuestion = (key) => {
        const updated = this.state.questions;
        if(updated[key]) {
            delete updated[key];
            this.setState({ questions: updated });
        }
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
            
                        onLeftIconButtonClick={this.openMenu}
                    />
            
                    <Grid>{rows}</Grid>
            
                    <TEDMenu open={this.state.open} close={this.closeMenu} />
                </div>
			</MuiThemeProvider>
		);
	}
}


const muiTheme = getMuiTheme({
    palette: {
        textColor: '#fff'
    },
    appBar: {
        color: 'rgba(230, 43, 37, 1)',
    },
});



export default Admin;