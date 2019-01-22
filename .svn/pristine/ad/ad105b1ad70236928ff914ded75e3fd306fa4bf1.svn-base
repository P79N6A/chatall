<template>
  <div class="app-container">
      <div class="form-context">
      	  <el-form :inline="true" :model="formSearch">
  	  		 <el-form-item>
			 	<el-select clearable v-model="formSearch.sitecode" placeholder="选择站点" style="width: 150px;">
			      <el-option v-for="item in siteItems" :label="item.sitename" :value="item.sitecode" :key="item.sitecode"></el-option>
			    </el-select>
			 </el-form-item>
			 <el-form-item>
			    <el-input v-model="formSearch.sitedomain" placeholder="请输入搜索域名"></el-input>
			 </el-form-item>
			 <el-form-item>
			 	<el-select clearable v-model="formSearch.domainstate" placeholder="选择状态" style="width: 120px;">
			      <el-option label="正常" value="1"></el-option>
			      <el-option label="无效" value="0"></el-option>
            <el-option label="未检测" value="2"></el-option>
            <el-option label="区域劫持" value="3"></el-option>
            <el-option label="严重劫持" value="4"></el-option>
			    </el-select>
			 </el-form-item>
			 <el-form-item>
		    	<el-button type="primary" @click="onSearch" icon="el-icon-search" :loading="listLoading">搜索</el-button>
		  	 </el-form-item>
		  	 <el-form-item>
		  	 	<el-button type="primary" icon="el-icon-plus" @click="addData">新增</el-button>
		  	 </el-form-item>
         <el-form-item>
          <el-button type="primary" icon="el-icon-download" @click="addBatch">批量导入</el-button>
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
	      <el-table ref="multipleTable" :data="tableData" border v-loading="listLoading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.7)" style="width: 100%;" :header-cell-style="{background:'#f8f8f9'}" @selection-change="checkBox" @expand-change="expandChange" highlight-current-row @row-click="tableChange">
	      	   <el-table-column type="selection" prop="id" width="37" max-width="37" ></el-table-column>
	      	   <el-table-column prop="sitename" label="所属站点" width="120"></el-table-column>
	      	   <el-table-column prop="sitecode" label="站点标识" width="120"></el-table-column>
	      	   <el-table-column prop="sitedomain" label="域名地址" width="220"></el-table-column>
	    	   
	    	   <el-table-column prop="domainstate" label="状态" width="120">
	    	   	<template slot-scope="scope">
	    	   		<el-button size="mini" type="info" v-if="scope.row.domainstate==0">无效</el-button>
              <el-button size="mini" type="success" v-if="scope.row.domainstate==1">正常</el-button>
              <el-button size="mini" v-if="scope.row.domainstate==2">未检测</el-button>
              <el-button size="mini" type="warning" v-if="scope.row.domainstate==3">区域劫持</el-button>
              <el-button size="mini" type="danger" v-if="scope.row.domainstate==4">严重劫持</el-button>
	    	   	</template>
	    	   </el-table-column>
	    	   <el-table-column prop="createtime" label="创建日期">
	    	   		<template slot-scope="scope">
	    	   			{{scope.row.createtime | dateFormat("yyyy-MM-dd hh:mm:ss")}}
	    	   		</template>
	    	   </el-table-column>
	    	   <el-table-column type="expand" width="80">
              <template slot-scope="scope">
                <div class="expand-data-context">
                  <el-table :data="expandTableData" border v-loading="expandListLoading" element-loading-text="Loading" element-loading-background="rgba(0, 0, 0, 0.7)" style="width: 100%;" :header-cell-style="{background:'#f8f8f9'}">
                      <el-table-column type="index" label="序号" width="65"></el-table-column>
                      <el-table-column prop="ip" label="监测点" width="120"></el-table-column>
                      <el-table-column prop="isp" label="ISP" width="120"></el-table-column>
                      <el-table-column prop="country" label="国家" width="100"></el-table-column>
                      <el-table-column prop="area" label="省份" width="120"></el-table-column>
                      <el-table-column prop="region" label="地区" width="120"></el-table-column>
                      <el-table-column prop="connCost" label="连接时间" width="120"></el-table-column>
                      <el-table-column prop="httpCode" label="状态" width="80">
                        <template slot-scope="scope" v-if="scope.row.httpCode">
                          <el-tag size="medium" type="danger" v-if="scope.row.httpCode != 200">{{scope.row.httpCode}}</el-tag>
                          <el-tag size="medium" type="success" v-else>{{scope.row.httpCode}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="header" label="请求头"></el-table-column>
                  </el-table>
                </div>
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
  	   		<el-dialog :title="dialogTitle" width="28%" :visible.sync="dialogFormVisible" @close="dialogCancel">
  	   			<el-form :model="dataForm">
  	   				<el-form-item label="站点选择" :label-width="formLabelWidth">
  	   					<el-select v-model="dataForm.sitecode" placeholder="选择站点" style="width: 260px;">
					      <el-option v-for="item in siteItems" :label="item.sitename" :value="item.sitecode" :key="item.sitecode"></el-option>
					    </el-select>
  	   				</el-form-item>
  	   				<el-form-item label="域名地址" :label-width="formLabelWidth">
				        <el-input clearable v-model="dataForm.sitedomain" style="width: 260px;" placeholder="请输入域名地址"></el-input>
				      </el-form-item>
  	   			</el-form>
  	   			<div slot="footer" class="dialog-footer">
				      <el-button @click="dialogCancel">取 消</el-button>
				      <el-button type="primary" @click="dialogOK" :loading="dialogOKLoading">确 定</el-button>
				    </div>
  	   		</el-dialog>

          <el-dialog title="批量导入域名" width="28%" :visible.sync="dialogBatchFormVisible" >
            <el-form :model="dataBatchForm">
              <el-form-item label="站点选择" :label-width="formLabelWidth">
                <el-select v-model="dataBatchForm.sitecode" placeholder="选择站点" style="width: 260px;">
                <el-option v-for="item in siteItems" :label="item.sitename" :value="item.sitecode" :key="item.sitecode"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="域名地址" :label-width="formLabelWidth">
                <el-input clearable type="textarea" :rows="6" v-model="dataBatchForm.domainBatch" style="width: 96%;" placeholder="请输入域名地址一行一个"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="this.dialogBatchFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogBatchOK" :loading="dialogBatchOKLoading">确 定</el-button>
            </div>
          </el-dialog>
  	   </div>
  </div>
</template>

<script>
import Tools from '@/utils/tools'
import Domain from '@/api/domain'
export default {
  name: 'domainIndex',
  data() {
  	return {
  		dialogTitle:null,
  		dialogType:'insert',
  		formLabelWidth: '120px',
  		dialogFormVisible:false,
      dialogBatchFormVisible:false,
  		currentRow:{},
      dataBatchForm:{
        sitecode:null,
        domainBatch:null
      },
  		dataForm:{
  			id:null,
  			sitecode:null,
  			sitedomain:null
  		},
  		formSearch:{
  			sitecode:null,
  			sitedomain:null,
  			domainstate:null,
	  		pageSize:10,	// 每页显示数据
	  		currentPage:1	// 当前页码
  		},
  		siteItems:[],
  		selectedData:[],
      expandTableData:[],
  		tableData:[],
  		totalCount:0,	// 总记录数
  		listLoading:false,
      expandListLoading:false,
  		delLoading:false,
  		dialogOKLoading:false,
      dialogBatchOKLoading:false
  	}
  },
  computed: {
    
  },
  created(){

  },
  mounted(){
  	this.init();
  	this.onSearch();
  },
  methods:{
    expandChange(row, rows){
      this.detectDate(row.id);
    },
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
  	init(){
  		var that = this;
  		Domain.getSiteList().then(response => {
  			that.siteItems = response.items;
  		}).catch(error => {

  		});
  	},
  	onSearch(){// 搜索点击
  		var that = this;
  		this.listLoading = true;
  		Domain.getList(this.formSearch).then(response => {
  			that.totalCount = response.totalCount;
  			that.tableData = response.items;
  			that.listLoading = false;
  		}).catch(error => {
			that.listLoading = false;
  		});
  	},
    detectDate(id){
      var that = this;
      this.expandListLoading = true;
      this.expandTableData = [];
      Domain.getDetectList({id:id}).then(response => {
        that.expandTableData = response.items;
        that.expandListLoading = false;
      }).catch(error => {
        that.expandListLoading = false;
      });
    },
  	addData(){// 新增按钮点击
  		this.dialogTitle = '新增域名地址';
  		this.dialogType = 'insert';
  		this.dialogFormVisible = true;
  	},
    addBatch(){// 批量导入
      this.dialogBatchFormVisible = true;
    },
  	updateData(){// 编辑按钮点击
  		if(Tools.isEmpty(this.currentRow)){
  			this.$root.$message.error('请选择您要编辑的域名。');
  			return false;
  		}
  		this.dialogTitle = '编辑域名地址';
  		this.dialogType = 'update';
  		this.dataForm.id = this.currentRow.id;
  		this.dataForm.sitecode = this.currentRow.sitecode;
  		this.dataForm.sitedomain = this.currentRow.sitedomain;
  		this.dialogFormVisible = true;
  	},
  	deleteData(){// 删除按钮点击
  		if(this.selectedData.length <= 0){
			this.$root.$message.error('请选择您要删除的域名。');
  			return false;
  		}
  		var that = this;
  		this.delLoading = true;
  		Domain.delete(this.selectedData.toString()).then(response => {
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
  	dialogOK(){// dialog点击确定
  		if(this.dialogType === 'insert'){
  			this.save();
  		}
  		if(this.dialogType === 'update'){
  			this.update();
  		}
  	},
    dialogBatchOK(){// 批量导入dialog
      this.saveBatch();
    },
  	clearForm(){//	清除表单数据
  		this.dataForm.id = null;
  		this.dataForm.sitecode = null;
  		this.dataForm.sitedomain = null;
  	},
    clearBatchForm(){
      this.dataBatchForm.sitecode = null;
      this.dataBatchForm.domainBatch = null;
    },
  	save(){// 新增数据
  		var that = this;
  		this.dialogOKLoading = true;
  		Domain.add(this.dataForm).then(response => {
  			that.$root.$message.success(response.message);
  			that.dialogOKLoading = false;
  			that.dialogFormVisible = false;
  			that.clearForm();
  			that.onSearch();//重新加载数据
  		}).catch(error => {
			 that.dialogOKLoading = false;
  		});
  	},
    saveBatch(){//批量添加
      var that = this;
      this.dialogBatchOKLoading = true;
      Domain.addBatch(this.dataBatchForm).then(response => {
        that.$root.$message.success(response.message);
        that.dialogBatchOKLoading = false;
        that.dialogBatchFormVisible = false;
        that.clearBatchForm();
        that.onSearch();//重新加载数据
      }).catch(error => {
        that.dialogBatchOKLoading = false;
      });
    },
  	update(){//更新数据
  		var that = this;
  		this.dialogOKLoading = true;
  		Domain.update(this.dataForm).then(response => {
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
