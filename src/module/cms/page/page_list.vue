<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId"
        ></el-option>
      </el-select>页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link
        class="mui-tab-item"
        :to="{path:'/cms/page/add/',query:{
  page: this.params.page,
  siteId: this.params.siteId}}"
      >
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>​
    </el-form>
    <el-button type="primary" v-on:click="query" size="small">查询</el-button>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total"
      :current-page="this.params.page"
      style="float:right;"
    ></el-pagination>
  </div>
</template>
​
<script>
import * as cmsApi from "../api/cms";
export default {
  data() {
    return {
      siteList: [], //站点列表
      list: [],
      total: 50,
      params: {
        siteId: "",
        pageAliase: "",
        page: 1, //页码
        size: 2 //每页显示个数
      },
      editPageId: ""
    };
  },

  //钩子函数 dom元素渲染完成后调用
  mounted() {
    //默认查询页面
    this.query();
    //初始化站点列表
    this.siteList = [
      {
        siteId: "5a751fab6abb5044e0d19ea1",
        siteName: "门户主站"
      },
      {
        siteId: "102",
        siteName: "测试站"
      }
    ];
  },

  created() {
    //从路由上获取参数  数据回显
    this.params.page = Number.parseInt(this.$route.query.page || 1);
    this.params.siteId = this.$route.query.siteId || "";
    this.params.pageAliase = this.$route.query.pageAliase || "";
  },

  methods: {
    //分页查询
    changePage: function() {
      this.params.page = page;
      this.query();
    },

    //查询
    query: function() {
      cmsApi
        .page_list(this.params.page, this.params.size, this.params)
        .then(res => {
          console.log(res);
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;
        });
    },

    //修改  this.$router.push()传参,query根据路由路径,params根据路由name属性值
    edit: function(pageId) {
      this.$router.push({
        path: "/cms/page/edit/" + pageId,
        query: {
          page: this.params.page,
          siteId: this.params.siteId
        }
      });
    }
  }
};
</script>