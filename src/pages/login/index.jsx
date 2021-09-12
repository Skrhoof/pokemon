import React, { Component } from 'react'

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
import logo from './images/logo.png'
import kaMiGui from './images/卡咪龟.png'
import GuiSi from './images/鬼斯.png'

export default class Login extends Component {

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt='' />
          <h1>宝可梦集市管理系统</h1>
        </header>
        <div className='kaMiIMG'>
          <img src={kaMiGui} alt='' />
        </div>
        <div className='login-content'>
          <h2>训练家登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '冒险者请输入你的名字!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请放心输入,我不会偷看的!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
          
        </div>
        <img className='guiSiIMG' src={GuiSi} />
      </div>
    )
  }
}
