// eslint-disable-next-line
import {
  DesktopOutlined,
  ContainerOutlined,
  BugOutlined,
  HomeOutlined
} from '@ant-design/icons';

export default [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的 path
    icon: <HomeOutlined />,
  },
  {
    title: '宝可梦',
    key: '/pokemons',
    icon: <BugOutlined />,
    children: [ // 子菜单列表
      {
        title: '物种管理',
        key: '/species',
      },
      {
        title: '宝可梦管理',
        key: '/pokemon',
      },
      {
        title: '捕获宝可梦',
        key: '/pokemonCatch',
      },
    ]
  },
  {
    title: '训练师管理',
    key: '/user',
    icon: <DesktopOutlined />
  },
  {
    title: '权限管理',
    key: '/role',
    icon: <ContainerOutlined />,
  },
]