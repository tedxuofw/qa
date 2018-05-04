import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import history from '../components/history.js';


class Thank extends Component {

    
	render() {
		return (

                <div className={css(styles.background)}>
                    <div className={css(styles.popup)}>
                        <div className={css(styles.topbar)}>
                            <button className={css(styles.x)} onClick={() => history.go(-2)}>
                                X
                            </button>
                        </div>
                        <div className={css(styles.container)}>
                            <div className={css(styles.thanks)}>Thank you for your question!</div>
                            <br/>
                            <div>                                
                                We will selecting questions of varying subjects and the speaker will write a response when they are available.
                            </div>
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
        height: '60%',
        marginTop: '30%',
        marginBottom: '20%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    topbar : {
        background: 'rgba(230, 43, 37)',
        height: '10%'
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
        padding: '20%'
    },
    thanks: {
        fontSize: '26px',
        fontWeight: 'bold',
    }
});

export default Thank;