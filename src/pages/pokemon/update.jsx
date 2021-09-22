import React, { Component } from 'react'
import { Card, Form, Input, Select, Upload, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

import { reqSpecies } from '../../api';
import PicturesWall from '../../components/PictureWall'

const Item = Form.Item;
const { TextArea } = Input;
const { Option } = Select;


export default class Update extends Component {

  state = {
    species: [],
  }

  onFinish = (values) => {
    console.log('Success:', values);
  };

  getList = async () => {
    const response = await reqSpecies('0');
    //console.log(response.data.data);
    this.setState({ species: response.data.data });
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const { species } = this.state;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    const title = (
      <span>
        <ArrowLeftOutlined style={{ color: 'green' }} onClick={() => this.props.history.goBack()} />
        &nbsp;&nbsp;&nbsp;
        <span>宝可梦详情</span>
      </span>
    )
    return (
      <Card title={title} className='pokemon-detail'>
        <Form {...formItemLayout} onFinish={this.onFinish}>
          <Item label='宝可梦名称：'
            name="pokename"
            rules={[
              {
                required: true,
                message: '必须输入宝可梦名字哦',
              },
            ]}>
            <Input placeholder='请输入宝可梦名称' />
          </Item>
          <Item label='宝可梦描述：'
            name="pokedesc"
            rules={[
              {
                required: true,
                message: '必须输入宝可梦的描述',
              },
            ]}>
            <TextArea placeholder='请输入宝可梦描述' autoSize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item label='宝可梦价格：'
            name="pokeprice"
            rules={[
              {
                required: true,
                message: '必须输入宝可梦的价格',
              },
            ]}>
            <Input type='number' placeholder='请输入宝可梦价格' addonAfter='金' />
          </Item>
          <Item label='所属物种：'
            name="pokespecies"
            rules={[
              {
                required: true,
                message: '必须选择宝可梦物种',
              },
            ]}>
            <Select>
              {species.map((item) => {
                return (
                  <Option value={item._id}>{item.name}</Option>
                )
              })}
            </Select>
          </Item>
          <Item label='宝可梦照片：'
            name="pokeimgs">
            <PicturesWall />
          </Item>
          <Item label='商品详情：'
            name="pokedetail">

          </Item>
          <Item >
            <Button type='primary' htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
