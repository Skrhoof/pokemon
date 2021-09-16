import ajax from "./ajax";


//登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//添加用户
export const reqUserAdd = (user) => ajax('/manage/uesr/add', user, 'POST')

//获取分类列表
export const reqSpecies = (parentId) => ajax('/manage/species/list', { parentId })

//添加分类 
export const reqAddSpecies = ({parentId, speciesName}) => ajax('/manage/species/add', { parentId, speciesName }, 'POST');

//更新分类
export const reqUpdateSpecies = ({ speciesId, speciesName }) => ajax('/manage/species/update', { speciesId, speciesName }, 'POST')

