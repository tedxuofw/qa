import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import 'react-toggle/style.css';

import { Row, Col } from 'react-bootstrap';

class Question extends Component {
     
    constructor(props) {
        super(props);
        
        this.state = {
            key: props.id
        }
    }
    
    getAnswer = () => {
        if(this.props.answer){
            return <div className={css(styles.answer)}>
                    <div className={css(styles.one)}>   
                        Speaker Replied:
                    </div>
                    <div className={css(styles.text)}>
                        {this.props.answer}
                    </div>
                </div>
        } else {
            return(null);
        }
    }
    
	render() {
		return (
            <Row className={css(styles.border)}>
                <div className={css(styles.one)}>   
                    User Asked:
                </div>
                <div className={css(styles.text)}>
                    {this.props.text}
                </div>
                {this.getAnswer()}
            </Row>
        );
	}
}

const styles = StyleSheet.create({
    border: {
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '10%',
        paddingRight: '10%'
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