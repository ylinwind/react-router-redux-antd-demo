import React from 'react';
import { Link } from 'react-router';
import { Table, Button , Icon , Modal} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from './Search';
import * as actionWays from '../actions';

const confirm = Modal.confirm;

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedRowKeys:[],//这里配置默认勾选列
            loading : false,
            editModalVisible:false,
            recordKey:-1,
            userName:'',
            address:'',
            age:-1,
            columns : [{
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              render: (text) => <a href="#">{text}</a>,
            }, {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
            }, {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            }, {
              title: '操作',
              key: 'operation',
              render: (text, record) => (
                <span>
                  <Button type="primary" 
                    onClick={()=>{
                      this.props.history.push(`edit?key=${record.key}`);
                    }}>编辑 <Icon type="edit" /></Button>
                  <span className="ant-divider"></span>
                  <Button type="primary"  
                    onClick={this.showConfirm.bind(this,record.key)}
                  >删除 <Icon type="cross-circle" /></Button>
                  <span className="ant-divider"></span>
                  <Button type="primary"   
                    onClick={()=>{
                      this.setState({
                        ModalVisible:true,
                        age:record.age,
                        userName:record.name,
                        address:record.address
                      })
                    }}
                  >
                    查看详情 <Icon type="plus-circle" />
                  </Button>
                </span>
              ),
            }],
            data:this.props.state.tableData,
        }
    }
    showConfirm(key){
      let that = this;
      confirm({
        title: '您是否确认要删除这项内容',
        content: '点确认后关闭',
        onOk() {
          // return new Promise((resolve) => {
          //   setTimeout(resolve, 1000);
          // });
          //发起action
          that.props.actions.deleteItem(key);
        },
        onCancel() {},
      });
    }
    start=()=> {
        this.setState({ loading: true });
        // 模拟 ajax 请求，完成后清空
        this.props.actions.deleteItem(this.state.selectedRowKeys);
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      }
    onSelectChange=(selectedRowKeys)=> {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        data:nextProps.state.tableData
      })
    }
    render(){
        const { loading, selectedRowKeys , columns , data} = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange, 
        };
        const hasSelected = selectedRowKeys.length > 0;
        return(
            <div><br/>
                <Button type="primary"><Link to='edit'><Icon type="plus-circle-o" /> 新增</Link></Button><br/><br/>
                <div>
                    <div style={{ marginBottom: 16 }}>
                      <Button 
                        type="primary" 
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                      ><Icon type="cross-circle-o" /> 批量删除</Button>
                      <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                      <div style={{width:200,float:'right'}}>
                        <Search/>
                      </div>
                    </div>
                    <Table 
                      rowSelection={rowSelection}
                      columns={columns} 
                      dataSource={data} 
                      onRowClick={(record,index)=>{
                        {/* console.log(record,index) */}
                      }}/>
                      {/* 编辑信息弹出框 */}
                      <Modal 
                        title="信息详情" 
                        visible={this.state.ModalVisible}
                        onOk={()=>{
                          this.setState({
                            ModalVisible:false,
                          })
                        }} 
                        onCancel={()=>{
                          this.setState({
                            ModalVisible:false,
                          })
                        }}
                      >
                      <p>姓名：{this.state.userName}</p>
                      <p>年龄：{this.state.age}</p>
                      <p>住址：{this.state.address}</p>
                      </Modal>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
  return {
      state
  };
}
function mapDispathchToProps(dispatch){
  return{
      actions:bindActionCreators(actionWays,dispatch)
  }
}

export default connect(mapStateToProps,mapDispathchToProps)(Home);