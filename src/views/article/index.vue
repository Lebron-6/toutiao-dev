<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <!-- form表单 -->
        <el-form label-width="47px" size="mini">
          <!-- 单选框 -->
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <!-- el-radio 默认把 label 作为文本和选中之后的 value 值 -->
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核未通过</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 下拉列表 -->
          <el-form-item label="频道">
            <el-select v-model="channelId" placeholder="请选择">
              <el-option
                label="全部"
                :value="null"
              ></el-option>
              <el-option
                v-for="(channel, index) in channels"
                :key="index"
                :label="channel.name"
                :value="channel.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 日期选择 -->
          <el-form-item label="日期">
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <!-- button 按钮的click事件有个默认的参数,当没有指定参数的时候,它会默认传递一个 isTrusted:true -->
            <el-button
              type="primary"
              :disabled="loading"
              @click="onSubmit"
            >筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">根据筛选条件共查询到{{ totalCount }}条结果:</div>
      <div class="text item">
        <!-- 数据列表 -->
        <el-table
          :data="articles"
          size="small"
          stripe
          border
          style="width: 100%"
          class="list-table"
          v-loading="loading"
        >
          <el-table-column
            label="封面"
            width="180"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover.images[0]"
                fit="cover"
                lazy
              >
              </el-image>
              <!-- <img
                v-if="scope.row.cover.images[0]"
                :src="scope.row.cover.images[0]"
                alt=""
                class="article-cover"
              >
              <img
                v-else
                src="./cover-null.jpg"
                alt=""
                class="article-cover"
              > -->
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>
          <el-table-column
            label="状态"
          >
            <template slot-scope="scope">
                <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
              <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
              <el-tag v-else-if="scope.row.status === 1" type="danger">待审核</el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
              <el-tag v-else-if="scope.row.status === 3" type="warning">审核未通过</el-tag>
              <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
            </template>
            <!-- 自定义列模板中获取当前遍历项数据,那么就在 template 上声明 slot-scope="scope" -->
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="onDeleteArticle(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          class="paginat"
          layout="prev, pager, next"
          @current-change="onCurrentChange"
          :total="totalCount"
          :page-size="pageSize"
          :disabled="loading"
          :current-page.sync="page"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '../../api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [],
      // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'danger' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核未通过', type: 'warning' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      totalCount: 0,
      pageSize: 10,
      status: null,
      // 查询文章的的状态
      channels: [],
      // 频道列表
      channelId: null,
      rangeDate: null,
      loading: true,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        console.log(res)
        // this.articles = res.data.data.results
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onSubmit () {
      this.loadArticles()
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      this.$confirm('是否删除此篇文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          // 存在的问题:
          // JavaScript能够准确表示的整数范围在 -2^53 到 2^53 之间(不含两个端点)
          // 超出这个范围,无法精确表示这个值
          console.log(res)
          this.loadArticles(this.page)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除!'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.filter-card {
  margin-bottom: 27px;
}
.list-table {
  margin-bottom: 27px;
}
.paginat {
    float: right;
    margin-bottom: 27px;
}
// .article-cover {
//     width: 100px;
//     background-size: cover;
// }
</style>
