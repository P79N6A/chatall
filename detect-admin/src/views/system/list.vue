<template>
  <div class="app-container">
  	  <div class="form-context">
  	  	<el-form :inline="true" :model="formSearch">
  	  		 <el-form-item>
			    <el-input v-model="formSearch.account" placeholder="请输入管理员账号"></el-input>
			 </el-form-item>
			 <el-form-item>
			 	<el-select clearable v-model="formSearch.state" placeholder="选择状态" style="width: 120px;">
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
  	  <!--
  	  <div class="operate-context">
  	  	<el-row>
  	  		<el-button type="primary" icon="el-icon-plus">新增</el-button>
  	  	</el-row>
  	  </div>-->
  	  <div class="data-context">
	      <el-table ref="multipleTable" :data="tableData" border v-loading="listLoading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.7)" style="width: 100%;" :header-cell-style="{background:'#f8f8f9'}" @selection-change="checkBox" highlight-current-row @row-click="tableChange">
	      	   <el-table-column type="selection" prop="id" width="37" max-width="37" ></el-table-column>
	      	   <el-table-column prop="account" label="管理员账号" width="120"></el-table-column>
	    	   <el-table-column prop="createtime" label="创建日期" width="160">
	    	   		<template slot-scope="scope">
	    	   			{{scope.row.createtime | dateFormat("yyyy-MM-dd hh:mm:ss")}}
	    	   		</template>
	    	   </el-table-column>
	    	   <el-table-column prop="state" label="状态" width="120">
	    	   	<template slot-scope="scope">
	    	   		<el-button size="mini" type="danger" v-if="scope.row.state==0">无效</el-button>
	    	   		<el-button size="mini" type="success" v-if="scope.row.state==1">正常</el-button>
	    	   	</template>
	    	   </el-table-column>
	    	   <el-table-column prop="iplimit" label="允许登录IP"></el-table-column>
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
	  	   <el-dialog :title="dialogTitle" width="28%" :visible.sync="dialogFormVisible" @close="dialogCancel">
			  <el-form :model="dataForm">
			    <el-form-item label="账号" :label-width="formLabelWidth">
			      <el-input clearable v-model="dataForm.account" style="width: 260px;" :disabled="dialogType == 'update'" placeholder="请输入登录账号"></el-input>
			    </el-form-item>
			    <el-form-item label="密码" :label-width="formLabelWidth">
			      <el-input clearable type="passwd" v-model="dataForm.passwd" style="width: 260px;" placeholder="请输入登录密码"></el-input>
			    </el-form-item>
			    <el-form-item label="状态" :label-width="formLabelWidth">
			      <el-select v-model="dataForm.state" placeholder="请选择状态" style="width: 260px;">
			        <el-option label="正常" value="1"></el-option>
			        <el-option label="无效" value="0"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="登录IP" :label-width="formLabelWidth">
			    	<el-input type="textarea" :rows="3" placeholder="允许登录IP地址，多个用“|”号隔开" v-model="dataForm.iplimit" style="width: 96%;"></el-input>
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
import Admin from '@/api/admin'
export default {
  name: 'adminlist',
  data() {
  	return {
  		dialogTitle:null,
  		dialogType:'insert',
  		formLabelWidth: '80px',
  		dialogFormVisible:false,
  		selectedData:[],
  		currentRow:{},// 当前行数据
  		dataForm:{	// 数据提交
  			id:null,
  			account:null,
  			passwd:null,
  			state:null,
  			iplimit:null
  		},
  		formSearch:{
  			account:null,
  			state:null,
	  		pageSize:10,	// 每页显示数据
	  		currentPage:1	// 当前页码
  		},
  		totalCount:0,	// 总记录数
  		listLoading:true,
  		delLoading:false,
  		dialogOKLoading:false,
  		tableData:[]
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
  	tableChange(row, event, column){// 表格行点击事件
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
  	onSearch(){
  		var that = this;
  		this.listLoading = true;
  		Admin.getList(this.formSearch).then(response => {
  			that.totalCount = response.totalCount;
  			that.tableData = response.items;
  			that.listLoading = false;
  		}).catch(error => {
			that.listLoading = false;
  		});
  	},
  	handleSizeChange(val){
  		// 调整每页显示的条数
  		this.formSearch.pageSize = val;		//重置每页显示条数
  		this.formSearch.currentPage = 1;	//重置当前页码
  		this.onSearch();
  		
  	},
  	handleCurrentChange(val){
  		// 当前页
  		this.formSearch.currentPage = val;
  		this.onSearch();
  	},
  	addData(){	//新增数据
  		this.dialogTitle = "新增管理员";
  		this.dialogType = "insert";
  		this.dialogFormVisible = true;
  	},
  	updateData(){
  		if(Tools.isEmpty(this.currentRow)){
  			this.$root.$message.error('请选择您要编辑的管理员信息。');
  			return false;
  		}
  		this.dialogTitle = "编辑管理员";
  		this.dialogType = "update";
  		this.dataForm.id = this.currentRow.id;
  		this.dataForm.account = this.currentRow.account;
  		this.dataForm.state = this.currentRow.state.toString();
  		this.dataForm.iplimit = this.currentRow.iplimit;
  		this.dialogFormVisible = true;
  	},
  	deleteData(){
  		if(this.selectedData.length <= 0){
			this.$root.$message.error('请选择您要删除的信息。');
  			return false;
  		}
  		var that = this;
  		this.delLoading = true;
  		Admin.delete(this.selectedData.toString()).then(response => {
  			this.$root.$message.success(response.message);
  			that.delLoading = false;
  			this.onSearch();//重新加载数据
  		}).catch(error => {
			that.delLoading = false;
  		});
  	},
  	clearForm(){//清除表单数据
  		this.dataForm.id = null;
  		this.dataForm.account = null;
  		this.dataForm.passwd = null;
  		this.dataForm.state = null;
  		this.dataForm.iplimit = null;
  	},
  	dialogOK(){
  		if(this.dialogType === 'insert'){//新增
  			this.save();
  		}
  		if(this.dialogType === 'update'){//更新
  			this.update();
  		}
  	},
  	dialogCancel(){
  		this.dialogFormVisible = false;
  		if(this.dialogType === 'insert'){
  			this.clearForm();
  		}
  	},
  	save(){//新增数据
  		var that = this;
  		this.dialogOKLoading = true;
  		Admin.add(this.dataForm).then(response => {
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
  		Admin.update(this.dataForm).then(response => {
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
