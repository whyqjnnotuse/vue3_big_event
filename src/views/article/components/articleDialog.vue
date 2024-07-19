<script setup>
import { ref } from 'vue'
import channelSelect from './channelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artPublishService,
  artGetDetailServer,
  artEditService
} from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

// 默认数据
const defultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
// 准备数据
const formModel = ref({ defultForm })

// 图片上传逻辑
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  console.log('uploadFile' + uploadFile.raw)
  // 实现图片预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 立即将图片对象存入formModel.value.cover_img，将来用于提交
  formModel.value.cover_img = uploadFile.raw
}
// 传输信息到父组件
const emit = defineEmits(['success'])
const editorRef = ref('')

// 控制抽屉显示
const visibleDrawer = ref(false)
const open = async ({ row }) => {
  visibleDrawer.value = true
  // console.log({row})
  if (row.id) {
    console.log(row.id)
    const res = await artGetDetailServer(row.id)
    formModel.value = res.data.data // 展开
    // 需要将网络地址转换成file对象，存储起来,将来便于提交
    imgUrl.value = baseURL + formModel.value.cover_img
    const file = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
    editorRef.value.setHTML(formModel.value.content)
    console.log('编辑功能')
  } else {
    formModel.value = { ...defultForm }
    imgUrl.value = ''
    editorRef.value.setHTML('')
    console.log('添加功能')
  }
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

// 提交表单信息
const onPublish = async (state) => {
  try {
    // 存入formModel
    formModel.value.state = state
    // 因为需要提交formData，所以需要将formModel.value转换为FormData对象
    const fd = new FormData()
    for (let key in formModel.value) {
      fd.append(key, formModel.value[key])
    }
    // 发请求
    if (formModel.value.id) {
      // 编辑
      await artEditService(fd)
      ElMessage.success('编辑成功')
      visibleDrawer.value = false
      emit('success', 'edit')
    } else {
      // 添加
      await artPublishService(fd)
      ElMessage.success('添加成功')
      visibleDrawer.value = false
      // 通知父组件添加成功
      emit('success', 'add')
    }
  } catch (error) {
    console.error('提交表单时出错:', error)
    ElMessage.error('提交失败，请重试')
  }
}

defineExpose({
  open
})
</script>
<template>
  <!-- 抽屉 -->
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '发布文章'"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入标题" v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <!-- 不能直接在这里在宽度属性 要去组件里面加 或者style-->
        <channel-select
          placeholder="请输入分类"
          v-model="formModel.cate_id"
          style="width: 100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 文件上传 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
