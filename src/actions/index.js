export const REQUEST_START = 'REQUEST_START'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAIL = 'REQUEST_FAIL'

export const DELETE_START = 'DELETE_START'
export const EDIT_START = 'EDIT_START'
export const EDIT_SUBMIT = 'EDIT_SUBMIT'
export const SEARCH_DATA = 'SEARCH_DATA'


export function requestStart(data) {
  return {
    type: REQUEST_START,
    data
  }
}
export function requestSuccess(data) {
    return {
      type: REQUEST_SUCCESS,
      data
    }
}
export function requestFail(data) {
    return {
      type: REQUEST_FAIL,
      data
    }
}
export const change = function(type) {
  return{
      type:type
  }
}
// 删除item
export const deleteItem = function(data) {
  return {
    type: DELETE_START,
    data
  }
}
// 编辑数据
export const editItem = function(data) {
  return {
    type: EDIT_START,
    data
  }
}
// 编辑数据提交
export const editSubmit = function(data) {
  return {
    type: EDIT_SUBMIT,
    data
  }
}
//查询数据
export const searchData = function(data) {
  return {
    type: SEARCH_DATA,
    data
  }
}