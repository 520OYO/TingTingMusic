# 听听音乐

## 简介
本应用为**本地音乐播放器**，支持通过 WebDAV PROPFIND 从云端歌单播放音乐。无任何广告、推送或统计功能，仅手机端可用（iOS/Mac 不支持）。

## 属性
- 应用：听听音乐
- 版本：v2.12 / versionCode 14
- 包名：com.yuanbao.music.x7k2m9
- 系统适配：Android 5.0+
- 目标 SDK：29
- 大小：约 418 KB
- 平台：Android

## 技术栈与源码
- 主体：Java / XML
- 构建：aapt2+ECJ+D8+R8+zipalign+apksigner
- 唯一第三方依赖：OkHttp 3.14.9+Okio 1.17.5

## 功能
### 本地
- 通过 MediaStore 扫描本地音乐库
- 四档循环（不循环 · 单曲 · 播放列表 · 随机）
- 手动/系统导航

### 云端
- 支持导入远方 WebDAV 歌单（PROPFIND）
- 支持云拉流播放
- 云端歌单仅内存中

### 播放控制
- 播放/暂停/切换
- 定时渐弱（1/2/3/4 小时）
- 横幅与通知栏独立显示

### 外部指令 / AI 控制（13 个工具）
应用提供广播 Action：`com.yuanbao.music.x7k2m9.CMD`
指令入口组件：`com.yuanbao.music.x7k2m9/.CmdReceiver`
命令列表：
- 音频控制：start/stop/toggle/pause/skip/fwd/bwd
- 位置控制：index/set
- 定时：timer/stop_timer/set_mode
- 窗口：show UI/backend switch
- 模式：toggle repeat/performance
- 切换标签：tab_local/tab_cloud
- 扫描/更新：scan_local/fetch_cloud/glyphs

## 纯净承诺
仅 4 项权限：网络、存储、前台通知、悬浮窗
- 无广告 / 无推送 / 无统计 / 无账号上传

## 功能建议 & 联系方式

如果以后有想加的功能，欢迎通过 Issue 或提 PR 参与贡献，或者直接联系作者：

- GitHub：@5200YO
- 电子邮箱：s6ijs84a@hotmail.com

> 💬 关于邮件：我不会常看电子邮箱或账号哈，有事等我有空时再看。想做的事可以先发邮件写出来，因为内容与精力有限，我会按实际能做的来逐步投入；一时推不了也别急，有机会我会再起来用回报。文档里也会同步反馈参与方式哦~

## 开源许可
- MIT 协议
- 仓库内保留了 MIT LICENSE 声明

## 说明目录
- README.md ——本文档
- LICENSE —— MIT 协议文本
- my_music.js —— AI 工具集合
- 听听音乐-v2.12-源码.zip —— 完整源码
- TingTingMusic-v2.12.apk —— 安装包下载页面

## 安装与覆盖升级
- 从 Release 获取安装包
- 覆盖升级保留页内本地文件与缓存

## 已知边界
- 云端歌单仅内存，退出即清空
- FLAC 拉流存在播放延迟
- 部分 ROM 控制中心样式不同
- 系统 emoji 缺字可能影响符号显示