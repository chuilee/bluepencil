# 微信开发

## 用户体验

### iPhone X 兼容底部位置

> 对于 position: fixed 的可交互组件，如果渲染在 iPhone X 的安全区域外，容易误触 Home Indicator，应当把可交互的部分都渲染到安全区域内。
> 建议使用以下 wxss 进行兼容

```scss
padding-bottom: constant(safe-area-inset-bottom);
padding-bottom: env(safe-area-inset-bottom);
```

### video全屏状态下视频没有铺满屏幕

- 给`<video>`写定宽高后，在安卓全屏状态下会导致视频在左上角展开，保持着之前写定的宽高，而没有实现真正全屏。
- 通过CSS实现全屏，只需要在video外部套一个`<div class="videoWrap">`，然后把原本需要的宽高写在videoWrap上，对于`<video>`我们只要给一个{width:100%}，不需要写定高度。这样就不会出现因为`<video>`写定宽高而导致全屏不能真正铺满屏幕。

### 微信小程序使用webview跳h5页面之后，设置屏幕是否横屏

> page.json下设置 `"pageOrientation": "auto"`

```json
{

  "usingComponents": {},

  "navigationBarBackgroundColor": "#000",

  "navigationBarTextStyle": "white",

  "pageOrientation": "auto"

}
```

### page-container组件显示时没有动画效果？

需要添加bindenter事件监听，即使我们在实际业务中无需监听；

```javascript
<page-container 
	show="{{showRanking}}"
	bindenter="onEnter"
	bindclickoverlay="toggleShowRanking"
  \>
```

### 官方组件默认样式修改的对应class

#### swiper

面板指示点：

```scss
.wx-swiper-dots.wx-swiper-dots-horizontal｛

margin：20px //调整位置

｝

.wx-swiper-dot｛｝//指示点未选中样式

.wx-swiper-dot-active｛｝//指示点选中样式
```



#### button

去除边框：

```scss
button::after { border: none; }
```



#### checkbox

```scss
.wx-checkbox-input｛｝//未选中的框

.wx-checkbox-input.wx-checkbox-input-checked｛｝//选中的框

.wx-checkbox-input.wx-checkbox-input-checked::before｛｝//选中的框里的小勾
```



#### radio

```scss
.wx-radio-input｛｝// 未选中

.wx-radio-input.wx-radio-input-checked｛｝//选中

.wx-radio-input.wx-radio-input-checked::before｛｝//选中的小勾
```



#### progress

```scss
.wx-progress-inner-bar｛｝//已选择的进度条
```



#### switch

```scss
.wx-switch-input｛｝//
```



### WXSS下媒体查询不支持rpx单位

```scss
@media screen and (max-height: 750px) {  // 媒体查询不支rpx
  h1 {
    font-size: 36px;  // 样式单位可以支持rpx
  }
}
```



## 开放SDK问题

### 使用sdk进行文档预览转html，添加水印时会出现乱码或者字母丢失的问题？

- [SDK文档](https://cloud.tencent.com/document/product/436/59407)
- [URL安全的Base64编码](https://cloud.tencent.com/developer/article/1026316)

腾讯云提供的规则文档写的[url安全编码文档](https://cloud.tencent.com/document/product/460/32832#.E4.BB.80.E4.B9.88.E6.98.AF-url-.E5.AE.89.E5.85.A8.E7.9A.84-base64-.E7.BC.96.E7.A0.81.EF.BC.9F) 中的第三点是错误的

> ##### 什么是 URL 安全的 BASE64 编码？
>
> 在数据万象的处理操作中，有很多参数需要进行 URL 安全的 BASE64 编码，例如文字水印的文字内容、颜色、字体设置和图片水印的水印图链接。URL 安全的 BASE64 编码具体规则为：
>
> 1. 将普通 BASE64 编码结果中的加号（+）替换成连接号（-）；
> 2. 将编码结果中的正斜线（/）替换成下划线（_）；
> 3. 保留编码结果中末尾的全部等号（=）。**是错误的，应该要去除末尾等号**

具体可查看规则文档[url安全编码文档](https://cloud.tencent.com/document/product/460/32832#.E4.BB.80.E4.B9.88.E6.98.AF-url-.E5.AE.89.E5.85.A8.E7.9A.84-base64-.E7.BC.96.E7.A0.81.EF.BC.9F) 描述如下：

> 采用一种**用于URL的改进Base64**编码，它不在末尾填充'='号，并将标准Base64中的「+」和「/」分别改成了「*」和「-」，这样就免去了在URL编解码和数据库存储时所要作的转换，避免了编码信息长度在此过程中的增加，并统一了数据库、表单等处对象标识符的格式。
>
> URL安全的Base64编码适用于以URL方式传递Base64编码结果的场景。该编码方式的基本过程是先将内容以Base64格式编码为字符串，然后检查该结果字符串，将字符串中的加号`+`换成中划线`-`，并且将斜杠`/`换成下划线`_`。 
>
> 详细编码规范请参考[RFC4648](http://www.ietf.org/rfc/rfc4648.txt)标准中的相关描述。 

## 
