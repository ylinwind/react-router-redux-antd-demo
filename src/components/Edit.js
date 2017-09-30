import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input , Button , Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
    Cascader, Slider, Col, Upload, Icon } from 'antd';
import * as actionWays from '../actions';

const FormItem = Form.Item;

class About extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const { getFieldProps } = this.props.form;
        const { itemData } = this.props.state;
        const {name, age , address } = itemData;
        return(
            <div style={{padding:100}}>
                
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormItem
                    label="姓名"
                    labelCol={{ span: 10}}
                    wrapperCol={{ span: 14 }}
                    help="请输入汉字和字母组合"
                    >
                    <Input style={{ width: 200 }}
                        {...getFieldProps('name', { initialValue: name })}
                    />
                    </FormItem>
                    <FormItem
                    label="年龄"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    help="请输入数字组合"
                    >
                    <InputNumber min={1} max={100} style={{ width: 200 }}
                        {...getFieldProps('age', { initialValue: age })}
                    />
                    </FormItem>
                    <FormItem
                    label="地址"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    help="请输入汉字和字母组合"
                    >
                    <Input min={1} max={10} style={{ width: 200 }}
                        {...getFieldProps('address', { initialValue: address })}
                    />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 14, offset:10 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 30 }}><Icon type="check-circle" />确定</Button>
                        <Button type="primary" ><Link to='/'><Icon type="left" />回到首页</Link></Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
    handleSubmit=(e)=> {
        const param = this.props.location.search?this.props.location.search.slice(1):'';
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            console.log('Errors in form!!!');
            return;
          }
          console.log(values);
          let name = values.name;
          let age = values.age;
          let address = values.address;
          this.props.actions.editSubmit({
            name:name,
            age:age,
            address:address,
            key:param.split("=")[1],
          })
            this.props.history.push('/');
        });
    }
    componentDidMount=()=>{
        const param = this.props.location.search?this.props.location.search.slice(1):'';
        this.props.actions.editItem(param.split("=")[1]);
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
About = Form.create()(About);
export default connect(mapStateToProps,mapDispathchToProps)(About);