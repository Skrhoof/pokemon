import React, { Component } from 'react'
import { Redirect } from 'react-router';

import {
  Form,
  Input,
  Select,
  Button,
  message
} from 'antd';
import { reqUserAdd } from '../../api';

import './register.less'
import logo from './images/logo.png'
import kaMiGui from './images/卡咪龟.png'
import GuiSi from './images/鬼斯.png'


const screenWidth = window.screen.availWidth;
const { Option } = Select;

export default class Register extends Component {

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
    let { username, password, email, phone } = values;
    if (email == undefined) {
      email = ''
    }
    if (phone == undefined) {
      phone = ''
    }
    const response = await reqUserAdd({username, password,email,phone});
    const result = response.data;
    if (result.status === 0) {
      message.success('注册成功');
      this.props.history.replace('/login');
    } else {
      message.error(result.msg);
    }

  };

  formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 19,
      },
    },
  };

  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 5,
      },
    },
  };

  render() {
    const { guiLeft, guiTrans } = this.state;
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );
    return (
      <div className='register'>
        <header className='register-header'>
          <img src={logo} alt='' />
          <h1>宝可梦集市管理系统</h1>
        </header>
        <div className='kaMiIMG'>
          <img src={kaMiGui} alt='' />
        </div>
        <div className='register-content'>
          <h2>训练家注册</h2>
          <Form
            {...this.formItemLayout}
            name="register"
            className="register-form"
            initialValues={{
              prefix: '86',
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              label="用户名"
              tooltip="您将来的称号"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },{
                  min: 4, message: '请至少输入4位哦'
                }, {
                  max: 12, message: '最多只能输入12位哦'
                }, {
                  pattern: /^[a-zA-Z0-9_]+$/, message: '名字必须是英文,数字或下划线组成哦'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认您输入的密码一致!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('两次密码不一致!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: '请输入正确的邮箱!',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                {
                  message: '请输入您的手机号!',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item {...this.tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="register-form-button">
                注册
              </Button>
              <a href="/login">已有账号，立刻登陆</a>
            </Form.Item>
          </Form>

        </div>
        <img className='guiSiIMG' style={{ left: `${guiLeft}px`, transform: `rotateY(${guiTrans}deg)` }} alt='' src={GuiSi} />
      </div>
    )
  }
}
