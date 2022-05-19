<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="商品名称:" prop="goodsName">
        <el-input v-model.trim="form.goodsName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格:" prop="price">
        <el-input v-model.trim="form.price" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import  '@/utils/vab'

export default {
  name: "GoodsEdit",

  data(){
    return {
      title:"标题",
      dialogFormVisible:false,
      form:{
        goodsName:"请输入",
        price:"请输入"
      },
      rules:{
        goodsName: [{ required: true, trigger: 'blur', message: '请输入商品名称' }],
      },
    }

  },
  created() {},
  methods:{
    showEdit(row) {
      if (!row) {
        this.title = '添加'
        this.form = Object.assign({}, row)
      } else {
        this.title = '编辑'
       this.$http.post("/goods/rsGoods/getDetail",{id:row.goodsId}).then((res)=>{
            this.form=res.data;
        });
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
      this.$emit('fetch-data')
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let data={};
          if(this.form.goodsId!=null){
            data = this.$http.post("/goods/rsGoods/edit", this.form)
          }else {
            data = this.$http.post("/goods/rsGoods/save", this.form)
          }

          this.$message.success("成功");
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          // this.$emit('fetch-data')
          this.form = this.$options.data().form
          await this.$parent.fetchData();
        } else {
          return false
        }
      })
    },

  }
}
</script>

<style scoped>

</style>
