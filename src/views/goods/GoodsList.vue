<template>
  <div class="table-container">
    <el-row  :gutter="50">
      <el-col :span="32" style="border:1px blue">
        <el-form
            ref="form"
            :model="queryForm"
            :inline="true"
            @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
                @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" style="border:1px red">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
        <!--        <el-button type="primary" @click="testMessage">baseMessage</el-button>-->
        <!--        <el-button type="primary" @click="testALert">baseAlert</el-button>-->
        <!--        <el-button type="primary" @click="testConfirm">baseConfirm</el-button>-->
        <!--        <el-button type="primary" @click="testNotify">baseNotify</el-button>-->
      </el-col>

    </el-row>

    <el-table
        ref="tableSort"
        v-loading="listLoading"
        :data="list"
        :element-loading-text="elementLoadingText"
        :height="height"
        @selection-change="setSelectRows"
        @sort-change="tableSortChange"
    >
      <el-table-column
          show-overflow-tooltip
          type="selection"
          width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="goodsName"
          label="商品名"
      >
        <template slot-scope="scope">
          <div class="blue-font-color" @click="handleDetail(scope.row)">{{ scope.row.goodsName }}</div>
        </template>
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          label="商品价格"
          prop="price"
      ></el-table-column>
<!--      <el-table-column show-overflow-tooltip label="头像">-->
<!--        <template #default="{ row }">-->
<!--          <el-image-->
<!--              v-if="imgShow"-->
<!--              :preview-src-list="imageList"-->
<!--              :src="row.img"-->
<!--          ></el-image>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          show-overflow-tooltip-->
<!--          label="点击量"-->
<!--          prop="pageViews"-->
<!--          sortable-->
<!--      ></el-table-column>-->
<!--      <el-table-column show-overflow-tooltip label="状态">-->
<!--        <template #default="{ row }">-->
<!--          <el-tooltip-->
<!--              :content="row.status"-->
<!--              class="item"-->
<!--              effect="dark"-->
<!--              placement="top-start"-->
<!--          >-->
<!--            <el-tag :type="row.status | statusFilter">-->
<!--              {{ row.status }}-->
<!--            </el-tag>-->
<!--          </el-tooltip>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          show-overflow-tooltip-->
<!--          label="时间"-->
<!--          prop="datetime"-->
<!--          width="200"-->
<!--      ></el-table-column>-->
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :background="background"
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    ></el-pagination>
<!--    <G-edit ref="edit"></table-edit>-->
    <goods-edit ref="edit"  :fatherMethod="fetchData"></goods-edit>
<!--    <goods-detail ref="detail" :fatherMethod="fetchData"></goods-detail>-->
  </div>
</template>

<script>
import Vab from '@/utils/vab'
// import GoodsDetail from "./components/GoodsDetail";
import GoodsEdit from "./components/GoodsEdit";
import {MessageBox} from "element-ui";
// import GoodsDetail from "@/views/goods/components/GoodsDetail";

export default {
  name: 'Users',
  components: {
    GoodsEdit
  },
  // components: {
  //   vabQueryForm ,
  // },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        title: '',
      },
    }
  },
  computed: {
    height() {
      return this.$baseTableHeight
    },
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {

    tableSortChange() {
      const imageList = []
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd() {
      this.$refs.edit.showEdit()
    },

    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    },
    handleDetail(row) {
      this.$router.push({name:"goodsDetail",query:{goodsId:row.goodsId}});
    },
    async doDelete(row){
      let id=row.goodsId;
      const {data:res}=await this.$http.post("/goods/rsGoods/delete",{"id":id})
      return res;
    },
    $baseConfirm (content, title, callback1, callback2) {
      MessageBox.confirm(content, title || '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
      })
          .then(() => {
            if (callback1) {
              callback1()
            }
          })
          .catch(() => {
            if (callback2) {
              callback2()
            }
          })
    },
    handleDelete(row) {
      if (row.goodsId) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          console.log("进来1")
          const { msg } =  await this.doDelete(row)
          await this.fetchData();
        },async()=>{

          console.log("进来4")
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join()
          this.$baseConfirm('你确定要删除选中项吗', null, async () => {
            console.log("进来2")
            const { msg } = await this.doDelete(row)
            this.$baseMessage(msg, 'success')
            await this.fetchData()
          })
        } else {
          this.$baseMessage('未选中任何行', 'error')
          return false
        }
      }
    },

    async fetchData() {
      this.listLoading = true
      const {data:res}=await this.$http.post("/goods/rsGoods/getAll")
      console.log("创建时候的数据")
      console.log(res)
      this.list = res
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.fetchData()
    },
    handleQuery() {
      this.queryForm.pageNo = 1
      this.fetchData()
    },

    data(){
      return {
        pageSize: 10,
        pageNo: 1,
        row:2,
        data:[{
          goodsId:1,
          goodsName:"商品名称",
          price:10
        },
          {
            goodsId:2,
            goodsName:"商品名称2",
            price:99
          }]
      }
    },
    testConfirm() {
      this.$baseConfirm(
          '你确定要执行该操作?',
          null,
          () => {
            /* 可以写回调; */
          },
          () => {
            /* 可以写回调; */
          }
      )
    },
    // testNotify() {
    //   this.$baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
    // },
  },
}
</script>

<style scoped>

</style>
