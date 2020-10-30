<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2. 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="getUserList"
          class="inputSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUserList"
          ></el-button>
        </el-input>
        <el-button type="success" class="but" @click="addDialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table :data="userlist" style="width: 100%" border stripe>
      <el-table-column type="index" label="#" width="100"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <!-- <template slot-scope="scope">
          {{scope.rwo.create_time | fmtdate}}
        </template> -->
      </el-table-column>
      <!-- <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          {{ scope.row }}
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="userStateChanged(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="170px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditDialog(scope.row.id)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="removeUserById(scope.row.id)"
          ></el-button>
          <!-- 成功按钮 -->
          <!-- <el-tooltip
            effect="dark"
            content="成功"
            placement="top"
            :enterable="false"
          >
            <el-button
              size="mini"
              plain
              type="success"
              icon="el-icon-check"
              circle
            ></el-button>
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 4. 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageCurrent"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户的对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区-->
      <el-form
        :model="addFrom"
        :rules="addFromRules"
        ref="addFromRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFrom.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addFrom.mobile"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addFrom.address"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    //验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      //返回一个错误提示
      cb(new Error('请输入合法的邮箱'))
    }
    //验证手机号码的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      //返回一个错误提示
      cb(new Error('请输入合法的手机号码'))
    }
    return {
      //获取用户列表的参数对象
      queryInfo: {
        username: '',
        email: '',
        mobile: '',
        address: '',
        create_time: '',
        mg_state: '',
        //搜索
        query: '',
         //当前的页数
        pageCurrent: 1,
        //当前每页显示多少条数据
        pageSize: 5,
        //total: 0
      },
      //表格绑定的数据
      tableData: [
        {
          create_time: '2016-05-02',
          username: '王小虎',
          email: '111@qq.com',
          mobile: '13788887777',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          create_time: '2016-05-02',
          username: '王小虎',
          email: '111@qq.com',
          mobile: '13788887777',
          address: '上海市普陀区金沙江路 1517 弄',
        },
      ],
      userlist: [],
      total: 0,
      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      //添加用户的表单数据
      // var params = qs.stringify({
      //           key1: value1,
      //           key2: value2,
      //           key3: value3,
      //        })

      addFrom: {
        username: '凄凄切切去群',
        password: '54987941651',
        email: '111321@qq.com',
        address:'大地',
        mobile: '13799998888',
      },
      //添加表单的验证规则对象
      addFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '密码的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        // mobile: [
        //   { required: true, message: '请输入手机', trigger: 'blur' },
        //   { validator: checkMobile, trigger: 'blur' },
        // ],
      },
      //控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //查询到的用户信息对象
      editForm: {},
      //修改表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
        adresaddress: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // let data = qs.stringify({
      //   q : JSON.stringify(this.queryInfo)
      // })
      const { data: res } = await this.$http.get('/PageUser', {
        params: this.queryInfo,
      })
      console.log(res)
      if (res.code == 1) {
        return this.$message.error('获取用户列表失败！')
        console.log(res)
      }
      this.userlist = res.data.list
      this.total=res.data.totalCount
      console.log(res)
    },
    // pageChange(page){
    //   this.page.page=page
    //   this.loadData()
    // },
    // async loadData(){
    //    const {data:res} = await this.$http.get('PageUser',{params: this.page})
    //   console.log(res);
    //   if(res.code == 1){
    //     return this.$message.error('获取分页列表失败!')
    //     console.log(res);
    //   }
    //   this.userlist= res.data
    //   this.total=res.total
    //   console.log(res);
    // },
    // handleSizeChange: function(size) {
		// 		this.pageSize = size;
		// 		console.log(this.pageSize); //每页下拉显示数据
		// 		this.searchByPage(this.pageCurrent, this.pageSize);
		// 	},
		// 	handleCurrentChange: function(currentPage) {
		// 		this.pageCurrent = pageCurrent;
		// 		console.log(this.pageCurrent); //点击第几页
		// 		this.searchByPage(this.pageCurrent, this.pageSize);

		// 	},
		// 	searchByPage(currentPage, pageSize) {
		// 		var demo = new URLSearchParams()
		// 		demo.append("page", pageCurrent);
		// 		demo.append("size", pageSize)
		// 		axios.post('PageUser', demo).then((response) => {
		// 			if (response.data.code == 0) {
		// 				//this.total=response.data.data.totalElements//数据库中商品总条数
		// 				console.log("分页查询的数据：", response.data.data.content)
		// 				this.userlist = response.data.data.content
		// 			} else {
		// 				console.log("查询失败原因：", response.data.message)
		// 			}
		// 		}).catch((error) => {
		// 			console.log("查询失败的原因：", error)
		// 		})

		// 	},
    // 分页功能实现
    // async getUserPage(){
    //   const {data:res} = await this.$http.get('/PageUser',{params: this.queryInfo})
    //   console.log(res);
    //   if(res.code == 1){
    //     return this.$message.error('获取分页列表失败!')
    //     console.log(res);
    //   }
    //   this.userlist= res.data
    //   this.total=res.total
    //   console.log(res);
    // },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pageCurrent = newPage
      this.getUserList()
    },
    //监听添加用户对话框的关闭事件 
    addDialogClosed() {
      this.$refs.addFromRef.resetFields()
    },
    //点击按钮，添加新用户
    addUser() {
      this.$refs.addFromRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        //可以发起添加用户网络请求
        // let data = qs.stringify({
        // a : JSON.stringify(this.addFrom)
        // })
        //var qs = require('qs'); 
        //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        //let { username,password } = this;

        const { data: res } = await this.$http.post('/addUser',this.addFrom)
        console.log(this.addFrom);
        console.log(res);
        // if (res.code == 1) {
        //   this.$message.error('添加用户失败！')
        //   console.log(res);
        // }
        // this.$message.success('添加用户成功！')
        //隐藏添加用户的对话框
        this.addDialogVisible = false
        //重新获取用户列表数据
        this.getUserList()
        
      })
    },
    //展示编辑用户的对话框
    async showEditDialog(id) {
      //console.log(id);
      // const { data: res } = await this.$http.get('' + id)
      // if (res.code == 1) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      // this.editForm = res.data
      this.editDialogVisible = true
    },
    //监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    //修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        //console.log(valid);
        //发起修改用户信息的数据请求
        const { data: res } = await this.$http.put('/upDate' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        })
        if (res.code == 1) {
          return this.$message.error('更新用户信息失败！')
        }
      })
      //关闭对话框
      this.editDialogVisible = false
      //刷新数据列表
      this.getUserList()
      //提示修改成功
      this.$message.success('更新用户信息成功！')
    },
    //根据id删除对应的用户信息
    async removeUserById(id){
      //弹框询问是否删除数据
      const confirmResult= await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)  
        //如果用户确认了删除，则返回值为字符串 confirm
        //如果用户取消了删除，则返回值为字符串 cancel
        //console.log(confirmResult);
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除！')
        }
        const {data:res} = await this.$http.delete('/delete' + id)
        if (res.code == 1) {
          return this.$message.error('删除用户失败！')
        }
        this.$message.success('删除用户成功！')
        this.getUserList()

    }
  },
}
</script>

<style lang="less" scoped>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
.but {
  margin-left: 30px;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 20px;
}
</style>