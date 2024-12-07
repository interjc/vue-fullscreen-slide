<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScreensStore } from '@/stores/screens'

const store = useScreensStore()
const timer = ref<number | null>(null)

onMounted(() => {
  store.initializeMockData()
  startSlideshow()
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
            <div class="w-full flex justify-between px-16">
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
</style>
