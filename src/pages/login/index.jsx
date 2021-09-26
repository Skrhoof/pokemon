import React, { Component } from 'react'
import { Redirect } from 'react-router';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';

import './login.less'
import logo from './images/logo.png'
import kaMiGui from './images/卡咪龟.png'
import GuiSi from './images/鬼斯.png'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';


const screenWidth = window.screen.availWidth;

export default class Login extends Component {

  state = {
    guiLeft: 0,
    guiTrans: 180
  }

  componentDidMount() {
    const moveAnimate = () => {
      this.moveTime = setTimeout(() => {
        const { guiLeft, guiTrans } = this.state;
        if (guiTrans === 180) {
          this.setState({ guiLeft: guiLeft + 1 });
          if ((guiLeft + 100) === screenWidth) {
            this.setState({ guiTrans: 0 });
          }
        } else {
          this.setState({ guiLeft: guiLeft - 1 });
          if (guiLeft === 0) {
            this.setState({ guiTrans: 180 });
          }
        }
        return moveAnimate()
      }, 5)
    }
    moveAnimate();
  }

  componentWillUnmount() {
    clearTimeout(this.moveTime);
  }

  onFinish = async (values) => {
    const { username, password } = values;
    const response = await reqLogin(username, password);
    //console.log(response);
    const result = response.data;
    if (result.status === 0) {
      message.success('登陆成功');
      const user = result.data;
      memoryUtils.user = user;
      storageUtils.saveUser(user);
      this.props.history.replace('/');
    } else {
      message.error(result.msg);
    }

  };

  render() {

    const user = memoryUtils.user
    if (user._id) {
      return <Redirect to='/' />
    }

    const { guiLeft, guiTrans } = this.state;
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
                }, {
                  min: 4, message: '请至少输入4位哦'
                }, {
                  max: 12, message: '最多只能输入12位哦'
                }, {
                  pattern: /^[a-zA-Z0-9_]+$/, message: '名字必须是英文,数字或下划线组成哦'
                }
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
              <a href="/register">register now!</a>
            </Form.Item>
          </Form>

        </div>
        <img className='guiSiIMG' style={{ left: `${guiLeft}px`, transform: `rotateY(${guiTrans}deg)` }} alt='' src={GuiSi} />
      </div>
    )
  }
}
