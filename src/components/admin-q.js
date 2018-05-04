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
                    <div className={css(styles.vcenter)}>
                        <Toggle
                            id={this.props.id}
                            checked={this.state.visible}
                            onChange={this.toggle} />
                    </div>
                </Col>
            </Row>
        );
	}
}

const styles = StyleSheet.create({
    border: {
        borderRight: '1px solid black',
        borderBottom: '1px solid black'
    },
    speaker: {
        fontSize: '12px',
        color: '#444'
    },
    text: {
        fontSize: '15px'
    },    
    vcenter: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(25%)'
    }
});

export default Question;