import React, { Component } from 'react'
import * as echarts from 'echarts';

import { echarts1, echarts2, echarts3, echarts4 } from '../../config/echartsOption';
import './home.less'

export default class Home extends Component {

  componentDidMount() {
    const myChart1 = echarts.init(document.getElementById('part1'));
    const myChart2 = echarts.init(document.getElementById('part2'));
    const myChart3 = echarts.init(document.getElementById('part3'));
    const myChart4 = echarts.init(document.getElementById('part4'));
    // 绘制图表
    myChart1.setOption(echarts1);
    myChart2.setOption(echarts2);
    myChart3.setOption(echarts3);
    myChart4.setOption(echarts4);
  }

  render() {
    return (
      <div className='home'>
        {/* <h1>欢迎来到宝可梦集市</h1> */}
        <div className='row'>
          <div id='part1' className='part' style={{}}></div>
          <div id='part2' className='part' style={{}}></div>
        </div>
        <div className='row'>
          <div id='part3' className='part' style={{ height: 450 }}></div>
          <div id='part4' className='part' style={{ height: 450 }}></div>
        </div>
      </div>
    )
  }
}
