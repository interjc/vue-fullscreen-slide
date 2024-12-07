import { defineStore } from 'pinia'

interface JsonOptions {
  animationType?: string
  videoControls?: {
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
  }
  [key: string]: string | boolean | number | object | undefined
}

export interface Screen {
  bgColor: string
  postImage: string
  postVideo?: string
  bannerImage: string
  title: string
  description: string
  jsonOptions?: JsonOptions
}

export const useScreensStore = defineStore('screens', {
  state: () => ({
    screens: [] as Screen[],
    currentIndex: 0,
  }),

  getters: {
    currentScreen: (state): Screen | null => {
      return state.screens.length > 0 ? state.screens[state.currentIndex] : null
    },
    hasScreens: (state): boolean => state.screens.length > 0,
    screensCount: (state): number => state.screens.length,
  },

  actions: {
    setScreens(screens: Screen[]) {
      this.screens = screens
      this.currentIndex = 0
    },

    nextScreen() {
      if (this.screens.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.screens.length
      }
    },

    // Mock data for development and testing
    initializeMockData() {
      this.screens = [
        {
          bgColor: 'bg-gradient-to-br from-gray-900 to-gray-600',
          postImage: '/slides/1-post.jpg',
          postVideo: '/slides/1.mp4',
          bannerImage: '/slides/1-banner.jpg',
          title: 'Welcome to Our Platform',
          description: 'Experience the future of digital presentation.',
        },
        {
          bgColor: 'bg-gradient-to-br from-red-800 to-red-500',
          postImage: '/slides/2-post.jpg',
          postVideo: '/slides/2.mp4',
          bannerImage: '/slides/2-banner.jpg',
          title: 'Innovation at Its Best',
          description: 'Discover new possibilities with our cutting-edge solutions.',
        },
        {
          bgColor: 'bg-gradient-to-br from-yellow-600 to-yellow-400',
          postImage: '/slides/3-post.jpg',
          postVideo: '/slides/3.mp4',
          bannerImage: '/slides/3-banner.jpg',
          title: 'Seamless Integration',
          description: 'Connect and collaborate like never before.',
        },
        {
          bgColor: 'bg-gradient-to-br from-blue-800 to-blue-500',
          postImage: '/slides/4-post.jpg',
          postVideo: '/slides/4.mp4',
          bannerImage: '/slides/4-banner.jpg',
          title: 'Seamless Integration',
          description: 'Connect and collaborate like never before.',
        },
        {
          bgColor: 'bg-gradient-to-br from-green-700 to-green-400',
          postImage: '/slides/5-post.jpg',
          postVideo: '/slides/5.mp4',
          bannerImage: '/slides/5-banner.jpg',
          title: 'Seamless Integration',
          description: 'Connect and collaborate like never before.',
        },
        {
          bgColor: 'bg-gradient-to-br from-pink-600 to-pink-400',
          postImage: '/slides/6-post.jpg',
          postVideo: '/slides/6.mp4',
          bannerImage: '/slides/6-banner.jpg',
          title: 'Seamless Integration',
          description: 'Connect and collaborate like never before.',
        },
      ]
    },
  },
})
