import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Question from '../components/user-q.js';
import firebase from '../components/firebase.js';
import history from '../components/history.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import TEDMenu from '../components/ted-menu.js';

import { Grid } from 'react-bootstrap'


class Questions extends Component {
          
    constructor(props) {
        super(props);
        
        let hash = window.location.hash.split('/');
        let speaker = hash[2] || 'general';
        this.state = {
            speaker: speaker,
            questions: {},
            open: false,
        };
        
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    
	openMenu() {
		this.setState({ open: true });
	};

	closeMenu() {
		this.setState({ open: false });
	};
    
    componentDidMount() {
        const siteRef = firebase.database().ref('site/');
        const postsRef = firebase.database().ref('requests/');
        siteRef.on('value', (site) => {
            site.forEach((question) => {
                let tmpPost = question.val();
                
                let key = question.key;
                let postRef = postsRef.child(key);
                let speaker = this.state.speaker;
               
                postRef.once('value').then((question) => {
                    let post = question.val();
                    post.upvotes = tmpPost.upvotes;
                    post.answer = tmpPost.answer;
                    
                    if(post.speaker === speaker) {
                        this.addQuestion(key, post);
                    }
                });
            });
        });
    }
    
    addQuestion = (key, data) => {
        const updated = this.state.questions;
        updated[key] = data;
        this.setState({ questions: updated });
    }
    
    buttonRequest = () => {
        history.push(`/ask/` + this.state.speaker);
    }
    
    getPosts = () => {
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
                        upvotes={question.upvotes}
                        answer={question.answer}
                      />);
        }
                      
        if(rows.length === 0) {
            rows.push(
                <center key={"key"}>
                    <div>
                        No questions found!
                    </div>
                </center>
            );        
        }
        return rows;
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
            
                        onLeftIconButtonClick={this.openMenu}
                    />
            
                    // Header
                    <div className={css(styles.header)}>
                        
                    </div>
                    
                    // Sorting order
                    <div className={css(styles.ordering)}>
                        Sort Order:
                    </div>
            
                    // Show all posts
                    <div className={css(styles.background)}>
                        <Grid>{this.getPosts()}</Grid>
                    </div>
            
                    // Question Button
                    <button className={css(styles.submit)} onClick={this.buttonRequest}>
                        Ask Me a Question
                    </button>            
            
                    <TEDMenu open={this.state.open} close={this.closeMenu} />
                </div>
			</MuiThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
    header: {
        background: "white",
        position: 'fixed',
        top: '64px',
        left: '0',
        right: '0',
        height: '100px'
    },
    ordering: {
        background: "#e5e5e5",
        position: 'fixed',
        lineHeight: '50px',
        paddingLeft: '20px',
        fontSize: '14px',
        top: '164px',
        left: '0',
        right: '0',
        height: '50px'
    },
    background: {
        overflowY: 'scroll',

        position: 'fixed',
        top: '214px',
        bottom: '45px',
        left: '0',
        right: '0',
    }, 
    submit: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        
        height: '45px',
        
        background: 'rgba(230, 43, 37)',
        border: 'none',
        width: '100%',
        color: 'white',
        fontSize: '16px',
        
        ':active' : {
            background: 'rgba(230, 43, 37, 0.8)'
        }
    },    
});

const muiTheme = getMuiTheme({
    palette: {
        textColor: '#fff'
    },
    appBar: {
        color: 'rgba(230, 43, 37, 1)',
    },
});

export default Questions;