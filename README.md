# vue3-mini-audio

### 介绍

- 可在 PC/H5 页面使用的 mini 音频播放组件
- 场景使用 ：不满足 audio 自带的标签样式
- 主要用到 `timeupdate` `play` `pause` `loadedmetadata` 等进行相关操作

### 安装

```javascript
// 使用yarn
yarn add vue3-mini-audio
// 使用npm
npm i vue3-mini-audio
// 使用pnpm
pnpm i vue3-mini-audio
```

### 引入

> 插件方式

```javascript
import { createApp } from 'vue'

import vue3MiniAudio from 'vue3-mini-audio'
import 'vue3-mini-audio/dist/style.css'

const app = createApp(App)
app.use(vue3MiniAudio)
```

> 组件形式

```javascript
import Vue3MiniAudio from 'vue3-mini-audio'

import 'vue3-mini-audio/dist/style.css'
```

### 基础用法

```html
<template>
  <vue3-mini-audio :url="url" />
</template>

<script setup>
  import { ref } from 'vue'
  let urls = './test.mp3'
  const url = ref(urls)
</script>
```

## API

##### Props

| 参数            | 说明                   | 类型   | 默认值  |
| --------------- | :--------------------- | :----- | :-----: |
| url             | 播放地址 （必填）      | String |    -    |
| coverAudioBg    | 音频背景色             | String | #343536 |
| activeColor     | 播放状态进度条背景色   | String | #1989fa |
| inactiveColor   | 未播放状态进度条背景色 | String |  #fff   |
| coverAudioBtnBg | 播放/暂停按钮背景色    | String | #1989fa |

##### Events

| 事件名 | 说明     |
| ------ | :------- |
| play   | 播放回调 |
| pause  | 暂停回调 |
