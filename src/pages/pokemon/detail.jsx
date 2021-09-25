import React, { Component } from 'react'
import {
  Card,
  List
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqSpecie } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants'

const Item = List.Item;

export default class Detail extends Component {

  state = {
    speciesName: ''
  }

  getSpecie = async () => {
    const { speciesId } = this.props.location.state;
    const result = await reqSpecie(speciesId);
    this.setState({ speciesName: result.data.data.name })
  }

  componentDidMount() {
    this.getSpecie();
  }

  render() {
    const { name, desc, price, detail, imgs } = this.props.location.state;
    const { speciesName } = this.state
    const title = (
      <span>
        <ArrowLeftOutlined style={{ color: 'green' }} onClick={() => this.props.history.goBack()} />
        &nbsp;&nbsp;&nbsp;
        <span>宝可梦详情</span>
      </span>
    )
    return (
      <Card title={title} className='pokemon-detail'>
        <List>
          <Item style={{ justifyContent: 'normal' }}>
            <span className='left'>宝可梦名称：</span>
            <span>{name}</span>
          </Item>
          <Item style={{ justifyContent: 'normal' }}>
            <span className='left'>宝可梦描述：</span>
            <span>{desc}</span>
          </Item>
          <Item style={{ justifyContent: 'normal' }}>
            <span className='left'>宝可梦价格：</span>
            <span>{price}金</span>
          </Item>
          <Item style={{ justifyContent: 'normal' }}>
            <span className='left'>所属物种：</span>
            <span>{speciesName}</span>
          </Item>
          <Item style={{ justifyContent: 'normal' }}>
            <span className='left'>宝可梦照片：</span>
            {imgs.map(img => {
              console.log(img);
              return (<img key={img} src={BASE_IMG_URL + img} alt='宝可梦照片' className='pokemon-img' />)
            })}

          </Item>
          <Item style={{ justifyContent: 'normal' }}>
            <span className='left'>商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
