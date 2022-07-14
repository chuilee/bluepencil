## filter介绍

css3 Filter（滤镜）属性提供了提供模糊和改变元素颜色的功能。CSS3 Fitler 常用于调整图像的渲染、背景或边框显示效果。
主要效果介绍：

1. - blur(px) 模糊，默认0px，值越大越模糊 (ios下好像最大支持到100px)
   - brightness(%) 更亮或更暗，如果值是0%(全黑),值是100%(无变化),>100%(更亮)
   - contrast(%) 对比度，值是0%(全黑),值是100%(无不变),>100%(更低的对比)
   - grayscale(%) 灰度，值为100%(转为灰度图像)，值为0%(无变化)，值在0%到100%之间
   - opacity(%) 透明度，值为0%(完全透明)，值为100%(无变化),与opacity属性类似
   - sepia(%) 褐色，取值0%-100%
   - invert(%) 反转颜色，取值0%-100%
   - drop-shadow(h-shadow v-shadow blur spread color) 设置阴影，该函数与box-shadow属性很相似，不同之处在于，通过滤镜一些浏览器为了更好的性能会提供硬件加速

## 实现单行超出文本显示省略号在左侧

1、通过js对文本内容进行反转

```javascript
function(str) {
	return str.split("").reverse().join("")
}
```

2、再次通过css 把文本反转过来

```css
.reverse-text {
	direction: rtl;
  unicode-bidi: bidi-override;
}
.ellipsis {
	display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
```

