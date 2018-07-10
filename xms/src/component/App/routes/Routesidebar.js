import { renderComponent } from './routers';
import React, { Component } from 'react';
import Homea from '../content/homea'
import Contentb from '../content/contentb'
import Addc from '../content/addc'
import OrderE from '../content/ordere'
import ReturndF from '../content/returnf'
import RefundG from '../content/refundg'
import TradeH from '../content/tradeh'
import UserK from '../content/userk'
import Users from '../content/users'

import GradeL from '../content/gradel'
import InfoO from '../content/infoo'
import Login from '../../login/login'
import Order from '../content/order'
import Pass from '../content/password'
import Passgl from '../content/passwordgl'
import cookie from 'react-cookies'
import Refurntk from '../content/refurntk'

let routes = [
    {
        exact: true,
        path: '/index',
        component: Homea
    },

    {
        exact: true,
        path: '/index/content/:id',
        render: ({ match }) => {
            let id = '1';
            if (match.params) { id = match.params.id }

            switch (id) {
                case '1':
                    return <Contentb />
                default:
                    return <Contentb />
            }
        }
    },

    {
        exact: true,
        path: '/index/order/:id',
        render: ({ match }) => {
            let id = '1';
            if (match.params) { id = match.params.id }

            switch (id) {
                case '1':
                    return <OrderE />

                default:
                    return <OrderE />
            }
        }
    },
    {
        exact: true,
        path: '/index/return/:id',
        render: ({ match }) => {
            let id = '1';
            if (match.params) { id = match.params.id }

            switch (id) {
                case '1':
                    return <ReturndF />
                default:
                    return <ReturndF />
            }
        }
    },
    {
        exact: true,
        path: '/index/refurn/:id',
        render: ({ match }) => {
            let id = '1';
            if (match.params) { id = match.params.id }

            switch (id) {
                case '1':
                    return <RefundG />

                case 'Refurntk':
                    return <Refurntk />
                default:
                    return <RefundG />
            }
        }
    },
    {
        exact: true,
        path: '/index/users/:id',
        render: ({ match }) => {
            let id = '1';
            if (match.params) { id = match.params.id }

            switch (id) {
                case '1':
                    return <UserK />
                default:
                    return <UserK />
            }
        }
    },
    {
        exact: true,
        path: '/index/userpass/:id',
        render: ({ match }) => {
            let a = cookie.load('key', true)
            let b = a.split('r')
            
            if (b[1] === '1') {
                let id = '1';
                if (match.params) { id = match.params.id }
                switch (id) {
                    case '1':
                        return <Pass />
                    default:
                        return <Pass />
                }
                
            }
            else if (b[1] === '2') {
                let id = '1';
                if (match.params) { id = match.params.id }
                switch (id) {
                    case '1':
                        return <Passgl />
                    default:
                        return <Passgl />
                }
            }
            // let id = '1';
            // if (match.params) { id = match.params.id }

            // switch (id) {
            //     case '1':
            //         return <Passgl />
            //     default:
            //         return <Passgl />
            // }
        }
    },
    {
        exact: true,
        path: '/index/:id',
        render: ({ match }) => {
            let id = 'a';
            if (match.params) { id = match.params.id }
            switch (id) {
                case 'a':
                    return <Homea />
                // case 'b':
                //     return <Contentb />
                // case 'c':
                //     return <Addc />
                case 'd':
                    return <Addc />
                // case 'e':
                //     return <OrderE />
                // case 'f':
                //     return <ReturndF />
                // case 'g':
                //     return <RefundG />
                // case 'f':
                //     return <ReturndF />
                case 'trade':
                    return <TradeH />
                case 'users':
                    return <UserK />
                case 'l':
                    return <GradeL />
                // case 'userpass':
                //     let a = cookie.load('key', true)
                //     let b=a.split('r')
                //     if (b[1] === '1') {
                //         return <Pass />
                //     }
                //     else if (b[1] === '2'){
                //         return <Passgl />
                //     }
                // return <Users/>

                default:
                    return <Contentb />
            }
        }
    },


];

class Routesidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {renderComponent(routes)}
            </div>
        );
    }
}

export default Routesidebar;