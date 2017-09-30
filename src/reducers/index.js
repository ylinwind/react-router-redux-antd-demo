import {
    REQUEST_START,
    REQUEST_SUCCESS,
    REQUEST_FAIL,
    DELETE_START,
    EDIT_START,
    EDIT_SUBMIT,
    SEARCH_DATA,
  } from '../actions'

  const data = [];
  for (let i = 0; i < 15; i++) {
    data.push({
      key: i,
      name: `李大嘴${i}`,
      age: 32,
      address: `西湖区湖底公园${i}号`,
    });
  }
//初始化数据
const initialState = {
    isFetching:false,
    tableData:data,
    itemData:{},
    searchData:data,//查询数据
}
const  reducer = (state = initialState, action)=>{
    switch (action.type) {
      case REQUEST_START:
        return {
            isFetching:true,
        }
        //删除数据
      case DELETE_START:
        console.log(action.data)
        let datas = state.tableData;
        if(typeof action.data=='number'){
            for(let i = 0 ,length=datas.length;i<length;i++){
                if(datas[i].key===action.data){
                    datas.splice(i,1);
                    break;
                }
            }
        }else{
            let arr = action.data;
            for(let i = 0,length=arr.length;i<length;i++){
                for(let j = 0 ,length=datas.length;j<length;j++){
                    if(datas[j].key===arr[i]){
                        datas.splice(j,1);
                        break;
                    }
                }
            }
        }
        console.log(datas,'---')
        return Object.assign({},state,{
                isFetching:true,
                searchData:datas,
            })
         //进入路由自动填充数据   
      case EDIT_START:
        let item={};
        let info = state.tableData;
        for(let i = 0 ,length=info.length;i<length;i++){
            if(info[i].key==action.data){
                item=info[i];
                break;
            }
        }
        return Object.assign({},state,{itemData:item,})
//编辑数据，提交数据,修改增加
      case EDIT_SUBMIT:
        let infos = state.tableData;
        let newObj = {};
        if(typeof action.data.key!='undefined'){
            console.log(1,action.data)
            for(let i = 0 ,length=infos.length;i<length;i++){
                if(infos[i].key==action.data.key){
                    infos[i].name=action.data.name;
                    infos[i].age=action.data.age;
                    infos[i].address=action.data.address;
                    break;
                }
            }
        }else{
            console.log(2)
            newObj.name=action.data.name;
            newObj.age=action.data.age;
            newObj.address=action.data.address;
            newObj.key = infos.length;
            console.log(newObj,'new')
            infos.push(newObj);
        }
        console.log(infos,'-----')
        return Object.assign({},state,{searchData:infos})
      case SEARCH_DATA:
            console.log(action.data,'111reducer')
            let dataArr = state.searchData;
            let len = dataArr.length;
            let reg = new RegExp(action.data);
            let newArr = [];
            for(var i=0;i<len;i++){
                //如果字符串中不包含目标字符会返回-1
                let tempKey = ''+dataArr[i].key;
                let tempAge = ''+dataArr[i].age;
                if(tempKey.match(reg)||
                   dataArr[i].name.match(reg)||
                   tempAge.match(reg)||
                   dataArr[i].address.match(reg)){
                   newArr.push(dataArr[i]);
                }
            }
            console.log(newArr,'newew')
            return Object.assign({},state,{tableData:newArr})
      default:
        return state
    }
}

export default reducer;