import React, { Component } from 'react'

import { Card, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqSpecies } from '../../api';


export default class Species extends Component {

  state = {
    species: []
  }

  getList = async () => {
    const response = await reqSpecies('0');
    //console.log(response.data.data);
    this.setState({ species: response.data.data });
  }

  componentWillMount(){
    this.columns = [
      {
        title: '种族',
        dataIndex: 'name',
        key: 'name',
      },{
        title: ' 操作',
        width: 300,
        render: () => (
        <span>
        <a onClick={()=>{}}>修改种族
        </a>
        &nbsp;&nbsp;&nbsp;
        <a onClick={()=>{}}>删除种族
        </a>
        </span>)
      }
    ];
  }

  componentDidMount() {
    this.getList()
  }


  render() {
    const { species } = this.state;
    const title = '分类';
    const extra = (
      <Button type='primary'>
        <PlusOutlined />
        添加
      </Button>
    )
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table bordered dataSource={species} columns={this.columns} />
        </Card>
      </div>
    )
  }
}
