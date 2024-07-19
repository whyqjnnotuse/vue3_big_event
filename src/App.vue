<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
// 在Vue3 CompositionAPI中
// 1. 获取路由对象 router useRouter
//    const router = useRouter()
// 2. 获取路由参数 route useRoute
//    const route = useRoute()
// import { useRouter, useRoute } from 'vue-router'
// import { useUserStore, useCountStore } from '@/stores'
// const router = useRouter()
// const route = useRoute()

// const goList = () => {
//   router.push('/list')
//   console.log(router, route)
// }

// const userStore = useUserStore()
// const userCount = useCountStore()
</script>

<template>
  <div class="box">
    <el-config-provider :locale="zh">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped>
.box {
  overflow: hidden;
}
</style>
