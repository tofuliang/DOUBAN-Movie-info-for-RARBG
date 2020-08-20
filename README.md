# 注意
* ~~现在调用豆瓣接口需要带上API key,建议自己找一个,然后在设置菜单填入.~~

* ~~APIKey相关消息参见[这里](https://www.v2ex.com/t/563642)~~

* 首页上方`推荐项`的豆瓣信息通过特殊方法实现,如果RARBG提示IP异常,请在关闭此功能至IP正常为止.

* 新版使用了网页手机版的数据源，数据结构跟完整度跟旧API的都不一样，升级到0.6.0后需要清除脚本缓存（点击脚本名进去编辑后，切换到存储页，全选后替换为`{}`,然后点击`保存`即可）。

# 功能

在 [RARBG](https://rarbg.to) 的[电影列表页](https://rarbg.to/torrents.php?category=movies)中,存在 IMDB 信息时

* 为该影片添加豆瓣按钮并显示其在豆瓣的信息.
* 将 IMDB 评分高于6.0的高亮标出,将近3年的影片年份高亮标出.
* 当遇到想看的电影,但是没有高画质版本时,先收藏此电影,待更新高质量版本时根据收藏提示按需下载.

妈妈再也不用担心找不到最近的好片了!


![效果](https://github.com/tofuliang/DOUBAN-Movie-info-for-RARBG/raw/master/demo.png)

# 补充说明

豆瓣的图片服务器做了防盗链了,安装 [Referer Control](https://chrome.google.com/webstore/detail/referer-control/hnkcfpcejkafcihlgbojoidoihckciin) 扩展,并按照下图设置即可解决(重点已用红框标出).

Web Store 打不开的可以下载 [这个从Web Store抠下来的crx](https://github.com/tofuliang/DOUBAN-Movie-info-for-RARBG/raw/master/refererControl.crx), 并手动安装

![设置说明](https://github.com/tofuliang/DOUBAN-Movie-info-for-RARBG/raw/master/refererControl.png)
