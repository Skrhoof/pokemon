import React, { Component } from 'react'


import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'

import './pokemonCatch.less'

export default class PokemonCatch extends Component {
  state = {
    catchFlag: false,
    catchPokemon: []
  }

  startCatch = () => {
    this.setState({ catchFlag: true })
    //发请求渲染页面
  }

  render() {
    const { catchFlag, catchPokemon } = this.state;
    return (
      <div className='main'>
        {
          catchFlag ?
            <div>
              {catchPokemon.map(() => {
                
              })}
            </div>
            : <div className='start'>
              <div style={{ color: 'rgb(255,255,255)', fontSize: 15, textAlign: 'center', marginTop: 35 }}>幸运的训练师，恭喜你获得了10个大师球，现在就开始捕获属于自己的宝可梦吧</div>
              <Button type='primary'
                style={{ marginLeft: '50%', marginTop: 50, transform: 'translate(-50%)' }}
                onClick={this.startCatch} >开始捕获</Button>
            </div>
        }

      </div>
    )
  }
}
