import httpService from './http.service';

const userEndPoint = 'user/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },
  create: async (payload) => {
    const {data} = await httpService.put(userEndPoint+payload._id, payload);
    return data;
  }
  // logIn: async (log) => {
  //   const {data} = await httpService.get(userEndPoint+log._id, log);
  // }
};

export default userService;