###### JS判断设备屏幕方向

> [matchMedia使用说明](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)

```typescript
findMedia =  window.matchMedia("(orientation: portrait)") // 会得到查询出来的结果是否是竖屏 返回一个MediaQueryList对象
/*
{
	matches: false // 查询的结果
	media: "(orientation: portrait)" // 查询的类型
	onchange: null  //监听的函数 可以监听变化
}
*/
const onMatchMediaChange = (findMedia) => {
  if(findMedia.matches){
    //竖屏
    console.log('此时竖屏')
    privateObj.player.isFullscreen() && privateObj.player.exitFullscreen()
  }else{
    //横屏
    console.log('此时横屏')
    privateObj.player.requestFullscreen()
  }
}
// 输出当前屏幕模式
onMatchMediaChange(findMedia);
// 监听屏幕模式变化
findMedia.addListener(onMatchMediaChange)
// 移除监听事件
// findMedia.removeListener(onMatchMediaChange)
```

###### 用JS进行Base64编码、解码

> [参考地址](https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte)
>
> 浏览器支持 window.btoa 

如果您有 UTF8，请使用它（实际上适用于 SVG 源），例如：

```js
btoa(unescape(encodeURIComponent(str)))
```

例子：

```js
 var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(markup)));
 var img = new Image(1, 1); // width, height values are optional params 
 img.src = imgsrc;
```

如果您需要解码该 base64，请使用以下命令：

```js
var str2 = decodeURIComponent(escape(window.atob(b64)));
console.log(str2);
```

例子：

```js
var str = "äöüÄÖÜçéèñ";
var b64 = window.btoa(unescape(encodeURIComponent(str)))
console.log(b64);

var str2 = decodeURIComponent(escape(window.atob(b64)));
console.log(str2);
```

**注意：**如果您需要让它在 mobile-safari 中工作，您可能需要从 base64 数据中删除所有空白...

```js
function b64_to_utf8( str ) {
    str = str.replace(/\s/g, '');    
    return decodeURIComponent(escape(window.atob( str )));
}
```

**一个小巧、漂亮且易于维护的实现：**

```js
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info
*
**/
var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    // public method for encoding
    , encode: function (input)
    {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length)
        {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        } // Whend 

        return output;
    } // End Function encode 

    // public method for decoding
    ,decode: function (input)
    {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length)
        {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64)
            {
                output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64)
            {
                output = output + String.fromCharCode(chr3);
            }

        } // Whend 

        output = Base64._utf8_decode(output);

        return output;
    } // End Function decode 


    // private method for UTF-8 encoding
    ,_utf8_encode: function (string)
    {
        var utftext = "";
        string = string.replace(/\r\n/g, "\n");

        for (var n = 0; n < string.length; n++)
        {
            var c = string.charCodeAt(n);

            if (c < 128)
            {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048))
            {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else
            {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        } // Next n 

        return utftext;
    } // End Function _utf8_encode 

    // private method for UTF-8 decoding
    ,_utf8_decode: function (utftext)
    {
        var string = "";
        var i = 0;
        var c, c1, c2, c3;
        c = c1 = c2 = 0;

        while (i < utftext.length)
        {
            c = utftext.charCodeAt(i);

            if (c < 128)
            {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224))
            {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else
            {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        } // Whend 

        return string;
    } // End Function _utf8_decode 

}
```