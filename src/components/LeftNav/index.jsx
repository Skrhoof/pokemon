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
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
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
    let path = this.props.location.pathname;
    if (path.indexOf('/pokemon') === 0) {
      path = '/pokemon'
    }
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
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)