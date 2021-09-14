import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd';
import './index.less'
import logo from '../../assets/images/pokemonLogo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {

  openKey = '';

  getMenu = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key;
        }

        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenu(item.children)}
          </SubMenu>
        )
      }
    })
  }

  componentWillMount() {
    this.menuNodes = this.getMenu(menuList)
  }

  render() {
    const path = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img className='logo' src={logo} alt='' />
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {/* <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<BugOutlined />} title="宝可梦">
            <Menu.Item key="5">
              <Link to='/species'>物种管理</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to='/pokemon'>宝可梦管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to='/user'>训练师管理</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to='/role'>权限管理</Link>
          </Menu.Item> */}
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)