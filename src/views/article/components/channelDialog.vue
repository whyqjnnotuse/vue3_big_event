<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article'
const formRef = ref()
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = ref({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
})
// 子传父 父组件要重新渲染
const emit = defineEmits(['success'])
const onSumbit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    // 编辑
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
  // 如果有分页就要将isEdit传过去进行判断
  //  emit('success'，isEdit)
}

// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显
const open = ({ row }) => {
  // {row} 就是 row.row
  dialogVisible.value = true
  // console.log(row);
  // 回显数据
  formModel.value = { ...row }
  console.log('测试数据：', row)
  console.log('回显数据', formModel.value)
  console.log('回显完成')
}

// 向外暴露方法
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    :title="formModel.id ? '编辑分类' : '添加分类'"
    v-model="dialogVisible"
    width="500"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 50px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          minlength="1"
          maxlength="10"
          placeholder="请输入分类名称"
          name="cate_name"
        />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          minlength="1"
          maxlength="15"
          placeholder="请输入分类别名"
          name="cate_alias"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSumbit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
