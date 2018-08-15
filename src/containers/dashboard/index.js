import React, { Component } from 'react'
import { connect } from 'react-redux';
import request from 'request-promise'
import { Layout, Button } from 'antd';
import { openNotificationWithIcon as notify } from  '../../common/nortification'
import { MailRenderer } from './mailRenderer'
import Compose from '../compose/index'
import './assets/index.css'

const { Header, Content } = Layout;
let wid
class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages : [],
            compose : false,
        }
    }

    showDrawer = () => {
        let w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        if (w>1000){
            wid = 574
        } else if (w>768 && w<=1000) {
            wid = 440
        } else {
            wid = w
        }
        this.setState ({compose : true})
    }

    async componentDidMount() {

        let options = {
            withCredentials : true,
            method: 'GET',
            uri: `http://localhost:3001/auth/inbox?auth=${this.props.idToken}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000/',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-type, Authorization',
            }    
        }
    
        await request(options).then( data => {
            this.setState({messages : JSON.parse(data)})
        }).catch((e) => {
            notify( 'error', 'Couldn\'t fetch mails', 'try again later')
        });

        

        


    }

    render() {
       
        return (
            <Layout className="layout">
                <Header>
                {
                    this.state.compose? <Compose idToken={this.props.idToken} width={wid} visible={true} reference={this}/>:null
                }
                <Button type="primary" onClick={this.showDrawer}>
                    Compose
                </Button>

                </Header>
                <Content >
                    {
                        this.state.messages.map ( (message, i) => {
                            
                            return (<MailRenderer key={i} from={message.senderEID} subject={message.subject} content={message.content} />)
                        })
                    }
                    
                    
                </Content>


            </Layout>

        )
    }
}


const mapStateToProps = state => {
    if (state.authToken.idToken !== undefined) {
        return {
            idToken: state.authToken.idToken
        }
    } else if (localStorage.getItem("idToken")) {
        return {
            idToken: localStorage.getItem("idToken")
        }
    }
}

const mapDispatchToProps = dispatch => {
    // return {
    //     saveToken : idToken => dispatch(save_token(idToken))

    // }
}



export default connect(mapStateToProps, null)(Dashboard)