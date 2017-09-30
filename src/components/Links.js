import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionWays from '../actions';
class Links extends React.Component{
    render(){
        console.log(this.props,'+++++')
        return(
            
            <div>
                <header>
                    <div>
                        111
                    </div>
                    <span>222</span>
                </header>
                Links999<br/>
                <Link to='/'>home</Link><br/>
                <Link to='edit'>edit</Link><br/>
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

export default connect(mapStateToProps,mapDispathchToProps)(Links);