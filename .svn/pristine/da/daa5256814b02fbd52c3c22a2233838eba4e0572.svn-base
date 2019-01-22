<template>
  <div class="app-container">
      <div class="form-context">
      	  <el-form :inline="true" :model="formSearch">
  	  		 <el-form-item>
			 	<el-select clearable v-model="formSearch.msgtype" placeholder="通知类型" style="width: 120px;">
			      <el-option label="邮件通知" value="email"></el-option>
			      <el-option label="短信通知" value="mobile"></el-option>
			    </el-select>
			 </el-form-item>
			 <el-form-item>
			    <el-input v-model="formSearch.msgaddress" placeholder="请输入消息地址"></el-input>
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
      <div class="data-context">
	      <el-table ref="multipleTable" :data="tableData" border v-loading="listLoading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.7)" style="width: 100%;" :header-cell-style="{background:'#f8f8f9'}" @selection-change="checkBox" highlight-current-row @row-click="tableChange">
	      	   <el-table-column type="selection" prop="id" width="37" max-width="37" ></el-table-column>
	      	   <el-table-column prop="msgaddress" label="通知地址" width="260"></el-table-column>
	      	   <el-table-column prop="msgtype" label="通知类型" width="120">
	      	   		<template slot-scope="scope">
	      	   			<el-tag size="medium" type="warning" v-if="scope.row.msgtype=='mobile'">短信通知</el-tag>
	      	   			<el-tag size="medium" type="danger" v-if="scope.row.msgtype=='email'">邮件通知</el-tag>
	      	   		</template>
	      	   </el-table-column>
	    	   <el-table-column prop="state" label="状态" width="120">
	    	   	<template slot-scope="scope">
	    	   		<el-button size="mini" type="danger" v-if="scope.row.state==0">无效</el-button>
	    	   		<el-button size="mini" type="success" v-if="scope.row.state==1">正常</el-button>
	    	   	</template>
	    	   </el-table-column>
	    	   <el-table-column prop="createtime" label="创建日期" width="160">
	    	   		<template slot-scope="scope">
	    	   			{{scope.row.createtime | dateFormat("yyyy-MM-dd hh:mm:ss")}}
	    	   		</template>
	    	   </el-table-column>
	    	   <el-table-column prop="context" label="备注" ></el-table-column>
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
  	   				<el-form-item label="通知地址" :label-width="formLabelWidth">
  	   					<el-input clearable v-model="dataForm.msgaddress" style="width: 260px;" placeholder="请输入通知地址"></el-input>
  	   				</el-form-item>
  	   				<el-form-item label="通知类型" :label-width="formLabelWidth">
					 	<el-select v-model="dataForm.msgtype" placeholder="通知类型" style="width: 260px;">
					      <el-option label="邮件通知" value="email"></el-option>
					      <el-option label="短信通知" value="mobile"></el-option>
					    </el-select>
				 	</el-form-item>
				 	<el-form-item label="状态" :label-width="formLabelWidth">
				      <el-select v-model="dataForm.state" placeholder="请选择状态" style="width: 260px;">
				        <el-option label="正常" value="1"></el-option>
				        <el-option label="无效" value="0"></el-option>
				      </el-select>
				    </el-form-item>
				 	  <el-form-item label="备注信息" :label-width="formLabelWidth">
			    		<el-input type="textarea" :rows="3" placeholder="" v-model="dataForm.context" style="width: 96%;"></el-input>
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
import Notice from '@/api/notice'
export default {
  name: 'messageIndex',
  data() {
  	return {
  		dialogTitle:null,
  		dialogType:'insert',
  		formLabelWidth: '80px',
  		dialogFormVisible:false,
  		currentRow:{},
  		dataForm:{
  			id:null,
  			msgaddress:null,
  			msgtype:'email',
  			state:'1',
  			context:null
  		},
  		formSearch:{
  			msgtype:null,
  			msgaddress:null,
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
  		Notice.getList(this.formSearch).then(response => {
  			that.totalCount = response.totalCount;
  			that.tableData = response.items;
  			that.listLoading = false;
  		}).catch(error => {
			that.listLoading = false;
  		});
  	},
  	addData(){// 新增按钮点击
  		this.dialogTitle = '新增通知配置';
  		this.dialogType = 'insert';
  		this.dialogFormVisible = true;
  	},
  	updateData(){// 编辑按钮点击
  		if(Tools.isEmpty(this.currentRow)){
  			this.$root.$message.error('请选择您要编辑的通知配置。');
  			return false;
  		}
  		this.dialogTitle = '编辑通知配置';
  		this.dialogType = 'update';
  		this.dataForm.id = this.currentRow.id;
  		this.dataForm.msgaddress = this.currentRow.msgaddress;
  		this.dataForm.msgtype = this.currentRow.msgtype;
  		this.dataForm.context = this.currentRow.context;
  		this.dataForm.state = this.currentRow.state.toString();
  		this.dialogFormVisible = true;
  	},
  	deleteData(){// 删除按钮点击
  		if(this.selectedData.length <= 0){
			this.$root.$message.error('请选择您要删除的通知配置。');
  			return false;
  		}
  		var that = this;
  		this.delLoading = true;
  		Notice.delete(this.selectedData.toString()).then(response => {
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
  	clearForm(){
  		this.dataForm.id = null;
  		this.dataForm.msgaddress = null;
  		this.dataForm.msgtype = 'email';
  		this.dataForm.state = '1';
  		this.dataForm.context = null;
  	},
  	dialogCancel(){
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
  	save(){//新增数据
  		var that = this;
  		this.dialogOKLoading = true;
  		Notice.add(this.dataForm).then(response => {
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
  		Notice.update(this.dataForm).then(response => {
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
