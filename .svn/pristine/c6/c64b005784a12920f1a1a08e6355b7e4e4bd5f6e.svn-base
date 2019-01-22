
import Home from './components/home.vue'
import User from './components/user.vue'
import Regist from '@/components/regist'
import Live from '@/components/mainlive'
import LotteryPlan from '@/components/lottery'
import Bet from '@/components/bet'
import Open from '@/components/live'
import Center from '@/components/center'
import Plan from '@/components/plan'
import Sendred from '@/components/sendred'
import Redrecode from '@/components/redrecode'
import Sort from '@/components/sort'
import Private from '@/components/private'
import Zhuan from '@/components/zhuanzhang'
import Gotred from '@/components/getRed'
import Outred from '@/components/outRed'
import Privitelsit from '@/components/privitelist'
import RedDetail from '@/components/hongbaodetail'
import MoneyDetail from '@/components/moneydetail'
import Upload from '@/components/imgupload'
import LotteryDetail from '@/components/kaijiangdetail'

export default [
	{ 
		path: '/',
		name:'Home',
		component: Home,
		children: [
			{
				path: '/lottery-plan',
				name: 'plan',
				component: LotteryPlan
			},
			{
				path: '/bet',
				name: 'bet',
				component: Bet
			},
			{
				path: '/lottery-open',
				name: 'lotteryopen',
				component: Open
			}
		]
	},
	{ 
		path: '/user',
		name:'User',
		component: User 
	},
	{
		path: '/regist&login',
		name: 'regist',
		component: Regist
	},
	{
		path: '/pretty-live',
		name: 'prettylive',
		component: Live
	},
	{
		path: '/center',
		name: 'center',
		component: Center
	},
	{
		path: '/plan/:id',
		name: 'plans',
		component: Plan
	},
	{
		path: '/sendred',
		name: 'redsend',
		component: Sendred
	},
	{
		path: '/redrecode',
		name: 'recond',
		component: Redrecode
	},
	{
		path: '/sort',
		name: 'sortpage',
		component: Sort
	},{
		path: '/private',
		name: 'privatechat',
		component: Private
	},{
		path: '/zhuanzhang',
		name: 'zhuan',
		component: Zhuan
	},
	{
		path: '/getred',
		name: 'gotredbag',
		component: Gotred
	},
	{
		path: '/outred',
		name: 'outredbag',
		component: Outred
	},
	{
		path: '/privitelist',
		name: 'plist',
		component: Privitelsit
	},
	{
		path: '/reddetail',
		name: 'reddetail',
		component: RedDetail
	},
	{
		path: '/moneydetail',
		name: 'moneydetail',
		component: MoneyDetail
	},
	{
		path: '/upload',
		name: 'imgupload',
		component: Upload
	},
	{
		path: '/lottreydetail',
		name: 'kaijiangdetail',
		component: LotteryDetail
	}
]
