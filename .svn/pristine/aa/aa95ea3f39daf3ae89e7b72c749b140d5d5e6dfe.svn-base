import Cookie from '@/utils/auth'

export default {
	state:{
		showInfo: false,
		userInfo:{
			userid:'',
			nickname:'',
			headimage:'default.gif',
			userdegree:0,
			userflag:0
		},
		status:'',
		token:Cookie.getToken(),
		name:'',
		roles: [],
		avatar:'',
		timer: [],
	},
	mutations:{
		SET_INFO(state, bool) {
			state.showInfo = bool
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
	    SET_USER_INFO:(state, userinfo)=>{
	    	state.userInfo = userinfo
			},
			SET_TIME(state, newTime) {
				state.timer.push(newTime)
			}
	},
	actions:{
	    
	}
}