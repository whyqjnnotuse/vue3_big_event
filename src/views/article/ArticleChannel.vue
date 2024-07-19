<script setup>
import { artGetCannelsService, artDelChannelService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelDialog from './components/channelDialog.vue'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetCannelsService()
  channelList.value = res.data.data
  loading.value = false
  // console.log(channelList.value);
}
getChannelList()

const deleteChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannelList()
}
const addChannel = () => {
  // console.log('新增');
  dialog.value.open({})
  // console.log(111);
}
const editChannel = (row) => {
  // console.log('编辑');
  dialog.value.open({ row })
  // console.log(row,$index);
}
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分类</el-button>
    </template>
    <el-table
      v-loading="loading"
      :data="channelList"
      style="width: 100%"
      :cell-style="{ padding: '20px 0' }"
    >
      <el-table-column type="index" label="序号" width="150" />
      <el-table-column prop="cate_name" label="分类名称" width="420" />
      <el-table-column prop="cate_alias" label="分类别称" width="420" />
      <el-table-column label="操作" width="180">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="editChannel(row, $index)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="deleteChannel(row, $index)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <channel-dialog ref="dialog" @success="onSuccess"></channel-dialog>
  </page-container>
</template>
<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>
