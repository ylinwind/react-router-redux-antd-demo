import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import * as actionWays from '../actions';
import classNames from 'classnames';

const InputGroup = Input.Group;
class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: '',
            focus: false,
          };
    }
    render(){
        console.log(this.props,'+++++')
        const { style, size, placeholder } = this.props;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
          });
          const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
          });
        return(
            <div className="ant-search-input-wrapper" style={style}>
                <InputGroup className={searchCls}>
                <Input placeholder={placeholder}  onChange={this.handleInputChange}
                    onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
                />
                <div className="ant-input-group-wrap">
                    <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
                </div>
                </InputGroup>
            </div>
        ) 
    }
    handleSearch=(e)=>{
        this.props.actions.searchData(this.state.value);
        console.log(this,'--2--')
    }
    handleInputChange=(e)=>{
        this.setState({
            value:e.target.value
        })
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

export default connect(mapStateToProps,mapDispathchToProps)(Search);