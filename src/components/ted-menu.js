import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';


import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';



class TEDMenu extends Component {
    
    componentWillMount() {
        Modal.setAppElement('body');
    }
    
	render() {        
		return (
            <Modal
              isOpen={this.props.open}
              onRequestClose={this.props.close}
              style={speakerDialogStyles}
              contentLabel=""
            >
                <AppBar
                    style={{
                        boxShadow: 'none'      
                    }}
                    title="TEDxUofW 2018" 
                    titleStyle={{
                        fontSize: '16px',
                        fontWeight:'bold',
                        textAlign: 'center'
                    }}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={
                        <IconButton><NavigationClose /></IconButton>
                    }
                    onLeftIconButtonClick={this.props.close}
                />

                <center>

                <div className={css(styles.container)}>
                    <a className={css(styles.link)} href='//live.tedxuofw.com'>
                        <div>Live Schedule</div>
                    </a>
                    <a className={css(styles.link)} href='//live.tedxuofw.com/#/speakers'>
                        <div>Speakers</div>
                    </a>
                    <a className={css(styles.link)} href='//quest.tedxuofw.com'>
                        <div>Scavenger Hunt</div>
                    </a>
                    <a className={css(styles.link)} href='//live.tedxuofw.com/#/about'>
                        <div>About</div>
                    </a>
                </div>
                </center>

            </Modal>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        marginTop: '50px',
        marginBottom: '50px'
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        margin: '10px',
        fontFamily: 'Avenir',
        fontSize: '26px'
    }, 
});


const speakerDialogStyles = {
    content : {
        top: '0%',
        left: '0%',
        right: '0%',
        bottom: '0%',
        position: 'absolute',
        background: 'none',
        border: 'none',
        padding: '0'
    }, 
    overlay: {
        zIndex: 9998,
        background: 'rgba(230, 43, 37, 1)',
    }
};

TEDMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}

export default TEDMenu;