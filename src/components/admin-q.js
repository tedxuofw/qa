import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Toggle from 'react-toggle'; 
import 'react-toggle/style.css';

import { Row, Col } from 'react-bootstrap';


import firebase from '../components/firebase.js';

class Question extends Component {
     
    constructor(props) {
        super(props);
        
        this.state = {
            visible: props.visible,
            key: props.id
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
    
    // TODO: Delte the Answer Q from the Admin page
    deleteQuestion = (answer) => {
        if(window.confirm("Are you sure you want to delete this message?")) {
            firebase.database().ref("requests/" + this.state.key).remove();
            
            if(this.state.visible){
                firebase.database().ref("site/" + this.state.key).remove();
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
            <Row className={css(styles.border)}>
                <Col xs={9} md={9} className={css(styles.border)}>
                    <div className={css(styles.text)}>   
                        {this.props.text}
                    </div>
                    <div className={css(styles.speaker)}>
                        {this.props.speaker} - {this.props.contact}
                    </div>
                </Col>
                <Col xs={3} md={3}>
                    <span className={css(styles.vcenter)}>
                        <Toggle
                            id={this.props.id}
                            checked={this.state.visible}
                            onChange={this.toggle} />
                    </span>
                    { this.state.visible &&
                        <button onClick={this.answerQuestion}>
                            Answer
                        </button>
                    }
                    <button onClick={this.deleteQuestion}>
                        Delete
                    </button>
                </Col>
            </Row>
        );
	}
}

const styles = StyleSheet.create({
    
    speaker: {
        fontSize: '12px',
        color: '#444'
    },   
    
    border: {
        paddingTop: '10px',
        paddingBottom: '20px',
    },
    one: {
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        paddingBottom: '5px'
    },
    text: {
        fontSize: '16px',
        fontFamily: 'Avenir'
    },
    answer: {
        borderLeft: '8px rgba(230, 43, 37) solid',
        marginLeft: '15px',
        marginTop: '5px',
        paddingLeft: '10px'
    }
});



export default Question;