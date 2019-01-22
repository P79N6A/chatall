import Cookie from '@/utils/auth'

export default {
  state: {
    isManager: false,
    atWord: '',
    activeIndex: 0,
    showInfo: false,
    isLogin: false,
    userInfo: {
      userid: '',
      nickname: '',
      headimage: '1.png',
      userdegree: 0,
      userflag: 1
    },
    status: '',
    token: Cookie.getToken(),
    name: '',
    roles: [],
    avatar: '',
    timer: [],
    redBagStutas: '',
    redInfo: {
      redBagId: '',
      redBagAvatar: '',
      redBagRemarks: '',
      redBagNickname: ''
    },
    reciveMoney: '',
    redDetail: null,
    redBag: null,
    privateInfo: {},
    currentRoomId: '',
    room: null,
    forwardMsgId: '',
  },
  mutations: {
    UPDATE_MANAGE(state, newState) {
      state.isManager = newState
    },
    UPDATE_REDBAG(state, newRedbag) {
      state.redBag = newRedbag
    },
    SET_RECIVERED(state, newRecive) {
      state.reciveMoney = newRecive
    },
    UPDATE_REDETAIL(state, newDetail) {
      state.redDetail = newDetail
    },
    SET_PINFO(state, newPinfo) {
      state.privateInfo = newPinfo
    },
    SET_ATWORD(state, newAtWord) {
      state.atWord = newAtWord
    },
    UPDATE_REDINFO(state, newRedInfo) {
      state.redInfo = newRedInfo
    },
    UPDATE_NICKNAME(state, newNickname) {
      state.userInfo.nickname = newNickname
    },
    UPDATE_AVATAR(state, newAvatar) {
      state.userInfo.headimage = newAvatar
    },
    UPDATE_INDEX(state, newIndex) {
      state.activeIndex = newIndex
    },
    UPDATE_ID(state, newid) {
      state.redBagId = newid
    },
    UPDATE_STD(state, newstd) {
      state.redBagStutas = newstd
    },
    SET_INFO(state, bool) {
      state.showInfo = bool
    },
    SET_LOGIN(state, bool) {
      state.isLogin = bool
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_USER_INFO: (state, userinfo) => {
      state.userInfo = userinfo
    },
    SET_TIME(state, newTime) {
      state.timer.push(newTime)
    },
    UPDATE_CURRENTROOMID(state, newRoomId) {
      state.currentRoomId = newRoomId
    },
    UPDATE_ROOM(state, newRoom){
      state.room = newRoom
    },
    UPDATE_MSGID(state, msgId){
      state.forwardMsgId = msgId
    },
  },
  actions: {}
}
