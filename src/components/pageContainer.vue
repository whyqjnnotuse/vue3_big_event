<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<style lang="scss" scoped>
.box-card {
  min-height: 100%;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
