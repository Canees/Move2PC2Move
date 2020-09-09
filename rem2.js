(function (doc, win) {
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const docEl = doc.documentElement;
    const metaEl = doc.createElement('meta');
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    const isAndroid = navigator.userAgent.includes('Android') || navigator.userAgent.includes('Linux'); // g
    const recalc = function () {
        let width = docEl.clientWidth;
        let dpr;        
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
        dpr = window.top === window.self ? dpr : 1; // 被iframe引用时，禁止缩放
        const scale = 1 / dpr;
        docEl.dataset.dpr = dpr;
        metaEl.name = 'viewport';
        metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
        docEl.getElementsByTagName('head')[0].appendChild(metaEl);
        console.log(1, width, dpr)

        // 增加判断PC/and/ios
        if (isAndroid || isIOS) {
            if (width / dpr > 750) width = width * dpr
            docEl.style.fontSize = (100 * (width / 750)) * 2 + 'px';
        } else {
            if (width / dpr > 1920) width = width * dpr
            docEl.style.fontSize = (100 * (width / 1920)) + 'px';
        }
    };
    recalc()
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    console.log("已自适应")
})(document, window);
