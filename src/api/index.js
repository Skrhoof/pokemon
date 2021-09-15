import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";

//登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//添加用户
export const reqUserAdd = (user) => ajax('/manage/uesr/add', user, 'POST')

//获取分类列表
export const reqSpecies = (parentId) => ajax('/manage/species/list', { parentId })