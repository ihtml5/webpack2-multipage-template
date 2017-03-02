import React from 'react';
import { Button } from 'antd';
const url = 'http://ac-OnsG2j7w.clouddn.com/61489181fc856ffd.json';
const onCheckAll = ({e,dataSource,records}) => {
    dataSource = dataSource.map((d,index) => {
        d['checked'] = e.target.checked;
        return d;
    });
    e.target.checked ? records = dataSource : records.length = 0;
    return {
      dataSource,
      records
    }
}
const onCheck = ({e,index,multi,single,dataSource,records}) => {
  console.log(e,index,multi,single,dataSource,records);
  dataSource[index]['checked'] = e.target.checked;
  dataSource[index]['idx'] = index;
  if (multi) {
      e.target.checked ? records[index] = dataSource[index] : records[index] = undefined;
  } else if (single) {
      records.length>0 && (dataSource[records[0]['idx']]['checked'] = false);
      e.target.checked ? records[0] = dataSource[index] : records.length = 0;
  }
  records = records.filter( v => v);
  return {
    dataSource,
    records
  }
}
const onExport = (formate,data,ev) => {
  console.log(formate,data,ev);
  let contents = null;
  formate.toLowerCase() === 'json' && (contents = JSON.stringify(data));
  let URL = window.URL || window.webkitURL;
  let blob = new Blob([contents],{type: 'text/' + formate});
  ev.target.href = URL.createObjectURL(blob);
  ev.target.download = 'data.' + formate;
  console.log(contents);
}
const onSearch = (e,url,limit,offset) => {
  if (e.target.value.length === 0 ) {
    return;
  }
  console.log('onSearch',`${url}/search.shtml?keyword=${e.target.value}&limit=${limit}&offset=${offset}`);
}
const onPageChange = (e) => {
  alert(e.target.textContent);
}
let onPaginationChangeTip = (e,offset,pages) => {
  if (offset === pages) {
    alert('你已切换到最后一页');
    offset = pages-1;
  }
  if (offset < 0) {
      alert('你已切换到最前一页');
      offset = 0;
  }
  console.clear();
  console.log('pagination',e,offset,pages);
  return offset;
}
// const dataSource = [{
//   key: '1',
//   name: '胡彦斌',
//   age: 32,
//   checked: false
//   address: '西湖区湖底公园1号'
// }, {
//   key: '2',
//   name: '胡彦祖',
//   age: 42,
//   checked: false
//   address: '西湖区湖底公园1号'
// }];

// const columns = [{
//   title: '姓名',
//   dataIndex: 'name',
//   key: 'name',
// }, {
//   title: '年龄',
//   dataIndex: 'age',
//   key: 'age',
// }, {
//   title: '住址',
//   dataIndex: 'address',
//   key: 'address',
// }];
// const exportTypes=['csv','json'];
const limit = 1;
const offset = 0;
const height = 300;
let genSearchTpl = (url,limit,offset,onSearch) => {
  return (
    <div>
      <input type="text" className="form-control tu-table-searchInput" placeholder="请输入查询关键词" onChange={(e) => {onSearch(e,url,limit,offset)}}/>
      <Button type="primary" style={{marginLeft: '10px'}}>查询</Button>
    </div>
  )
}
const tableCfg = {
  limit,
  offset,
  url,
  // exportTypes,
  onCheckAll,
  onCheck,
  onExport,
  onSearch,
  onPageChange,
  onPaginationChangeTip,
  genSearchTpl,
  height
}
export {
  tableCfg
}