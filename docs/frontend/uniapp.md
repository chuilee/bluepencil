# uniapp开发

## 开发前



## 开发中

#### uni.vibrateShort VS plus.device.vibrate

> 开发uniapp过程中遇到部分安卓机下(oppo, redmi)调用uni.vibrateShort成功，但用户感觉不到振动；

原因是vivbarteShort默认设置是15ms；

解决文案，通过plus.device.vibrate(time),根据实际情况，传入合适的时间，可触发振动效果；

在uni对象下调用的api不能很好实现效果时可能考虑plus来实现；



#### uni-admin（使用uni-id）部署云服务器后提示密码错误

##### **排查过程**

本机截图

![image-20220428152413489](/Users/chuilee/Library/Application Support/typora-user-images/image-20220428152413489.png)

![image-20220428152456522](/Users/chuilee/Library/Application Support/typora-user-images/image-20220428152456522.png)

![image-20220428152537676](/Users/chuilee/Library/Application Support/typora-user-images/image-20220428152537676.png)

![image-20220428152600604](/Users/chuilee/Library/Application Support/typora-user-images/image-20220428152600604.png)

重新登录，正常



#### app跳转上程序

```javascript
openMiniprogram() {
      if (plus.os.name == "iOS") {
        uni.login({
          provider: "weixin",
          success() {
            getServices();
          },
        });
      } else {
        getServices();
      }

      function getServices() {
        plus.share.getServices(
          (res) => {
            var sweixin = null;
            for (let i = 0; i < res.length; i++) {
              const t = res[i];
              if (t.id == "weixin") {
                sweixin = t;
              }
            }

            if (sweixin) {
              sweixin.launchMiniProgram({
                id: "小程序原始id",
                path: `pages 路径`,
                type: 1, // 0 正式版本 1 开发版本 2体验版本 默认值 0
              });
            }
          },
          (res) => console.log(JSON.stringify(res))
        );
      }
    },
```

##### 小程序跳回app

```html
<button class="backapp-btn" open-type="launchApp" app-parameter="{score: {{ score || currentTask.score }}, taskid: {{ taskid }}, pkgid: {{ parentid }}}" binderror="launchAppError" bindlaunchapp="lanchAppSuccess">返回APP</button>
```

## 开发后

### app store应用市场

#### FAQ

##### NSUserTrackingUsageDescription

> ###### **您的** **App** **包含** NSUserTrackingUsageDescription，**这**表示它可能会请求追踪用户。要提交以供审核，请更新**您的** **App** 隐私答复以注明从此 **App** 中收集的数据将用于追踪目的

1. ###### [iOS平台配置应用使用广告标识（IDFA）](https://ask.dcloud.net.cn/article/36107)

2. **更改app隐私下还要设置数据类型需要勾选“用于追踪目的”，提示才会消失，一般把锅丢给广告，说广告商要追踪**