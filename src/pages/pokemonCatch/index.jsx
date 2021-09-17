import React, { Component } from 'react'

import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'

import { reqCatchPokemon0, reqCatchPokemon1, reqCatchPokemon2 } from '../../api'
import './pokemonCatch.less'

export default class PokemonCatch extends Component {
  state = {
    catchFlag: false,
    catchPokemon: []
  }

  getRandom = () => {
    let a0 = 0, a1 = 0, a2 = 0;
    for (let i = 0; i < 5; i++) {
      const odds = Math.floor(Math.random() * 100);
      if (odds < 75) {
        a0++;
      }
    }
    for (let i = 0; i < (5 - a0); i++) {
      const odds = Math.floor(Math.random() * 100);
      if (odds < 70) {
        a1++;
      }
    }
    a2 = 5 - a0 - a1;
    return [a0, a1, a2]
  }

  startCatch = async () => {
    this.setState({ catchFlag: true })
    //发请求渲染页面
    const numList = this.getRandom();
    // console.log(numList);
    const result0 = await reqCatchPokemon0({ rarity0: numList[0] });
    //console.log(result0.data);
    const result1 = await reqCatchPokemon1({ rarity1: numList[1] });
    //console.log(result1.data);
    const result2 = await reqCatchPokemon2({ rarity2: numList[2] });
    // console.log(result2.data);
    this.setState({ catchPokemon: [...result2.data, ...result1.data, ...result0.data] })
  }

  render() {
    const { catchFlag, catchPokemon } = this.state;
    return (
      <div className='main'>
        {
          catchFlag ?
            <div>
              {catchPokemon.map((item) => {
                return (<div
                  style={{
                    width: 150,
                    height: 50,
                    color: 'white',
                    backgroundColor: item.rarity === '0' ? '#aaaa' : item.rarity === '1' ? '#6495ed' : '#ffa07a',
                    margin: 10,
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <span> {item.name}</span>
                </div>
                )
              })}
            </div>
            : <div className='start'>
              <div style={{ color: 'rgb(255,255,255)', fontSize: 15, textAlign: 'center', marginTop: 35 }}>幸运的训练师，恭喜你获得了5个大师球，现在就开始捕获属于自己的宝可梦吧</div>
              <Button type='primary'
                style={{ marginLeft: '50%', marginTop: 50, transform: 'translate(-50%)' }}
                onClick={this.startCatch} >开始捕获</Button>
            </div>
        }

      </div>
    )
  }
}
