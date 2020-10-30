<template>
  <el-dialog title="标签修改" :visible.sync="FormVisible">
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="Tab">
      <el-form-item label="标签名称">
        <el-input v-model="Tab.tabName"></el-input>
      </el-form-item>
      <el-form-item label="标签父Id">
        <el-select v-model="Tab.parentId" placeholder="请选择Id">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input v-model="Tab.tabDescribe"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateTab()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      Tab: {
        tabName: "",
        parentId: "",
        tabDescribe: ""
      },

    }
  },
  methods: {
      updateTab() {
      this.FormVisible = false;
      let data = qs.stringify({
        tab : JSON.stringify(this.Tab)
      });
       //这里tab的值格式已经变成一个正常的JSON字符串
        //格式为:tab: {"tabName":"学霸","parentId":0,"tabDescribe":"11"}
      axios
        .post(url.updateTabById + this.selectedId, data)
        .then(res => {
            if (res.data == "修改成功") {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.getInfo();
            }
            if (res.data == "修改失败") {
              this.$message({
                type: "error",
                message: "修改失败"
              });
            }         
        })
        .catch(err => {
          console.log(err);
        });
    },
  }

}
</script>

<style scoped>
</style>