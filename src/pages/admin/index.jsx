import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header'

import Home from '../home'
import Species from '../species'
import Pokemon from '../pokemon'
import Role from '../role'
import User from '../user'


const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/species' component={Species}/>
              <Route path='/pokemon' component={Pokemon}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,.4)' }}>尽情感受宝可梦的魅力吧！</Footer>
        </Layout>
      </Layout>
    )
  }
}
