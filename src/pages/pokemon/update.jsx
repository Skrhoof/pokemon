import React, { Component } from 'react'
import { Card, Form, Input, Select, Upload, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

import { reqSpecies, reqUpdatePokemon, reqAddPokemon } from '../../api';
import PicturesWall from '../../components/PictureWall'
import RichTextEditor from '../../components/RichTextEditor';

const Item = Form.Item;
const { TextArea } = Input;
const { Option } = Select;


export default class Update extends Component {

  constructor(props) {
    super(props)
    this.pw = React.createRef();
    this.editor = React.createRef();
  }

  state = {
    species: [],
  }

  onFinish = async (values) => {
    console.log('Success:', values);
    const { pokename, pokeprice, pokedesc, pokespecies } = values;
    const imgs = this.pw.current.getImgs();
    const detail = this.editor.current.getDetail();
    console.log(imgs, detail);
    const pokemon = {
      name: pokename,
      price: pokeprice,
      speciesId: pokespecies,
      desc: pokedesc,
      imgs: imgs,
      detail: detail,
    }
    let result
    if (this.isUpdate) {
      pokemon._id = this.pokemon._id;
      result = await reqUpdatePokemon(pokemon)
      if (result.data.status === 0) {
        message.success('更新成功')
        this.props.history.goBack();
      } else {
        message.error('失败')
      }
    } else {
      result = await reqAddPokemon(pokemon)
      if (result.data.status === 0) {
        message.success('添加成功')
        this.props.history.goBack();
      } else {
        message.error('失败')
      }
    }
  }

  getList = async () => {
    const response = await reqSpecies('0');
    //console.log(response.data.data);
    this.setState({ species: response.data.data });
  }

  componentDidMount() {
    this.getList();
  }

  componentWillMount() {
    // 取出跳转传入的数据
    const pokemon = this.props.location.state
    this.pokemon = pokemon || {}
    this.isUpdate = !!pokemon // !!xxx 将一个数据强制转换成布尔类型
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
            <Input placeholder='请输入宝可梦名称' defaultValue={this.isUpdate ? this.pokemon.name : ''} />
          </Item>
          <Item label='宝可梦描述：'
            name="pokedesc"
            rules={[
              {
                required: true,
                message: '必须输入宝可梦的描述',
              },
            ]}>
            <TextArea placeholder='请输入宝可梦描述' autoSize={{ minRows: 2, maxRows: 6 }} defaultValue={this.isUpdate ? this.pokemon.desc : ''} />
          </Item>
          <Item label='宝可梦价格：'
            name="pokeprice"
            rules={[
              {
                required: true,
                message: '必须输入宝可梦的价格',
              },
            ]}>
            <Input type='number' placeholder='请输入宝可梦价格' addonAfter='金' defaultValue={this.isUpdate ? this.pokemon.price : ''} />
          </Item>
          <Item label='所属物种：'
            name="pokespecies"
            rules={[
              {
                required: true,
                message: '必须选择宝可梦物种',
              },
            ]}>
            <Select defaultValue={this.isUpdate ? this.pokemon.speciesId : ''}>
              {species.map((item) => {
                return (
                  <Option value={item._id}>{item.name}</Option>
                )
              })}
            </Select>
          </Item>
          <Item label='宝可梦照片：'
            name="pokeimgs">
            <PicturesWall ref={this.pw} imgs={this.pokemon.imgs} />
          </Item>
          <Item label='商品详情：'
            name="pokedetail"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.editor} detail={this.pokemon.detail} />
          </Item>
          <Item >
            <Button type='primary' htmlType="submit" >提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
