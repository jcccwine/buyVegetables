<template>
  <div class="about">
    <h1>{{ id? `编辑`:`新增` }}菜品分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <!-- 和数据库里parent字段进行双向绑定 -->
        <el-select v-model="model.vegParent.name">
          <el-option v-for="item in parents" :key="item.id"
            :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.vegName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="model.vegDesc"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.vegPic" :src="model.vegPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="model.vegPrice"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="model.vegUnit"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="model.vegStock"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="model.vegStatus.status">
          <el-option v-for="item in statusList" :key="item.id"
            :label="item.status" :value="item.status"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data(){
      return {
        model: {
          vegParent: {},
          vegStatus: {}
        },
        parents: [
          {id: 0, name: '蔬菜'},
          {id: 1, name: '水果'},
          {id: 2, name: '肉类'},
          {id: 3, name: '速冻食品'},
          {id: 4, name: '海鲜'},
        ],
        statusList: [
          {id: 0, status: '已售罄'},
          {id: 1, status: '正在出售'}
        ]
      }
    },
    methods: {
      afterUpload(res){
        // 对model进行动态赋值
        this.$set(this.model,'vegPic',res.url)
        this.model.vegPic = res.url
      },
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){        
        let res;// eslint-disable-line no-unused-vars
        if(this.id){
          res = await this.$http.put(`rest/categories/${this.id}`,this.model)
        }
        else {
          res = await this.$http.post('rest/categories',this.model)
        }
        this.$router.push('/categories/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/categories/${this.id}`)// eslint-disable-line no-unused-vars
        this.model = res.data
      },
    },
    created() {
      // 如果有了id，就执行fetch方法
      this.id && this.fetch()
    },
  }

</script>