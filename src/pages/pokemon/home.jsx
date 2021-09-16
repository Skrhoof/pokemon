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

const Option = Select.Option

export default class Home extends Component {
  render() {

    const title = (
      <span>
        <Select value='1' style={{ width: 150 }}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按名称搜索</Option>
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
          <Table />
        </Card>
      </div>
    )
  }
}
