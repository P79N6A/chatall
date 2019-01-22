<template>
  <div class="app-container">
      <div class="form-context">
      	  <el-form :inline="true" :model="formSearch">
  	  		 
			 <el-form-item>
			    <el-input v-model="formSearch.ip" placeholder="请输入搜索代理IP"></el-input>
			 </el-form-item>
			 <el-form-item>
			 	<el-select v-model="formSearch.state" placeholder="选择状态" style="width: 120px;">
			      <el-option label="正常" value="1"></el-option>
			      <el-option label="无效" value="0"></el-option>
			    </el-select>
			 </el-form-item>
			 <el-form-item>
		    	<el-button type="primary" @click="onSearch" icon="el-icon-search" :loading="listLoading">搜索</el-button>
		  	 </el-form-item>
		  	 <el-form-item>
		  	 	<el-button type="primary" icon="el-icon-plus" @click="addData">新增</el-button>
		  	 </el-form-item>
		  	 <el-form-item>
		  	 	<el-button type="primary" icon="el-icon-edit" @click="updateData">编辑</el-button>
		  	 </el-form-item>
		  	 <el-form-item>
		  	 	<el-button type="danger" icon="el-icon-delete" @click="deleteData" :loading="delLoading">删除</el-button>
		  	 </el-form-item>
      	  </el-form>
      </div>
      <div class="data-context">
	      <el-table ref="multipleTable" :data="tableData" border v-loading="listLoading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.7)" style="width: 100%;" :header-cell-style="{background:'#f8f8f9'}" @selection-change="checkBox" highlight-current-row @row-click="tableChange">
	      	   <el-table-column type="selection" prop="id" width="37" max-width="37" ></el-table-column>
	      	   <el-table-column prop="ip" label="代理IP" width="120"></el-table-column>
	      	   <el-table-column prop="proxyport" label="端口" width="120"></el-table-column>
	      	   <el-table-column prop="isp" label="ISP运营商" width="120"></el-table-column>
	      	   <el-table-column prop="country" label="国家" width="120"></el-table-column>
	      	   <el-table-column prop="area" label="所属省" width="120"></el-table-column>
	      	   <el-table-column prop="city" label="所属市" width="120"></el-table-column>
	      	   <el-table-column prop="region" label="所属区" width="120"></el-table-column>
	      	   <el-table-column prop="county" label="所属县" width="120"></el-table-column>
	    	   <el-table-column prop="state" label="状态" width="120">
	    	   	<template slot-scope="scope">
	    	   		<el-button size="mini" type="danger" v-if="scope.row.state==0">无效</el-button>
	    	   		<el-button size="mini" type="success" v-if="scope.row.state==1">正常</el-button>
	    	   	</template>
	    	   </el-table-column>
	    	   <el-table-column prop="createtime" label="创建日期">
	    	   		<template slot-scope="scope">
	    	   			{{scope.row.createtime | dateFormat("yyyy-MM-dd hh:mm:ss")}}
	    	   		</template>
	    	   </el-table-column>
	      </el-table>
  	   </div>
  	   <div class="page-context clearfix" v-if="totalCount > formSearch.pageSize">
	  	   	<div class="page-context-right">
	  	   		<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="formSearch.currentPage"
			      :page-sizes="[10, 20, 30, 40,50]"
			      :page-size="formSearch.pageSize"
			      layout="total, sizes, prev, pager, next"
			      :total="totalCount">
			    </el-pagination>
	  	   	</div>
  	   </div>
  	   <div class="dialog-context">
  	   		<el-dialog :title="dialogTitle" width="30%" :visible.sync="dialogFormVisible" @close="dialogCancel">
  	   			<el-form :model="dataForm">
  	   				<el-form-item label="代理IP" :label-width="formLabelWidth">
		   				<el-col :span="11">
				        	<el-input clearable v-model="dataForm.ip" style="width: 100%;" placeholder="请输入代理IP地址"></el-input>
				        </el-col>
				        <el-col class="line" :span="2">-</el-col>
				        <el-col :span="7">
				        	<el-input-number v-model="dataForm.proxyport" :controls="false" :min="80" :max="65535" style="width: 100%;"></el-input-number>
				        </el-col>
			      </el-form-item>
			      <el-form-item label="运营商" :label-width="formLabelWidth">
			        	<el-input clearable v-model="dataForm.isp" style="width: 300px;" placeholder="请输入网络运营商例如”电信“"></el-input>
			      </el-form-item>
			      <el-form-item label="国家" :label-width="formLabelWidth">
		   				<el-col :span="11">
				        	<el-input clearable v-model="dataForm.country" style="width: 100%;" placeholder="请输入国家例如”韩国“"></el-input>
				        </el-col>
				        <el-col class="line" :span="2">-</el-col>
				        <el-col :span="7">
				        	<el-input clearable v-model="dataForm.area" style="width: 100%;" placeholder="请输入省份"></el-input>
				        </el-col>
			      </el-form-item>
			      <el-form-item label="市区" :label-width="formLabelWidth">
		   				<el-col :span="11">
				        	<el-input clearable v-model="dataForm.city" style="width: 100%;" placeholder="请输入市例如”首尔市“"></el-input>
				        </el-col>
				        <el-col class="line" :span="2">-</el-col>
				        <el-col :span="7">
				        	<el-input clearable v-model="dataForm.region" style="width: 100%;" placeholder="请输入区域例如”龙山区“"></el-input>
				        </el-col>
			      </el-form-item>
			      <el-form-item label="所属县" :label-width="formLabelWidth">
			        	<el-input clearable v-model="dataForm.county" style="width: 300px;" placeholder="请输入县"></el-input>
			      </el-form-item>
			      <el-form-item label="IP状态" :label-width="formLabelWidth">
				      <el-select v-model="dataForm.state" placeholder="请选择状态" style="width: 260px;">
				        <el-option label="正常" value="1"></el-option>
				        <el-option label="无效" value="0"></el-option>
				      </el-select>
				    </el-form-item>
  	   			</el-form>
  	   			<div slot="footer" class="dialog-footer">
			      <el-button @click="dialogCancel">取 消</el-button>
			      <el-button type="primary" @click="dialogOK" :loading="dialogOKLoading">确 定</el-button>
			    </div>
  	   		</el-dialog>
  	   </div>
  </div>
