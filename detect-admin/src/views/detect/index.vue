<template>
  <div class="app-container">
      <div class="form-context">
      	<el-form :inline="true" :model="formDetect">
      		<el-form-item>
      			<el-input placeholder="请输入需要监测的网址" v-model="formDetect.httpurl" :readonly="readonly" style="width: 520px;">
			    	<template slot="prepend">http://</template>
			 	</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="doDetect" :loading="detectLoading">域名检测</el-button>
			</el-form-item>
      	</el-form>
      </div>
      <div class="data-context" v-show="isShow">
      	<el-table ref="multipleTable" :data="tableData" border v-loading="listLoading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.7)" style="width: 100%;" :header-cell-style="{background:'#f8f8f9'}" highlight-current-row>
      		<el-table-column type="index" label="序号" width="65"></el-table-column>
              <el-table-column prop="ip" label="监测点" width="120"></el-table-column>
              <el-table-column prop="isp" label="ISP" width="120"></el-table-column>
              <el-table-column prop="country" label="国家" width="80"></el-table-column>
              <el-table-column prop="area" label="省份" width="120"></el-table-column>
              <el-table-column prop="region" label="地区" width="160"></el-table-column>
              <el-table-column prop="connCost" label="连接时间" width="100"></el-table-column>
              <el-table-column prop="httpCode" label="状态" width="80">
                <template slot-scope="scope" v-if="scope.row.httpCode">
                  <el-tag size="medium" type="danger" v-if="scope.row.httpCode != 200">{{scope.row.httpCode}}</el-tag>
                  <el-tag size="medium" type="success" v-else>{{scope.row.httpCode}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="header" label="请求头"></el-table-column>
      	</el-table>
      </div>
  </div>
</template>

<script>
import Tools from '@/utils/tools'
import Detect from '@/api/detect'
export default {
  name: 'domainDetect',
  data() {
  	return {
  		formDetect:{
  			httpurl:null
  		},
  		tableData:[],
  		listLoading:false,
  		readonly:false,
  		isShow:false,
  		detectLoading:false
  	}
  },
  computed: {
    
  },
  created(){

  },
  mounted(){

  },
  methods:{
  	doDetect(){
  		var that = this;
  		this.detectLoading = true;
  		Detect.getList(this.formDetect).then(response => {
  			that.totalCount = response.totalCount;
  			that.tableData = response.items;
  			that.isShow = true;
  			that.readonly = true;
  			that.getAll(response.items);
  		}).catch(error => {
			that.detectLoading = false;
  		});
  	},
  	request(item){
  		var that = this;
		return new Promise((resolve, reject) => {
			Detect.getDetect({id:item.id,domain:that.formDetect.httpurl}).then(response => {
				item.connCost = response.connCost;
				item.httpCode = response.httpCode;
				item.header = response.header;
				item.region = response.region;
				resolve(item);
			}).catch(error => {
				resolve(item);
			});
		});
			
  		
  	},
  	getAll(items){
  		var that =this;
		var arr = [];
		items.forEach(item=>{
			arr.push(that.request(item));
		});
		return Promise.all(arr).then((res)=>{
			that.tableData = res;
			that.detectLoading = false;
			that.readonly = false;
		},(err)=>{
			that.detectLoading = true;
			that.readonly = false;
		});
  	}
  }
}
</script>
