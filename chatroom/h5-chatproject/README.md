1.项目构建：
    打包完成dist压缩，文件名按照如下格式：
        dist-9935333.com-1.05 --dist + 需打包的网站域名 + 版本号（截止本文档版本为1.05,往后累加）

    修改网站title，需要修改index.build.html,修改index.html无效

2.目录结构：
.
├── README.md           --项目文档
├── build               --webpack配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config              --项目配置文件
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── dist                --打包文件目录
│   ├── index.html
│   └── static
│       ├── css
│       ├── fonts
│       ├── images
│       ├── js
│       └── test.json
├── dist-9935333.com-1.04.zip
├── index.build.html   
├── index.html
├── package-lock.json
├── package.json        --项目依赖文件
├── src                 --项目主目录
│   ├── App.vue
│   ├── api             --接口请求文件
│   │   ├── changeinfo.js           --修改个人资料接口
│   │   ├── changepwd.js           --修改密码接口
│   │   ├── chathistory.js           --获取聊天历史接口
│   │   ├── douyulive.js           --真人直播接口
│   │   ├── kaijiang.js           --开奖接口
│   │   ├── kefu.js           --（暂弃用）
│   │   ├── lishikaijiang.js           --获取开奖详情接口
│   │   ├── login.js           --登录、登出接口
│   │   ├── lottery.js           --swiper开奖接口
│   │   ├── plan.js           --（暂弃用）
│   │   ├── redbag.js           --操作红包接口
│   │   ├── regist.js           --注册、获取验证码接口
│   │   ├── signin.js           --（暂弃用）
│   │   ├── user.js           --获取用户列表、获取用户信息接口
│   │   └── userInfo.js           --获取个人信息接口
│   ├── assets                 --样式表情包图片文件，该images仅用于css background
│   │   ├── css
│   │   ├── images
│   │   ├── js
│   │   └── test.json
│   ├── components              --所有vue文件
│   │   ├── Modal.vue
│   │   ├── SvgIcon.vue
│   │   ├── bet.vue              --下注页面
│   │   ├── center.vue              --个人中心页面
│   │   ├── customer.vue              -- （暂弃用）
│   │   ├── getRed.vue              --收到的红包页面
│   │   ├── home.vue              --主页面
│   │   ├── hongbaodetail.vue              --红包历史页面
│   │   ├── imgupload.vue              
│   │   ├── kaijiangdetail.vue              --开奖详情页面
│   │   ├── live.vue              --开奖页面
│   │   ├── lottery.vue              -- （暂弃用）
│   │   ├── mainlive.vue              -- （暂弃用）
│   │   ├── messageItem.vue              --消息显示组件
│   │   ├── moneydetail.vue              --零钱详细页面
│   │   ├── outRed.vue              --发出的红包页面
│   │   ├── plan.vue              -- （暂弃用）
│   │   ├── prettylive.vue              --美女直播页面
│   │   ├── private.vue              --私聊页面
│   │   ├── privitechatwindow.vue              --私聊消息显示组件
│   │   ├── privitelist.vue              --私聊列表页面
│   │   ├── redrecode.vue              --红包明细页面
│   │   ├── regist.vue              --登录注册页面
│   │   ├── sendred.vue              --发红包页面
│   │   ├── smile.vue
│   │   ├── sort.vue              --@功能页面
│   │   ├── swiper.vue              --swiper页面
│   │   ├── user.vue
│   │   └── zhuanzhang.vue              --转账页面
│   ├── icons
│   │   ├── index.js
│   │   └── svg
│   ├── main.js                     --入口文件
│   ├── router              
│   │   └── index.js
│   ├── routes.js              --项目路由配置文件
│   ├── sess.js
│   └── utils              --功能类
│       ├── Util.js
│       ├── auth.js
│       ├── constants.js
│       ├── dealemoji.js
│       ├── douyurequest.js
│       ├── md5Utils.js
│       ├── privitelocalstorge.js
│       ├── request.js
│       ├── sort.js
│       ├── vueFilter.js
│       └── vuexStore.js
├── static              --静态资源
│   ├── css
│   │   └── base.css
│   ├── images
│   │   ├── avatars
│   │   ├── bar
│   │   ├── biaoqingbao
│   │   ├── emoji
│   │   ├── fasong.png
│   │   ├── hongbao
│   │   ├── index.png
│   │   ├── kaijianglogo
│   │   ├── kefu.png
│   │   ├── level
│   │   ├── live
│   │   ├── lottoreylogo
│   │   ├── menu.png
│   │   ├── mobile_logo.png
│   │   ├── more.png
│   │   ├── newlevels
│   │   ├── plus.png
│   │   ├── qingping.png
│   │   ├── regist
│   │   ├── slidelevel
│   │   ├── smile.png
│   │   ├── tag
│   │   ├── tctx-ico.ico
│   │   ├── touch-logo.png
│   │   ├── xiaoxi.png
│   │   ├── xuanfu
│   │   └── yonghu.png
│   └── test.json
├── test
│   ├── e2e
│   │   ├── custom-assertions
│   │   ├── nightwatch.conf.js
│   │   ├── runner.js
│   │   └── specs
│   └── unit
│       ├── jest.conf.js
│       ├── setup.js
│       └── specs
└── ticaitianxia-9935333.com-dist.zip

3.主要功能实现：
    UI库：
        https://github.com/wangdahoo/vonic

    websocket实例、配置、操作均在main.js实现。
        InitSocket()方法，将会链接websocket。
        disconnect()方法，将会断开websocket。

    私聊功能：
        配合localStorge本地储存实现私聊功能。
        /src/utils/privitelocalstorge.js 该文件实现获取并返回域名， 写值和读值功能。
        localStorge的JSON数据结构：
            {
                "域名": [
                    {
                        "type": "",
                        "mtype": "",
                        "toid": "",
                        "tonickname": "",
                        "toavatar": "",
                        "time": "",
                        "fromid": "",
                        "fromavatar": "",
                        "fromnickname": "",
                        "content": "",
                        "neverseen": true, //是否已读
                        "data": [
                            {
                                "type": "",
                                "mtype": "",
                                "toid": "",
                                "tonickname": "",
                                "toavatar": "",
                                "time": "",
                                "fromid": "",
                                "fromavatar": "",
                                "fromnickname": "",
                                "content": "",
                                "neverseen": true,
                                "data": []
                            }
                        ]
                    }
                ]
            }

            红包功能：
            /src/components/messageitem.vue 通过点击事件获取红包状态码并更新到vuex
            父组件home.vue获取到状态码控制显示抢红包

            艾特功能：
            /src/utils/sort.js
            该js文件实现了文字按照汉语拼音返回

            美女直播：
            使用flv.js转码flv直播流，需要解决的问题：视频流接口拒绝访问，以及fetch跨域


            