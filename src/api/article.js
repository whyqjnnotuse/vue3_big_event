import request from '@/utils/request'
// 文章：获取文章列表
export const artGetCannelsService = () => request.get('/my/cate/list')

// 文章：删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章：提交文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 文章：获取文章详情
export const artGetDetailServer = (id) =>
  request.get('/my/article/info', {
    params: { id }
  })
// 文章：编辑文章详情
export const artEditService = (data) => request.put('my/article/info', data)
// 文章：更改文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// 管理：获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', {
    params
  })

// 管理：添加文章
export const artPublishService = (data) => request.post('/my/article/add', data)
