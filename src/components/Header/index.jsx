import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import ajax from "../../api/ajax";
import menuList from '../../config/menuConfig'

const { confirm } = Modal;

class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  getTime = () => {
    this.timer = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime });
    }, 1000)
  }

  getWeather = async () => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=35f9b93e22da80fb9105e71b329ce0f2`
    ajax(url, { city: '330100' }, 'GET').then((res) => {
      //console.log(res);
      const weather = `${res.data.lives[0].weather} ${res.data.lives[0].temperature}度 ${res.data.lives[0].winddirection}风`;
      this.setState({ weather })
    })
  }

  getTitle = () => {
    const path = this.props.location.pathname;
    let title = '';
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title;
        }
      }
    })
    return title;
  }

  layOut = () => {
    confirm({
      title: '确定要离开集市吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {}
        this.props.history.replace('/login')
      }
    });
  }

  componentDidMount() {
    this.getTime();
    this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state;
    const username = memoryUtils.user.username;
    const title = this.getTitle();
    return (
      <div className='header'>
        <div className='header-top'>
          <span>训练师 {username} ,欢迎你来到集市</span>
          <a onClick={this.layOut}>退出</a>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span style={{ marginRight: '15px' }}>{currentTime}</span>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);