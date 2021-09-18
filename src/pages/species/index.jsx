import React, { Component } from 'react'

import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqSpecies, reqUpdateSpecies, reqAddSpecies } from '../../api';

export default class Species extends Component {

  state = {
    species: [],
    showStatus: 0,
  }

  species = {}
  updateName = ''
  addName = ''

  getList = async () => {
    const response = await reqSpecies('0');
    //console.log(response.data.data);
    this.setState({ species: response.data.data });
  }

  cancel = () => {
    this.setState({ showStatus: 0 })
  }

  showUpdate = (data) => {
    console.log(data);
    this.species = data;
    this.setState({ showStatus: 2 })
  }

  addSpecies = async () => {
    this.setState({ showStatus: 0 })
    const speciesName = this.addName;
    console.log('speciesName', speciesName);
    const result = await reqAddSpecies({ speciesName, parentId: '0' });
    console.log(result);
    if (result.data.status === 0) {
      this.getList();
    } else {
      message.error(result.data.msg)
    }

  }

  updateSpecies = async () => {
    this.setState({ showStatus: 0 })
    const speciesId = this.species._id;
    const speciesName = this.updateName;
    console.log(speciesId);
    const result = await reqUpdateSpecies({ speciesId, speciesName })
    if (result.data.status === 0) {
      this.getList();
    }
  }

  getUpdateValue = (e) => {
    this.updateName = e.target.value
  }

  getAddValue = (e) => {
    this.addName = e.target.value
  }


  componentWillMount() {
    this.columns = [
      {
        title: '种族',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: ' 操作',
        width: 300,
        render: (data) => (
          <span>
            <a onClick={() => { this.showUpdate(data) }}>修改种族
            </a>
            &nbsp;&nbsp;&nbsp;
            <a onClick={() => { this.showUpdate(data) }}>删除种族
            </a>
          </span>)
      }
    ];
  }

  componentDidMount() {
    this.getList();
  }


  render() {
    const { species, showStatus } = this.state;
    const title = '分类';
    const extra = (
      <Button type='primary' onClick={() => this.setState({ showStatus: 1 })}>
        <PlusOutlined />
        添加
      </Button>
    )
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            dataSource={species}
            columns={this.columns}
          />

        </Card>
        <Modal
          title="添加物种"
          visible={showStatus === 1}
          onOk={this.addSpecies}
          onCancel={this.cancel}
        >
          <Form>
            < Form.Item
              label='新增种族名称'>
              <Input
                placeholder='请输入种族名称'
                onChange={this.getAddValue} />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="更新物种"
          visible={showStatus === 2}
          onOk={this.updateSpecies}
          onCancel={this.cancel}
        >
          <Form.Item
            label='更新种族名称'
          >
            <Input
              placeholder=' 请输入物种名称'
              defaultValue={this.species.name || ''}
              onChange={this.getUpdateValue} />
          </Form.Item>
        </Modal>
      </div>
    )
  }
}
