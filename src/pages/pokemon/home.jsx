import React, { Component } from 'react'

import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'

import { PlusOutlined } from '@ant-design/icons';
import { reqPokemons } from '../../api';

const Option = Select.Option

export default class Home extends Component {

  state = {
    pokemons: [],
  }

  initColumns = () => {
    this.columns = [
      {
        width: 180,
        title: '宝可梦名称',
        dataIndex: 'name',
      },
      {
        title: '宝可梦描述',
        dataIndex: 'desc',
      },
      {
        width: 180,
        title: '价格',
        dataIndex: 'price',
        render: (price) => price + '金'
      },
      {
        width: 200,
        title: '状态',
        dataIndex: 'status',
        render: (price) => {
          return (
            <span>
              <span>在售</span>&nbsp;&nbsp;&nbsp;
              <Button type='primary'>下架</Button>
            </span>
          )
        }
      },
      {
        width: 150,
        title: '操作',
        render: (pokemon) => {
          return (
            <span>
              <a>详情</a>&nbsp;&nbsp;&nbsp;
              <a>修改</a>
            </span>
          )
        }
      },
    ]
  }

  componentWillMount() {
    this.initColumns();
  }

  render() {

    const title = (
      <span>
        <Select value='1' style={{ width: 150 }}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} />
        <Button type='primary'>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={() => { }}>
        <PlusOutlined />
        添加
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            dataSource={[
              {
                name: '123',
                desc: '564',
                price: 555,
                status: '1',
              }
            ]}
            columns={this.columns}
          />
        </Card>
      </div>
    )
  }
}
