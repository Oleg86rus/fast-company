import httpService from './http.service';

const professionEndPoint = 'profession/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(professionEndPoint);
    return data;
  }
};

export default userService;