</template>

<script>
import Tools from '@/utils/tools'
import ProxyIp from '@/api/proxyip'
export default {
  name: 'proxyIndex',
  data() {
  	return {
  		dialogTitle:null,
  		dialogType:'insert',
  		formLabelWidth: '100px',
  		dialogFormVisible:false,
  		currentRow:{},
  		dataForm:{
  			id:null,
  			ip:null,
  			proxyport:8080,
  			isp:null,
  			country:null,
  			area:null,
  			city:null,
  			region:null,
  			county:null,
  			state:'1'
  		},
  		formSearch:{
  			ip:null,
  			state:null,
	  		pageSize:10,	// 每页显示数据
	  		currentPage:1	// 当前页码
  		},
  		selectedData:[],
  		tableData:[],
  		totalCount:0,	// 总记录数
  		listLoading:false,
  		delLoading:false,
  		dialogOKLoading:false
  	}
  },
  computed: {
    
  },
  created(){

  },
  mounted(){
  	this.onSearch();
  },
  methods:{
  	tableChange(row, event, column){// 表格数据行点击
  		this.currentRow = row;
  		this.$refs.multipleTable.toggleRowSelection(row);
  	},
  	checkBox(items){// 复选框事件
  		if(items && items.length > 0){
  			this.selectedData = [];
  			items.forEach(item=>{
  				this.selectedData.push(item.id);
  			});
  		}
  	},
  	onSearch(){// 搜索点击
  		var that = this;
  		this.listLoading = true;
  		ProxyIp.getList(this.formSearch).then(response => {
  			that.totalCount = response.totalCount;
  			that.tableData = response.items;
  			that.listLoading = false;
  		}).catch(error => {
			that.listLoading = false;
  		});
  	},
  	addData(){// 新增按钮点击
  		this.dialogTitle = '新增代理IP地址';
  		this.dialogType = 'insert';
  		this.dialogFormVisible = true;
  	},
  	updateData(){// 编辑按钮点击
  		if(Tools.isEmpty(this.currentRow)){
  			this.$root.$message.error('请选择您要编辑的代理IP。');
  			return false;
  		}
  		this.dialogTitle = '编辑代理IP地址';
  		this.dialogType = 'update';
  		this.dataForm.id = this.currentRow.id;
  		this.dataForm.ip = this.currentRow.ip;
  		this.dataForm.proxyport = this.currentRow.proxyport;
  		this.dataForm.isp = this.currentRow.isp;
  		this.dataForm.country = this.currentRow.country;
  		this.dataForm.area = this.currentRow.area;
  		this.dataForm.city = this.currentRow.city;
  		this.dataForm.region = this.currentRow.region;
  		this.dataForm.county = this.currentRow.county;
  		this.dataForm.state = this.currentRow.state.toString();
  		this.dialogFormVisible = true;
  	},
  	deleteData(){// 删除按钮点击
  		if(this.selectedData.length <= 0){
			this.$root.$message.error('请选择您要删除的代理IP。');
  			return false;
  		}
  		var that = this;
  		this.delLoading = true;
  		ProxyIp.delete(this.selectedData.toString()).then(response => {
  			 this.$root.$message.success(response.message);
  			 that.delLoading = false;
  			 this.onSearch();//重新加载数据
  		}).catch(error => {
			   that.delLoading = false;
  		});
  	},
  	handleSizeChange(val){// 调整每页显示的条数
  		this.formSearch.pageSize = val;		//重置每页显示条数
  		this.formSearch.currentPage = 1;	//重置当前页码
  		this.onSearch();
  	},
  	handleCurrentChange(val){// 分页点击
  		this.formSearch.currentPage = val;
  		this.onSearch();
  	},
  	dialogCancel(){// dialog关闭事件
  		this.dialogFormVisible = false;
  		this.clearForm();
  	},
  	dialogOK(){
  		if(this.dialogType === 'insert'){
  			this.save();
  		}
  		if(this.dialogType === 'update'){
  			this.update();
  		}
  	},
  	clearForm(){//清除表单数据
  		this.dataForm.id = null;
  		this.dataForm.ip = null;
  		this.dataForm.proxyport = 8080;
  		this.dataForm.isp = null;
  		this.dataForm.country = null;
  		this.dataForm.area = null;
  		this.dataForm.city = null;
  		this.dataForm.region = null;
  		this.dataForm.county = null;
  		this.dataForm.state = '1';
  	},
  	save(){// 新增数据
  		var that = this;
  		this.dialogOKLoading = true;
  		ProxyIp.add(this.dataForm).then(response => {
  			that.$root.$message.success(response.message);
  			that.dialogOKLoading = false;
  			that.dialogFormVisible = false;
  			that.clearForm();
  			that.onSearch();//重新加载数据
  		}).catch(error => {
			that.dialogOKLoading = false;
  		});
  	},
  	update(){//更新数据
  		var that = this;
  		this.dialogOKLoading = true;
  		ProxyIp.update(this.dataForm).then(response => {
  			that.$root.$message.success(response.message);
  			that.dialogOKLoading = false;
  			that.dialogFormVisible = false;
  			that.clearForm();
  			that.onSearch();//重新加载数据
  		}).catch(error => {
			that.dialogOKLoading = false;
  		});
  	}
  	
  }
}
</script>
