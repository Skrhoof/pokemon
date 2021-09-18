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
import { reqPokemons, reqSearchPokemons } from '../../api';
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

export default class Home extends Component {

  state = {
    total: 0,
    pokemons: [],
    searchName: '',
    searchType: 'pokemonName',
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
              <a onClick={()=>this.props.history.push('/pokemon/detail',pokemon)}>详情</a>&nbsp;&nbsp;&nbsp;
              <a>修改</a>
            </span>
          )
        }
      },
    ]
  }

  getPokemons = async (pageNum) => {
    const { searchName, searchType } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchPokemons({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
      console.log(result);
    } else {
      result = await reqPokemons(pageNum, PAGE_SIZE);
    }
    //console.log(result);
    if (result.data.status === 0) {
      this.setState({ pokemons: result.data.data.list, total: result.data.data.total })
    }
  }

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getPokemons(1);
  }

  render() {
    const { total, pokemons, searchType, searchName } = this.state;
    const title = (
      <span>
        <Select value={searchType} style={{ width: 150 }} onChange={value => this.setState({ searchType: value })}>
          <Option value='pokemonName'>按名称搜索</Option>
          <Option value='pokemonDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} value={searchName} onChange={e => this.setState({ searchName: e.target.value })} />
        <Button type='primary' onClick={() => this.getPokemons(1)}>搜索</Button>
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
            dataSource={pokemons}
            columns={this.columns}
            pagination={{
              total,
              defaultPageSize: PAGE_SIZE,
              onChange: this.getPokemons
            }}
          />
        </Card>
      </div>
    )
  }
}
