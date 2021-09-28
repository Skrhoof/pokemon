import React, { Component } from 'react'
import { Card, Row, Col, Descriptions, Carousel } from 'antd';
import storageUtils from '../../utils/storageUtils';
import man from '../../assets/images/man.png'

import './user.less'
import poke1 from './img/poke1.jpg'
import poke2 from './img/poke2.jpg'
import poke3 from './img/poke3.jpg'
import poke4 from './img/poke4.jpg'
import ball from '../../assets/images/ball.png'

export default class User extends Component {

  state = {
    pokemons: []
  }

  user = {}

  componentWillMount() {
    const user = storageUtils.getUser()
    // console.log(user);
    this.user = user;
    const pokemons = storageUtils.getPokemons()
    console.log(pokemons);
    this.setState({ pokemons });
  }

  render() {
    const contentStyle = {
      height: '222px',
    };
    const { pokemons } = this.state;
    return (
      <div>
        <div className='user-top'>
          <div className="site-card-wrapper">
            <Row justify="center">
              <Col span={4}>
                <Card title="训练师" bordered={true}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={man} />}>
                </Card>
              </Col>
              <Col span={16}>
                <Card title="训练师信息" bordered={false}>
                  <Descriptions layout="vertical">
                    <Descriptions.Item label="用户名">{this.user.username}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{this.user.phone === '' ? '无' : this.user.phone}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{this.user.email === '' ? '无' : this.user.email}</Descriptions.Item>
                    <Descriptions.Item label="宝可梦背包" span={3}>
                      {pokemons === [] ? '无' : pokemons.map((item) => {
                        return (
                          <div>
                            <img src={ball} style={{width:20,marginTop:-5}}/>
                            <span style={{marginRight:15}}> {item.name}</span>
                          </div>

                        )
                      })}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <div className='user-bottom'>
          <Carousel autoplay style={{ width: 600 }}>
            <div>
              <img src={poke1} style={contentStyle}></img>
            </div>
            <div>
              <img src={poke2} style={contentStyle}></img>
            </div>
            <div>
              <img src={poke3} style={contentStyle}></img>
            </div>
            <div>
              <img src={poke4} style={contentStyle}></img>
            </div>
          </Carousel>
        </div>

      </div>
    )
  }
}
