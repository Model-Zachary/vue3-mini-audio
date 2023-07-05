<template>
  <vue3-mini-audio
    :url="url"
    :coverAudioBg="coverAudioBg"
    :coverAudioBtnBg="coverAudioBtnBg"
    :inactiveColor="inactiveColor"
    :activeColor="activeColor"
    @play="updataRecordPlay"
    @pause="updataRecordPause"
  />
</template>

<script setup>
import { ref } from 'vue'
let urls = './test.mp3'
const url = ref(urls) // 音频播放地址
const coverAudioBg = ref('red') // 重置音频背景色
const coverAudioBtnBg = ref('#fff') // 重置播放按钮颜色
const activeColor = ref('pink') // 重置播放时进度条颜色
const inactiveColor = ref('#fff') // 重置未播放进度条颜色

function updataRecordPlay() {
  console.log('播放')
}
function updataRecordPause() {
  console.log('暂停播放')
}
</script>