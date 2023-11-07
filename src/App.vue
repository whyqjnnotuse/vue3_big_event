<script setup>
// 在Vue3 CompositionAPI中
// 1. 获取路由对象 router useRouter
//    const router = useRouter()
// 2. 获取路由参数 route useRoute
//    const route = useRoute()
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCountStore } from '@/stores'
const router = useRouter()
const route = useRoute()

const goList = () => {
  router.push('/list')
  console.log(router, route)
}

const userStore = useUserStore()
const userCount = useCountStore()
</script>

<template>
  <div>
    <hr />
    <hr />
    <router-view></router-view>

    <hr />
    <hr />
    我是app
    <test-demo></test-demo>
    <el-button type="primary" @click="$router.push('/home')">跳首页</el-button>
    <el-button type="info" @click="goList">跳列表</el-button>
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('Bearer aeiogevinvkfoeerggcxe')">
      登录
    </el-button>
    <el-button @click="userStore.removeToken">退出</el-button>
    <hr />
    <div>{{ userCount.count }}</div>
    <el-button @click="userCount.add(2)">加法2</el-button>
  </div>
</template>

<style scoped></style>
