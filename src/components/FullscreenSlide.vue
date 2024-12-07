<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScreensStore } from '@/stores/screens'

const store = useScreensStore()
const timer = ref<number | null>(null)

// 处理全屏
const requestFullscreen = () => {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if ((elem as any).webkitRequestFullscreen) {
    ; (elem as any).webkitRequestFullscreen()
  } else if ((elem as any).mozRequestFullScreen) {
    ; (elem as any).mozRequestFullScreen()
  } else if ((elem as any).msRequestFullscreen) {
    ; (elem as any).msRequestFullscreen()
  }
}

onMounted(() => {
  store.initializeMockData()
  startSlideshow()

  // 监听触摸事件，双击进入全屏
  let lastTap = 0
  document.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime()
    const tapLength = currentTime - lastTap
    if (tapLength < 500 && tapLength > 0) {
      requestFullscreen()
    }
    lastTap = currentTime
  })
})

onUnmounted(() => {
  stopSlideshow()
})

const startSlideshow = () => {
  timer.value = window.setInterval(() => {
    store.nextScreen()
  }, 60000) // 60 seconds interval
}

const stopSlideshow = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const handleDoubleClick = () => {
  // Reset timer when manually switching slides
  if (timer.value) {
    clearInterval(timer.value)
  }
  store.nextScreen()
  startSlideshow()
  // 双击同时也进入全屏
  requestFullscreen()
}
</script>

<template>
  <div class="absolute inset-0" :class="store.currentScreen?.bgColor || 'bg-gray-100'">
    <div class="min-h-screen w-screen overflow-auto">
      <div v-if="store.currentScreen" class="w-[1024px] h-[768px] mx-auto relative flex select-none"
        @dblclick="handleDoubleClick">
        <!-- Left side: Post Image (1/2 width) -->
        <div class="w-1/2 h-full flex items-center justify-center p-4">
          <div class="relative h-full flex items-center justify-center">
            <!-- Post Image with 521:752 aspect ratio -->
            <div class="relative h-[700px] aspect-[521/752] overflow-hidden rounded-lg">
              <img v-if="store.currentScreen.postImage" :src="store.currentScreen.postImage"
                class="w-full h-full object-cover" alt="Post Image" />
              <div v-else class="w-full h-full bg-gray-300"></div>
            </div>
          </div>
        </div>

        <!-- Right side: Banner and Text (1/2 width) -->
        <div class="w-1/2 h-full flex flex-col p-4 pt-8">
          <!-- Banner Image with 989:707 aspect ratio -->
          <div class="relative w-full h-1/2 mb-4">
            <div class="w-full aspect-[989/707] overflow-hidden rounded-lg">
              <img v-if="store.currentScreen.bannerImage" :src="store.currentScreen.bannerImage"
                class="w-full h-full object-cover" alt="Banner Image" />
              <div v-else class="w-full h-full bg-gray-300"></div>
            </div>
          </div>

          <!-- QR Codes Section -->
          <div class="w-full h-[300px] flex justify-center items-center">
            <div class="w-full flex justify-center gap-4 px-16">
              <img src="/qr-ins.png" class="w-48 h-48" alt="QR Code 1" />
              <img src="/qr-x.png" class="w-48 h-48" alt="QR Code 2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Fallback when no screens available -->
      <div v-else class="w-[1024px] h-[768px] mx-auto flex items-center justify-center">
        <div class="text-2xl text-gray-600">No content available</div>
      </div>
    </div>
  </div>
</template>

<style>
/* Ensure proper scrolling behavior and full background coverage */
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  position: relative;
}

#app {
  position: absolute;
  inset: 0;
}

/* 全屏模式下的样式 */
:fullscreen {
  background: inherit;
}

:-webkit-full-screen {
  background: inherit;
}

:-moz-full-screen {
  background: inherit;
}

:-ms-fullscreen {
  background: inherit;
}
</style>
