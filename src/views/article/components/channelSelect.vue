<script setup>
import { artGetCannelsService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    // cid:{
    type: [Number, String]
  }
  // width:{
  //   type:String
  // }
})
const emit = defineEmits(['update:modelValue'])
// const emit = defineEmits(['update:cid'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetCannelsService()
  channelList.value = res.data.data
  console.log(channelList.value)
}
getChannelList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- <el-select 
    :modelValue="cid"
    @update:modelValue="emit('update:cid',$event)"
  > -->
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :value="channel.id"
      :label="channel.cate_name"
    ></el-option>
  </el-select>
</template>
