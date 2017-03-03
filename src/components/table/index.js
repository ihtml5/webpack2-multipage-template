import React, { Component,Children,cloneElement } from 'react';
import Tupagination from '../pagination';
import TutablePluginFilter from './plugins/PluginFilter';


class Tutable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [],
            order: {
                value: '',
                by: ''
            },
            loading: true,
            showNo: true,
            offset: 0,
            editor: {},
            limit: this.props.limit
        }
        this.sortBy = this.sortBy.bind(this);
        this.changeOffset = this.changeOffset.bind(this);
        this.filterColumnsShow = this.filterColumnsShow.bind(this);
        this.selectRows = this.selectRows.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.successCallback = this.successCallback.bind(this);
        this.errorCallback = this.errorCallback.bind(this);
    }
    autoRecord(dataSource) {
        let records = [];
        dataSource.forEach((d,index) => {
            if(d['checked']) {
                d['idx'] = index;
                records.push(d);
            }
        });
        return records;
    }
    showEditor(e) {
        const { isEdit } = this.props;
        if (!isEdit) {
            e.preventDefault();
            return;
        }
        this.setState({
            editor: {
                col: e.target.cellIndex,
                row: Number(e.target.dataset.rowindex)
            }
        });
    }
    selectAll(e) {
        let { dataSource,records=[] } = this.state;
        const { onCheckAll } = this.props;
        this.setState(onCheckAll({e,dataSource,records}),function() {
            console.log(this.state.records);
        });
    }
    selectRows(e,index) {
        const { multi,single,onCheck } = this.props;
        let { dataSource,records=[] } = this.state;
        this.setState(onCheck({e,index,multi,single,dataSource,records}),function() {
            console.log(dataSource[index],this.state.records);
        });
    }
    filterColumnsShow(e,index) {
        let { columns,showNo } = this.state;
        index !== -1 && (columns[index]['visible'] = e.target.checked);
        index === -1 && (showNo = e.target.checked);
        this.setState({
            columns: columns,
            showNo: showNo
        });
        console.log('filterColumnsShow',e,index);
    }
    componentDidMount() {
        const { url,apiService } = this.props;
        this._stickyHeader.style.width = (this._domTable.clientWidth - 17) + 'px';
        window.onresize = () => {
            this._stickyHeader.style.width = (this._domTable.clientWidth - 17) + 'px';
        }
        console.clear();
        apiService.get({url},this.successCallback,this.errorCallback);
        // fetch(url).then(res => res.json()).then(result => {

        // }).catch(err => console.error(err));
    }
    componentWillUnMount() {
        window.onresize = null;
        this._stickyHeader = null;
        this._domTable = null;
    }
    changeOffset(e) {
        const { offset,dataSource,limit,order } = this.state;
        const { onPaginationChangeTip,url } = this.props; 
        const pages = Math.ceil(dataSource.length/limit);
        console.error('changeOffset');
        console.log(offset,pages,e.target.className);
        let adjustOffset = null;
        if (e.target.className.indexOf('tu-pagination-prev') !== -1) {
            adjustOffset = offset-1;
        } else if (e.target.className.indexOf('tu-pagination-next') !== -1) {
            adjustOffset = offset+1;
        } else {
            adjustOffset = Number(e.target.textContent) -1;
        }
        adjustOffset = onPaginationChangeTip(e,adjustOffset,pages);
        if ((adjustOffset === pages-1 && offset === pages-1) || (adjustOffset === 0 && offset === 0)) {
            e.preventDefault();
            return;
        }
        this.setState({
            offset: adjustOffset
        },function() {
            const newUrl = `${url}/search.shtml?offset=${this.state.offset}&limit=${limit}${order.value.length ? `&order=${order.value}&sort=${order.by}`: ''}`;
            console.log('newUrl',newUrl);
        });
    }
    sortBy(order,key) {
        let newOrder = {
            value: order,
            by: key
        }
        const { limit, offset,url } = this.props;
        const newUrl = `${url}?sort=${newOrder.by}&order=${newOrder.value}&limit=${limit}&offset=${offset}`;
        fetch(newUrl).then(res => { 
            this.setState({
                loading: true
            });
            return res.json();
        }).then(result => {
            this.setState(Object.assign({},this.state,result,{order:newOrder,loading: false}));
        }).catch(err => console.error(err));
        // this.setState({
        //     order: newOrder
        // },function() {
        //     console.clear();
        //     console.log('状态更新完毕');
        //     console.log(order,key);
        //     console.log(limit,offset,newUrl);
        // });
    }
    genStickyHeader() {
        const { children,multi,single,url} = this.props;
        const { columns,showNo,order } = this.state;
        const selectMode = multi ? 'multi' : ( single ? 'single': null);
        let stickyHeader = null;
        Children.forEach(children,(child,index) => {
            let childName = typeof child.type === 'function' && child.type.name;
            let extraAttrs = url ? {columns,showNo,order} : {};
            selectMode && selectMode ==='multi' && (extraAttrs = Object.assign({},extraAttrs));
            if (childName === 'Tuthead') {
                stickyHeader = 
                 <div className="tu-table-stickyHeader" ref={(node) => {this._stickyHeader = node;}}>
                    <table className="table table-bordered table-sticky">
                        <colgroup>
                            <col style={{width:80}}/>
                            <col />
                        </colgroup>
                        { cloneElement(child,Object.assign({},child.props,{selectMode,sortBy:this.sortBy},extraAttrs),child.props.children) }
                    </table>
                </div>;
            }
            extraAttrs = null;
        });
        return stickyHeader;
    }
    traverseChildrens() {
        const { children,multi,single,sticky,url,onCheckAll,onCheck } = this.props;
        const { columns,dataSource,order,showNo,loading,editor } = this.state;
        const selectMode = multi ? 'multi' : ( single ? 'single': null);
        let extraAttrs = url ? {columns,dataSource,showNo,loading,onCheck,selectRows:this.selectRows} : {};
        selectMode && selectMode ==='multi' && (extraAttrs = Object.assign({},extraAttrs,{onCheckAll}));
        return Children.map(children,(child,index) => {
            let childName = typeof child.type === 'function' && child.type.name;
            if (childName === 'Tuthead') {
                // return undefined;
                return cloneElement(child,Object.assign({},child.props,{selectMode},{sticky},{onCheckAll,columns,order,showNo,selectAll:this.selectAll},{sortBy:this.sortBy}),child.props.children);
            }
            return cloneElement(child,Object.assign({},child.props,{selectMode},extraAttrs,{showEditor:this.showEditor,editor}),child.props.children);
        });
    }
    successCallback (result) {
        let records = this.autoRecord(result['dataSource']);
        this.setState(Object.assign({},this.state,result,{loading:false,records}))
    }
    errorCallback(error) {
        this.setState({
            loading: false,
            error
        });
    }
    render() {
        const { sticky,exportTypes,onExport,onSearch,url,limit,offset,genSearchTpl,height,apiService } = this.props;
        const { dataSource,columns,showNo } = this.state;
        let pages = Math.ceil(dataSource.length/limit);
        return (
            <div className="tu-table" ref={(node) => { this._domTable = node;}}>
                <div className="tu-table-toolbar">
                    <div className="tu-table-toolbar-left">
                        <div className="tu-table-search">
                            {genSearchTpl({url,limit,offset,onSearch,apiService,successCallback:this.successCallback,errorCallback:this.errorCallback})}
                            {/*<input type="text" className="form-control" placeholder="请输入查询关键词" onChange={(e) => {onSearch(e,url,limit,offset)}}/>*/}
                        </div>
                    </div>
                    <div className="tu-table-toolbar-right">
                        <div className="tu-table-export">
                            {
                                exportTypes && exportTypes.map((et,index) => {
                                    return <button key={et} className="btn btn-default" onClick={(e) => { onExport(et,dataSource,e)}}>{et}</button>
                                })
                            }
                        </div>
                        <TutablePluginFilter columns={columns} filterColumnsShow={this.filterColumnsShow} showNo={showNo}/>
                    </div>
                </div>
                <div className="tu-table-stickyContainer">
                    {this.genStickyHeader()}
                    <div className="tu-table-container" style={{height:height}}>
                        <table className="table table-bordered table-responsive" style={sticky ? {position:'relative'} : {position: 'inherit'}}>
                            <colgroup>
                                <col style={{width:80}}/>
                                <col />
                            </colgroup>
                            {this.traverseChildrens()}
                        </table>
                    </div>
                </div>
                <div className="tu-table-footer">
                    <Tupagination onChange={this.changeOffset} offset={this.state.offset} pages={pages}/>
                </div>
            </div>
        );
    }
}

export default Tutable;