//添加viewport-mate标签缩放网页。
!function(userAgent){
    if(!!userAgent.match(/AppleWebKit.*Mobile.*/)){
        var screen_w = parseInt(window.screen.width),
            scale = screen_w / 375;
            if (/Android (\d+\.\d+)/.test(userAgent)) {
                var version = parseFloat(RegExp.$1);
                if(userAgent.indexOf("MX")>-1&&version>=5){
                    //alert(userAgent)
                    document.write('<meta name="viewport" content="width=375,minimum-scale = ' + scale + ", maximum-scale = " + scale + ', target-densitydpi=device-dpi">');
                }else{
                    document.write(version > 2.3 ? '<meta name="viewport" content="width=375, minimum-scale = ' + scale + ", maximum-scale = " + scale + ', target-densitydpi=device-dpi">': '<meta name="viewport" content="width=375, target-densitydpi=device-dpi">');
                };
            } else {
                document.write('<meta name="viewport" content="width=375, user-scalable=no, target-densitydpi=device-dpi">');
                }
        }       
}(navigator.userAgent);