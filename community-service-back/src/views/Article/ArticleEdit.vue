<template>
  <div class="about">
    <h1>{{ id ? `编辑`:`新增` }}公告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="公告详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  export default {
    components: {
      VueEditor
    },
    props: {
      id: {}
    },
    data(){
      return {
        model: {
          adminName: localStorage.getItem('adminName'),
          date: new Date().toISOString().slice(0, 10)
        }
      }
    },
    methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
  
        const formData = new FormData()
        formData.append("file", file)

        const res = await this.$http.post('upload',formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url)
        resetUploader()
      },
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){     
        let res;// eslint-disable-line no-unused-vars
        if(this.id){
          res = await this.$http.put(`rest/articles/${this.id}`,this.model)
        }
        else {
          // 和服务器文件夹下的admin/index.js里的 router.post('/articles' 对应
          res = await this.$http.post('rest/articles',this.model)
          console.log(this.model)
        }
        this.$router.push('/articles/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/articles/${this.id}`)// eslint-disable-line no-unused-vars
        this.model = res.data
      },
    },
    created() {
      // 如果有了id，就执行fetch方法
      this.id && this.fetch()
    },
  }

</script>