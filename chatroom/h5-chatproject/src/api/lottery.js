import request from '@/utils/request'
import Constants from '@/utils/constants'

var Lottery = {
  getkjArray(){
    return request({
      url: Constants.kjJsonArrayApi
    });
  },

  getKjInfos(requestApi){
    return request({
      url: requestApi,
    });
  },

  getTimer(index) {
    return request({
      url: Constants.kjapi[index],
    });
  },
};

export default Lottery
