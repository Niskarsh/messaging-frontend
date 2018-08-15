import React, { Component } from 'react'
import { connect } from 'react-redux';
import './assets/index.css'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // signup: false
        }
    }

    componentDidMount() {

    }

    render() {
        return (

            <div>
                
            </div>
        )
    }
}


const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {
    return {
        saveToken : idToken => dispatch(save_token(idToken))

    }
}



export default connect (mapDispatchToProps, mapDispatchToProps)(Dashboard)