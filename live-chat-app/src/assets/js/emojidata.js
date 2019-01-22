import util from '@/utils/constants'
const allEmoji = {
    '[可爱]': util.standardImgUrl + 'emoji_01.png',
    '[大笑]': util.standardImgUrl + 'emoji_00.png', 
    '[色]': util.standardImgUrl + 'emoji_02.png', 
    '[嘘]': util.standardImgUrl + 'emoji_03.png', 
    '[亲]': util.standardImgUrl + 'emoji_04.png',
    '[呆]': util.standardImgUrl + 'emoji_05.png ',
    '[口水]': util.standardImgUrl + 'emoji_06.png',
    '[汗]': util.standardImgUrl + 'emoji_145.png',
    '[呲牙]': util.standardImgUrl + 'emoji_07.png', 
    '[鬼脸]': util.standardImgUrl + 'emoji_08.png', 
    '[害羞]': util.standardImgUrl + 'emoji_09.png',
    '[偷笑]': util.standardImgUrl + 'emoji_10.png',
    '[调皮]': util.standardImgUrl + 'emoji_11.png',
    '[可怜]': util.standardImgUrl + 'emoji_12.png',
    '[敲]': util.standardImgUrl + 'emoji_13.png',
    '[惊讶]': util.standardImgUrl + 'emoji_14.png',
    '[流感]': util.standardImgUrl + 'emoji_15.png',
    '[委屈]': util.standardImgUrl + 'emoji_16.png',
    '[流泪]': util.standardImgUrl + 'emoji_17.png',
    '[嚎哭]': util.standardImgUrl + 'emoji_18.png',
    '[惊恐]': util.standardImgUrl + 'emoji_19.png',
    '[怒]': util.standardImgUrl + 'emoji_20.png',
    '[酷]': util.standardImgUrl + 'emoji_21.png',
    '[不说]': util.standardImgUrl + 'emoji_22.png',
    '[鄙视]': util.standardImgUrl + 'emoji_23.png',
    '[阿弥陀佛]': util.standardImgUrl + 'emoji_24.png',
    '[奸笑]': util.standardImgUrl + 'emoji_25.png',
    '[睡着]': util.standardImgUrl + 'emoji_26.png',
    '[口罩]': util.standardImgUrl + 'emoji_27.png',
    '[努力]': util.standardImgUrl + 'emoji_28.png',
    '[抠鼻孔]': util.standardImgUrl + 'emoji_29.png',
    '[疑问]': util.standardImgUrl + 'emoji_30.png',
    '[怒骂]': util.standardImgUrl + 'emoji_31.png',
    '[晕]': util.standardImgUrl + 'emoji_32.png',
    '[呕吐]': util.standardImgUrl + 'emoji_33.png',
    '[拜一拜]':  util.standardImgUrl + 'emoji_160.png',
    '[惊喜]':  util.standardImgUrl + 'emoji_161.png',
    '[流汗]':  util.standardImgUrl + 'emoji_162.png',
    '[卖萌]':  util.standardImgUrl + 'emoji_163.png',
    '[默契眨眼]':  util.standardImgUrl + 'emoji_164.png',
    '[烧香拜佛]':  util.standardImgUrl + 'emoji_165.png',
    '[晚安]':  util.standardImgUrl + 'emoji_166.png',
    '[强]': util.standardImgUrl + 'emoji_34.png',
    '[弱]': util.standardImgUrl + 'emoji_35.png',
    '[OK]': util.standardImgUrl + 'emoji_36.png',
    '[拳头]': util.standardImgUrl + 'emoji_37.png',
    '[胜利]': util.standardImgUrl + 'emoji_38.png',
    '[鼓掌]': util.standardImgUrl + 'emoji_39.png',
    '[握手]':  util.standardImgUrl + 'emoji_167.png',
    '[发怒]': util.standardImgUrl + 'emoji_40.png',
    '[骷髅]': util.standardImgUrl + 'emoji_41.png',
    '[便便]': util.standardImgUrl + 'emoji_42.png',
    '[火]': util.standardImgUrl + 'emoji_43.png',
    '[溜]': util.standardImgUrl + 'emoji_44.png',
    '[爱心]': util.standardImgUrl + 'emoji_45.png',
    '[心碎]': util.standardImgUrl + 'emoji_46.png',
    '[钟情]': util.standardImgUrl + 'emoji_47.png',
    '[唇]': util.standardImgUrl + 'emoji_48.png',
    '[戒指]': util.standardImgUrl + 'emoji_49.png',
    '[钻石]': util.standardImgUrl + 'emoji_50.png',
    '[太阳]': util.standardImgUrl + 'emoji_51.png',
    '[有时晴]': util.standardImgUrl + 'emoji_52.png',
    '[多云]': util.standardImgUrl + 'emoji_53.png',
    '[雷]': util.standardImgUrl + 'emoji_54.png',
    '[雨]': util.standardImgUrl + 'emoji_55.png',
    '[雪花]': util.standardImgUrl + 'emoji_56.png',
    '[爱人]': util.standardImgUrl + 'emoji_57.png',
    '[帽子]': util.standardImgUrl + 'emoji_58.png',
    '[皇冠]': util.standardImgUrl + 'emoji_59.png',
    '[篮球]': util.standardImgUrl + 'emoji_60.png',
    '[足球]': util.standardImgUrl + 'emoji_61.png',
    '[垒球]': util.standardImgUrl + 'emoji_62.png',
    '[网球]': util.standardImgUrl + 'emoji_63.png',
    '[台球]': util.standardImgUrl + 'emoji_64.png',
    '[咖啡]': util.standardImgUrl + 'emoji_65.png',
    '[啤酒]': util.standardImgUrl + 'emoji_66.png',
    '[干杯]': util.standardImgUrl + 'emoji_67.png',
    '[柠檬汁]': util.standardImgUrl + 'emoji_68.png',
    '[餐具]': util.standardImgUrl + 'emoji_69.png',
    '[汉堡]': util.standardImgUrl + 'emoji_70.png',
    '[鸡腿]': util.standardImgUrl + 'emoji_71.png',
    '[面条]': util.standardImgUrl + 'emoji_72.png',
    '[冰淇淋]': util.standardImgUrl + 'emoji_73.png',
    '[沙冰]': util.standardImgUrl + 'emoji_74.png',
    '[生日蛋糕]': util.standardImgUrl + 'emoji_75.png',
    '[蛋糕]': util.standardImgUrl + 'emoji_76.png',
    '[糖果]': util.standardImgUrl + 'emoji_77.png',
    '[葡萄]': util.standardImgUrl + 'emoji_78.png',
    '[西瓜]': util.standardImgUrl + 'emoji_79.png',
    '[光碟]': util.standardImgUrl + 'emoji_80.png',
    '[手机]': util.standardImgUrl + 'emoji_81.png',
    '[电话]': util.standardImgUrl + 'emoji_82.png',
    '[电视]': util.standardImgUrl + 'emoji_83.png',
    '[声音开启]': util.standardImgUrl + 'emoji_84.png',
    '[声音关闭]': util.standardImgUrl + 'emoji_85.png',
    '[铃铛]': util.standardImgUrl + 'emoji_86.png',
    '[锁头]': util.standardImgUrl + 'emoji_87.png',
    '[放大镜]': util.standardImgUrl + 'emoji_88.png',
    '[灯泡]': util.standardImgUrl + 'emoji_89.png',
    '[锤头]': util.standardImgUrl + 'emoji_90.png',
    '[烟]': util.standardImgUrl + 'emoji_91.png',
    '[炸弹]': util.standardImgUrl + 'emoji_92.png',
    '[枪]': util.standardImgUrl + 'emoji_93.png',
    '[刀]': util.standardImgUrl + 'emoji_94.png',
    '[药]': util.standardImgUrl + 'emoji_95.png',
    '[打针]': util.standardImgUrl + 'emoji_96.png',
    '[钱袋]': util.standardImgUrl + 'emoji_97.png',
    '[钞票]': util.standardImgUrl + 'emoji_98.png',
    '[银行卡]': util.standardImgUrl + 'emoji_99.png',
    '[手柄]':  util.standardImgUrl + 'emoji_100.png',
    '[麻将]':  util.standardImgUrl + 'emoji_101.png',
    '[调色板]':  util.standardImgUrl + 'emoji_102.png',
    '[电影]':  util.standardImgUrl + 'emoji_103.png',
    '[麦克风]':  util.standardImgUrl + 'emoji_104.png',
    '[耳机]':  util.standardImgUrl + 'emoji_105.png',
    '[音乐]':  util.standardImgUrl + 'emoji_106.png',
    '[吉他]':  util.standardImgUrl + 'emoji_107.png',
    '[火箭]':  util.standardImgUrl + 'emoji_108.png',
    '[飞机]':  util.standardImgUrl + 'emoji_109.png',
    '[火车]':  util.standardImgUrl + 'emoji_110.png',
    '[公交]':  util.standardImgUrl + 'emoji_111.png',
    '[轿车]':  util.standardImgUrl + 'emoji_112.png',
    '[出租车]':  util.standardImgUrl + 'emoji_113.png',
    '[警车]':  util.standardImgUrl + 'emoji_114.png',
    '[自行车]':  util.standardImgUrl + 'emoji_115.png',
    '[鲜花]': util.staticUrl + '/images/face/flower.gif',
    '[顶一个]': util.staticUrl + '/images/face/dyg.gif',
    '[赞]': util.staticUrl + '/images/face/good.gif',
    '[大鲜花]': util.staticUrl + '/images/face/xh.gif',
    '[赞一个]': util.staticUrl +  '/images/face/zyg.gif',
    '[掌声]': util.staticUrl +  '/images/face/zs.gif',
}

