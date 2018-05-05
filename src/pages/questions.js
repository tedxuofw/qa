import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Question from '../components/user-q.js';
import firebase from '../components/firebase.js';
import history from '../components/history.js';
import speakers from '../components/data.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import TEDMenu from '../components/ted-menu.js';

import { Grid } from 'react-bootstrap'


class Questions extends Component {
          
    constructor(props) {
        super(props);
        
        let hash = window.location.hash.split('/');
        let speaker = hash[1] || 'general';
        
        if(speaker !== "general" && !speakers[speaker]){
            speaker = "general";
        }
        
        this.state = {
            speaker: speaker,
            questions: {},
            open: false
        };
        
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
        
        siteRef.on("child_removed", (question) => {
            let key = question.key;
            this.removeQuestion(key);
        });
    }
    
    getHeader = () => {
        console.log(this.state.speaker)
        if(speakers[this.state.speaker]) {
            let data = speakers[this.state.speaker];
            
            return(
                <div className={css(styles.header)}>
                    <img className={css(styles.headerImg)} src={"." + data.img} alt={data.name} />

                    <div className={css(styles.title)}>
                        {data.name}
                    </div>
                    <div className={css(styles.talk)}>
                        {data.talk}
                    </div>
                </div>
            );
        } else if (this.state.speaker === "general") {
            return (
                <div className={css(styles.header)}>
                    <img className={css(styles.headerImg)} src={"./resources/tedx.jpg"} alt="general"/>
                    <div className={css(styles.title)}>
                        Questions?
                    </div>               
                    <div className={css(styles.talk)}>
                        Need help? Ask us.
                    </div>
                    <div className={css(styles.talk)}>
                        Talk to speakers <a href="http://live.tedxuofw.com/#/speakers">here</a>!
                    </div>
                </div>
            );
        }
        
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
                <center key="none">
                    <br/><br/><br/>
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
            
                    {this.getHeader()}
                    
                    <div className={css(styles.ordering)}>
                        Sort Order: Most Recent
                    </div>
            
                    <div className={css(styles.background)}>
                        <Grid>{this.getPosts()}</Grid>
                    </div>
            
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
        height: '100px',
        padding: '20px',
    },
    headerImg: {
        height: '60px',
        width: '60px',
        float: 'left',
        marginRight: '20px'
    },
    title: {
        fontSize: '16px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: '5px',
    },
    talk: {
        fontSize: '14px',
        lineHeight: '97%'
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
        
        background: 'rgb(230, 43, 37)',
        border: 'none',
        width: '100%',
        color: 'white',
        fontSize: '16px',
        
        WebkitBackfaceVisibility: 'hidden',
        
        ':active' : {
            background: 'rgb(230, 43, 37)'
        }
    },    
});

const muiTheme = getMuiTheme({
    palette: {
        textColor: '#fff'
    },
    appBar: {
        color: 'rgb(230, 43, 37)',
    },
});

export default Questions;