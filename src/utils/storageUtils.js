const USER_KEY = 'user_key';
const POKEMON_KEY='pokemon_key'
 //eslint-disable-next-line
export default {
  //保存user
  saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  //读取user
  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  //删除user
  removeUser() {
    localStorage.removeItem(USER_KEY);
  },
  savePokemons(pokemons){
    localStorage.setItem(POKEMON_KEY, JSON.stringify(pokemons));
  },
  getPokemons() {
    return JSON.parse(localStorage.getItem(POKEMON_KEY) || '[]')
  },
}