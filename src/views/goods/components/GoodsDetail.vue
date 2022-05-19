<template scope="info">

  <div id="goodsDetail">

<el-button @click="goBack" style=" float:left;margin: 20px 100px ;background: #b0d4b0">返回</el-button>

      <el-form class="goodDetailBox">
        <div id="head" style="padding:20px;margin: 50px 0px;border-bottom: 1px #b0d4b0 dashed"><h1>商品详情</h1></div>
        <el-form-item label="商 品 名 称:">
              <span slot="default" style="float: left">{{ goods.goodsName }}</span>
        </el-form-item
        ><el-form-item label="商 品 价 格:">
        <span slot="default" style="float: left">￥{{ goods.price }}</span>
      </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: "GoodsDetail",
  data() {
    return {
      goods: {
        goodsName: "",
        price: ""
      }
    }
  },
  created() {
    let id=this.$route.query.goodsId;
    this.showDetail(id);
  },
  methods: {
    showDetail(id) {
      console.log("好的到详情页了")
      this.$http.post("/goods/rsGoods/getDetail", {id: id}).then((res) => {
        this.goods = res.data;
      });
    },
    close() {
      this.$emit('fetch-data')
    },
    goBack() {
      console.log("返回返回呀")
      this.$router.go(-1)
    }
  },

}
</script>

<style scoped>
#goodsDetail{
  background-color: #fff;
  width: 100%;
  height: 900px;
}
.goodDetailBox{
  padding:0px 100px;

}

ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
