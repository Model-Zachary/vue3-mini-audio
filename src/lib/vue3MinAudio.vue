<template>
  <div>
    <div class="audio-player" :style="`background:${coverAudioBg};`">
      <div
        :class="[isPlaying ? 'btn-pause' : 'btn-play', 'pubBtn']"
        :style="`border-color:${coverAudioBg};`"
        @click="togglePlay"
      >
        <i
          :style="
            isPlaying
              ? `border-color: transparent ${coverAudioBtnBg};`
              : `border-color: transparent transparent transparent ${coverAudioBtnBg};`
          "
        />
      </div>
      <slider
        :active-color="activeColor"
        :inactive-color="inactiveColor"
        :min="0"
        :max="1"
        :step="0.01"
        :disabled="!isAudioReady"
        v-model="progress"
        @drag-start="handleDragStart"
        @drag-end="handleDragEnd"
        @change="handleDragEnd"
      >
        <template #button>
          <i class="progress-dot"></i>
        </template>
      </slider>

      <div class="duration-remain">{{ durationRemain }}</div>

      <audio
        preload="auto"
        ref="audioDom"
        :src="url"
        @loadedmetadata="handleAudioLoaded"
        @canplay="isAudioReady = true"
        @timeupdate="syncProgressBar"
        @play="handlePlay"
        @pause="handlePause"
        @ended="handleEnded"
        @error="handleError"
      ></audio>
    </div>
  </div>
</template>
<script setup name="vue3-mini-audio">
import { ref, computed, watch } from 'vue'
import { Slider, showToast } from 'vant'
import 'vant/lib/slider/style'
import 'vant/lib/Toast/style'
//  如果没用 vite-plugin-vue-setup-extend 插件 则需要用defineOptions声明name 否者 引入组件 打印name为获取不到
// defineOptions({
//   name: 'vue3-mini-audio'
// })
const duration = ref(0) // 音频总时长
const progress = ref(0) // 进度条百分比
const isPlaying = ref(false) // 是否播放中
const isAudioReady = ref(false) // 音频是否加载成功
const audioDom = ref(null) // 音频是否加载成功
let props = defineProps({
  /* 音乐链接 */
  url: {
    type: String,
    default: ''
  },
  /* 音频背景色 */
  coverAudioBg: {
    type: String,
    default: ''
  },
  /* 播放按钮颜色 */
  coverAudioBtnBg: {
    type: String,
    default: () => '#1989fa'
  },
  /* 播放时进度条颜色 */
  activeColor: {
    type: String,
    default: ''
  },
  /* 未播放进度条颜色 */
  inactiveColor: {
    type: String,
    default: ''
  }
})

function filterDuration(s) {
  let hour = Math.floor(s / 3600)
  let min = Math.floor((s % 3600) / 60)
  let sec = Math.floor(s % 60)
  hour = hour < 10 ? `0${hour}` : hour
  min = min < 10 ? `0${min}` : min
  sec = sec < 10 ? `0${sec}` : sec
  return `${hour}:${min}:${sec}`
}

const durationRemain = computed(() => {
  if (progress.value > 0 && progress.value < 1) {
    return filterDuration(duration.value * (1 - progress.value))
  }
  return filterDuration(duration.value * (1 - progress.value))
})
watch(
  () => props.url,
  (newVal, oldVal) => {
    if (oldVal) reset()
  }
)

const emit = defineEmits(['pause', 'play'])
/* 方法 */
function handlePlay() {
  isPlaying.value = true
  emit('play')
}

function handlePause() {
  isPlaying.value = false
  emit('pause')
}

function handleEnded() {
  isPlaying.value = false
  progress.value = 0
}

function handleError() {
  showToast({
    message: '播放出错',
    position: 'top'
  })
}
// 拖动
function handleDragStart() {
  pause()
}
// 拖动结束
function handleDragEnd() {
  audioDom.value.currentTime = duration.value * progress.value
  play()
}
// 播放状态切换状态
function togglePlay() {
  if (!isAudioReady.value) return
  isPlaying.value ? pause() : play()
}
// 播放
function play() {
  audioDom.value.play()
}
// 暂停
function pause() {
  audioDom?.value.pause()
}
// 重置
function reset() {
  if (!isAudioReady.value) return
  pause()
  isAudioReady.value = false
  progress.value = 0
  duration.value = 0
}
// 音频加载完后设置音频时长, 并自动播放
function handleAudioLoaded(evt) {
  duration.value = evt.target.duration
}
// 播放时同步进度条
function syncProgressBar(evt) {
  const progressState = evt.target.currentTime / duration.value
  progress.value = progressState > 1 ? 1 : progressState
}
</script>
<style>
.audio-player {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 7.77778rem;
  height: 1.33333rem;
  padding: 0 0.44444rem;
  background: #343536;
  border-radius: 0.66667rem;
}

.audio-player .van-slider {
  width: 8.17778rem;
  border-radius: 0.13333rem;
  margin: 0 0.31111rem 0 0.4rem;
}

.audio-player .progress-dot {
  display: block;
  width: 0.44444rem;
  height: 0.44444rem;
  background: #fff;
  border-radius: 50%;
}

.audio-player .duration-remain {
  line-height: 1.33333rem;
  font-size: 0.53333rem;
  text-align: right;
  color: #fff;
}

.pubBtn {
  position: relative;
  display: block;
  float: left;
  border: 0.26667rem solid #343536;
  color: #343536;
  height: 0;
  width: 0;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
}

.pubBtn i {
  border-style: solid;
  text-indent: -999999px;
  position: absolute;
  transition: all 0.3s;
}

.btn-play i {
  border-color: transparent transparent transparent #23a8f2;
  border-width: 0.26667rem 0 0.26667rem 0.35556rem;
  width: 0;
  top: -0.26667rem;
  left: -0.06667rem;
  height: 0;
}

.btn-pause i {
  border-color: transparent #23a8f2;
  border-width: 0 0.11111rem;
  height: 0.33333rem;
  width: 0.13333rem;
  top: -0.17778rem;
  left: -0.2rem;
}
</style>
