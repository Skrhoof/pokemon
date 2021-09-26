export const echarts1 = {
  title: { text: '宝可梦热销统计' },
  tooltip: {},
  xAxis: {
    data: ["妙蛙种子", "炎兔儿", "沼王", "凯西", "泪眼蜥"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [320, 276, 184, 226, 308]
  }]
}

export const echarts2 = {
  title: {
    text: '真新镇天气预报'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: '最高',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均' }]
      }
    },
    {
      name: '最低',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max'
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max'
              },
              type: 'max',
              name: '最高点'
            }
          ]
        ]
      }
    }
  ]
}

export const echarts3 = {
  title: {
    text: '今日宝可梦属性分布'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 'bottom',
    left: 'center'
  },
  series: [
    {
      name: '属性',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '草' },
        { value: 735, name: '火' },
        { value: 580, name: '水' },
        { value: 484, name: '飞行' },
        { value: 300, name: '虫' }
      ]
    }
  ]
}

var data = [
  {
    name: '阿尔宙斯',
    children: [
      {
        name: '帝牙卢卡',
        value: 15,
      },
      {
        name: '帕路奇亚',
        value: 10,
      },
      {
        name: '骑拉帝纳',
        value: 10,
      },
      {
        name: '地球',
        value: 10,
        children: [
          {
            name: '盖欧卡',
            value: 2,
            children: [
              {
                name: '洛奇亚',
                value: 2,
                children: [
                  {
                    name: '火焰鸟',
                    value: 5,
                  },
                  {
                    name:'闪电鸟',
                    value:4
                  },
                  {
                    name:'急冻鸟',
                    value:3
                  },
                ]
              }
            ]
          },
          {
            name: '烈空坐',
            value: 5,
            children: [
              {
                name: '凤王',
                value: 3,
                children: [
                  {
                    name: '雷公',
                    value: 3,
                  },
                  {
                    name:'炎帝',
                    value:2
                  },
                  {
                    name:'水君',
                    value:2
                  },
                ]
              }
            ]
          },
          {
            name: '固拉多',
            value: 4,
            children: [
              {
                name: '雷吉奇卡斯',
                value: 3,
                children: [
                  {
                    name: '雷吉洛克',
                    value: 2,
                  },
                  {
                    name:'雷吉艾斯',
                    value:2
                  },
                  {
                    name:'雷吉斯奇鲁',
                    value:2
                  },
                ]
              }
            ]
          }
        ]
      },
    ]
  }
];

export const echarts4 = {
  title:{
    text:'宝可梦族谱'
  },
  series: {
    type: 'sunburst',
    data: data,
    radius: [60, '90%'],
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2
    },
    label: {
      show: true
    }
  }
}