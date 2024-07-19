<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelSelect from '@/views/article/components/channelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format.js'
import articleDialog from './components/articleDialog.vue'
const loading = ref(false)

const articleEditRef = ref()
// 添加
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑
const editManage = (row, $index) => {
  articleEditRef.value.open({ row })
  console.log('编辑管理')
  console.log(row, $index)
}

// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

// 重置
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

// 删除
const deleteManage = (row, $index) => {
  console.log('删除管理')
  console.log(row, $index)
}

// 添加或编辑的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  // 如果是编辑，就留在当前页
  getArticleList()
}
// 处理分页逻辑
const handleSizeChange = (size) => {
  // console.log('每页条数变化了' + size)
  // 只要每页条数变化了，访问的本页面就无意义了，要回到第一页
  params.value.pagenum = 1
  params.value.pagesize = size
  // 基于当前的最新页和码数更新
  getArticleList()
}
const handleCurrentChange = (page) => {
  // console.log('页码变化了' + page)
  // 基于最新的当前页渲染数据
  params.value.pagenum = page
  getArticleList()
}
// 文章列表
const articleList = ref([])
// 总条数
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 获取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <!-- inline 在一行显示 -->
      <el-form-item label="文章分类">
        <!-- vue2 => v-model  :value 和 @input 的简写 -->
        <!-- vue2 => v-model  :modelvalue 和 @update:modelValue 的简写 -->
        <!-- vue2 => v-model:cid  :cid 和 @update:cid 的简写 -->
        <channel-select v-model="params.cate_id"></channel-select>
        <!-- <channel-select v-model:cid="params.cate_id"></channel-select> -->
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table
      :data="articleList"
      :cell-style="{ padding: '20px 0' }"
      v-loading="loading"
    >
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="editManage(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="deleteManage(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[1, 2, 5, 10]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 25px; justify-content: flex-end"
    />

    <article-dialog ref="articleEditRef" @success="onSuccess"></article-dialog>
  </page-container>
</template>
<style lang="scss" scoped></style>
