import ajax from "./ajax";

//登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//添加用户
export const reqUserAdd = (user) => ajax('/manage/uesr/add', user, 'POST')