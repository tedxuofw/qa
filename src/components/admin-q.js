import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import speakers from '../components/data.js';

import { Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Toggle from 'react-toggle'; 
import 'react-toggle/style.css';



import firebase from '../components/firebase.js';

class Question extends Component {
     
    constructor(props) {
        super(props);
        
        let name = props.speaker || "TEDxUofW";
        name = (speakers[name]) ? speakers[name].name : name;
        this.state = {
            visible: props.visible,
            key: props.id,
            name: name 
        }
    }
    
    toggle = (e) => {
        let visible = e.target.checked;
        this.setState({ visible: visible});
        
        if(visible) {
            firebase.database().ref("site/" + this.state.key).set({
                upvotes: 0
            });
        } else {
            firebase.database().ref("site/" + this.state.key).remove();
            console.log("Removing: " + this.state.key);
        }
        
        firebase.database().ref("requests/" + this.state.key).update({
            visible: visible
        });
    }
    
    // TODO: Delete the Answer Q from the Admin page
    deleteQuestion = (answer) => {
        if(window.confirm("Are you sure you want to delete this message?")){
            
            firebase.database().ref("requests/")
                    .child(this.state.key).remove();
            
            if(this.state.visible){
                firebase.database().ref("site/")
                        .child(this.state.key).remove();
            }
        }
    }
    
    answerQuestion = (answer) => {
        if(this.state.visible) {
            var response = prompt("Please answer the question:");
            if (response != null && response !== "") {
                const siteRef = firebase.database().ref("site");
                siteRef.child(this.state.key).update({
                    answer: response
                });
            }
        }
    }
    
	render() {
		return (
            <Row className={css(styles.row)}>
                <div className={css(styles.delete)}>
                    <center>
                    <button className={css(styles.deleteButton)} onClick={this.deleteQuestion}>
                        X
                    </button>
                    </center>
                </div>
                <div className={css(styles.question)}>
                    <div className={css(styles.speaker)}>
                        To <Link to={"/tedadmin2/" + this.props.speaker} >
                            {this.state.name}
                        </Link>:
                    </div>
                    <div className={css(styles.text)}>   
                        {this.props.text}
                    </div>
                </div>
                <div className={css(styles.toggle)}>
                    <Toggle
                        id={this.props.id}
                        checked={this.state.visible}
                        onChange={this.toggle} />
                </div>
                <div className={css(styles.answer)}>
                    { this.state.visible &&
                        <button className={css(styles.answerButton)} onClick={this.answerQuestion}>
                            Answer
                        </button>
                    }

                </div>
            </Row>
        );
	}
}

const styles = StyleSheet.create({
    row: {
        display: '-webkit-flex',
        webkitFlexDirection: 'row',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '20px'
    },
    delete: {
        width: '50px',  
    },
    deleteButton: {
        width: '25px',
        height: '25px',
        background: 'none',
        color: 'rgba(230, 43, 37, 1)',
        fontWeight: 'bold',
        border: 'none',
        
        ":active": {
            color: 'rgba(230, 43, 37, 0.8)'
        }
    },
    question: {
        flex: '1'  
    },
    toggle: {
        width: '60px'
    },
    answer: {
        width: '70px'
    },
    answerButton: {
        background: 'rgba(230, 43, 37)',
        border: 'none',
        color: 'white',
        fontSize: '12px',
        width: '60px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        
        ':active' : {
            background: 'rgba(230, 43, 37, 0.8)'
        }  
    },
    text: {
        fontSize: '14px',
        fontFamily: 'Avenir'
    },
    speaker: {
        fontSize: '12px',
        fontFamily: 'Avenir'
    },
});



export default Question;