const emojiName = [
    '[可爱]',
    '[大笑]',
    '[色]',
    '[嘘]',
    '[亲]',
    '[呆]',
    '[口水]',
    '[汗]',
    '[呲牙]',
    '[鬼脸]',
    '[害羞]',
    '[偷笑]',
    '[调皮]',
    '[可怜]',
    '[敲]',
    '[惊讶]',
    '[流感]',
    '[委屈]',
    '[流泪]',
    '[嚎哭]',
    '[惊恐]',
    '[怒]',
    '[酷]',
    '[不说]',
    '[鄙视]',
    '[阿弥陀佛]',
    '[奸笑]',
    '[睡着]',
    '[口罩]',
    '[努力]',
    '[抠鼻孔]',
    '[疑问]',
    '[怒骂]',
    '[晕]',
    '[呕吐]',
    '[拜一拜]',
    '[惊喜]',
    '[流汗]',
    '[卖萌]',
    '[默契眨眼]',
    '[烧香拜佛]',
    '[晚安]',
    '[强]',
    '[弱]',
    '[OK]',
    '[拳头]',
    '[胜利]',
    '[鼓掌]',
    '[握手]',
    '[发怒]',
    '[骷髅]',
    '[便便]',
    '[火]',
    '[溜]',
    '[爱心]',
    '[心碎]',
    '[钟情]',
    '[唇]',
    '[戒指]',
    '[钻石]',
    '[太阳]',
    '[有时晴]',
    '[多云]',
    '[雷]',
    '[雨]',
    '[雪花]',
    '[爱人]',
    '[帽子]',
    '[皇冠]',
    '[篮球]',
    '[足球]',
    '[垒球]',
    '[网球]',
    '[台球]',
    '[咖啡]',
    '[啤酒]',
    '[干杯]',
    '[柠檬汁]',
    '[餐具]',
    '[汉堡]',
    '[鸡腿]',
    '[面条]',
    '[冰淇淋]',
    '[沙冰]',
    '[生日蛋糕]',
    '[蛋糕]',
    '[糖果]',
    '[葡萄]',
    '[西瓜]',
    '[光碟]',
    '[手机]',
    '[电话]',
    '[电视]',
    '[声音开启]',
    '[声音关闭]',
    '[铃铛]',
    '[锁头]',
    '[放大镜]',
    '[灯泡]',
    '[锤头]',
    '[烟]',
    '[炸弹]',
    '[枪]',
    '[刀]',
    '[药]',
    '[打针]',
    '[钱袋]',
    '[钞票]',
    '[银行卡]',
    '[手柄]',
    '[麻将]',
    '[调色板]',
    '[电影]',
    '[麦克风]',
    '[耳机]',
    '[音乐]',
    '[吉他]',
    '[火箭]',
    '[飞机]',
    '[火车]',
    '[公交]',
    '[轿车]',
    '[出租车]',
    '[警车]',
    '[自行车]',
]
export default {
    allEmoji,
    emojiName
}



