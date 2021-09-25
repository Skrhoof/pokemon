import ajax from "./ajax";


//登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//添加用户
export const reqUserAdd = (user) => ajax('/manage/uesr/add', user, 'POST')

//获取分类列表
export const reqSpecies = (parentId) => ajax('/manage/species/list', { parentId })

//添加分类 
export const reqAddSpecies = ({ parentId, speciesName }) => ajax('/manage/species/add', { parentId, speciesName }, 'POST');

//更新分类
export const reqUpdateSpecies = ({ speciesId, speciesName }) => ajax('/manage/species/update', { speciesId, speciesName }, 'POST')

//获取一个分类
export const reqSpecie = (speciesId) => ajax('/manage/species/info', { speciesId })

//抓捕宝可梦
export const reqCatchPokemon0 = ({ rarity0 }) => ajax('/manage/pokemonCatch0', { rarity0 }, 'POST')
export const reqCatchPokemon1 = ({ rarity1 }) => ajax('/manage/pokemonCatch1', { rarity1 }, 'POST')
export const reqCatchPokemon2 = ({ rarity2 }) => ajax('/manage/pokemonCatch2', { rarity2 }, 'POST')

//宝可梦列表
export const reqPokemons = (pageNum, pageSize) => ajax('/manage/pokemon/list', { pageNum, pageSize })

//搜索宝可梦列表
export const reqSearchPokemons = ({ pageNum, pageSize, searchName, searchType }) => ajax('/manage/pokemon/search', { pageNum, pageSize, [searchType]: searchName })

//更新宝可梦状态
export const reqUpdateStatus = (pokemonId, status) => ajax('/manage/pokemon/updateStatus', { pokemonId, status }, 'POST')

//删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, 'POST')

//添加宝可梦
export const reqAddPokemon = (pokemon) => ajax('/manage/pokemon/add', pokemon, 'POST')
//修改宝可梦
export const reqUpdatePokemon = (pokemon) => ajax('/manage/pokemon/update', pokemon, 'POST')