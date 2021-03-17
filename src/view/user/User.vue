<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    视图-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--用户列表-->
      <el-table :data="userList" border stripe>
        <el-table-column label="id" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-tooltip effect="dark" content="编辑" placement="top-start" enterable>
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>

            <el-tooltip effect="dark" content="删除" placement="top-start" enterable>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0

    }
  },
  created() {
    this.getUserList()
  },

  methods: {
    getUserList() {
      this.$axios.get('users', {
        params: this.queryInfo
      })
        .then(res => {
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            this.total = res.data.data.total
          } else {
            this.$message.error({
              showClose: true,
              message: '获取用户失败'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    userStateChanged(userinfo) {
      this.$axios.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success('更新用户状态成功')
          } else {
            this.$message.error({
              type: 'error',
              message: '修改失败'
            })
            userinfo.mg_state = !userinfo.mg_state
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
  text-align: center;
}

</style>
