<template>
  <div>
    <!-- 面包屑-->
    <el-breadcrumb class="">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box_card">
      <!-- 搜索 -->
      <el-row>
        <el-col>
          <el-input
            placeholder="请输入内容"
            class="input_select"
            v-model="datainfo.query"
            clearable
            @clear="getAdminList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getAdminList"
            ></el-button>
          </el-input>
          <el-button type="success" @click="addDialogVisible = true"
            >添加管理员</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="adminList" border stripe style="width: 100%">
        <el-table-column type="index" label="#" align="center" width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="email" align="center" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" width="130">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          align="center"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          width="120"
        >
          <!-- <template slot-scope="scope">
          {{scope.rwo.create_time | fmtdate}}
        </template> -->
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态" lign="center">
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
        </el-table-column>
        <el-table-column label="操作" align="center">
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
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配"
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
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="datainfo.pageCurrent"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="datainfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加管理员的对话框-->
      <el-dialog
        title="添加管理员"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="addAdminFrom"
          :rules="addAdminFromRules"
          ref="addAdminFromRef"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addAdminFrom.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addAdminFrom.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addAdminFrom.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addAdminFrom.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAdmin">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
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
      datainfo: {
        // username: '',
        // email: '',
        // mobile: '',
        // role_name: '',
        // create_time: '',
        // mg_state: '',
        // //搜索
        // query: '',
        // //当前的页数
        // pageCurrent: 1,
        // //当前每页显示多少条数据
        // pagesize: 5,
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
      },
      //表格绑定的数据
      tableData: [
        {
          create_time: '2016-05-02',
          username: '王小虎',
          email: '111@qq.com',
          role_name: '超级管理员',
          mobile: '13788887777',
        },
        {
          create_time: '2016-05-04',
          username: '王小虎',
          email: '111@qq.com',
          role_name: '普通管理员',
          mobile: '13788887777',
        },
      ],
      adminList: [],
      total: 0,
      //控制添加管理员对话框的显示与隐藏
      addDialogVisible: false,
      //添加管理员的表单数据
      addAdminFrom: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      //添加表单的验证规则对象
      addAdminFromRules: {
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
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getAdminList()
  },
  methods: {
    async getAdminList() {
      const { data: res } = await this.$http.get('/PageUser', {
        params: this.datainfo,
      })
      console.log(res)
      if (res.code == 1) {
        return this.$message.error('获取管理员信息失败！')
        console.log(res)
      }
      this.adminList = res.data.list
      this.total = res.data.totalCount
      console.log(res)
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.datainfo.pageSize = newSize
      this.getAdminList()
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.datainfo.pageCurrent = newPage
      this.getAdminList()
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addAdminFromRef.resetFields()
    },
    //点击按钮，添加新用户
    async addAdmin() {
      //this.$refs.addAdminFromRef.validate(async (valid) => {
        //console.log(valid)
        //if (!valid) return
        //可以发起添加用户网络请求
        const { data: res } = await this.$http.post('/addUser', this.addAdminFrom)
        if (res.code == 1) {
          this.$message.error('添加管理员失败！')
        }
        this.$message.success('添加管理员成功！')
        //隐藏添加用户的对话框
        this.addDialogVisible = false
        //重新获取用户列表数据
        this.getAdminList()
      }
    },
  //},
}
</script>

<style lang="less" scoped>
.box_card {
  margin-top: 15px;
}
.input_select {
  width: 300px;
  margin-right: 30px;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
