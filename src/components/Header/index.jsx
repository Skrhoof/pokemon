import React, { Component } from 'react'

import './index.less'

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='header-top'>
          <span>训练师,欢迎你来到集市</span>
          <a>退出</a>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'></div>
          <div className='header-bottom-right'>
            <span></span>
            
          </div>
        </div>
      </div>
    )
  }
}
