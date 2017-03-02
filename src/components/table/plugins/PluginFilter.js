import React, { Component } from 'react';
import '../tutable.css';
class TutablePluginFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilterList: false
        }
        this.showFilter = this.showFilter.bind(this);
    }
    showFilter() {
        this.setState({
            showFilterList:!this.state.showFilterList
        });
    }
    render() {
        const { columns,filterColumnsShow,showNo } = this.props;
        let filterListStyle = this.state.showFilterList ? {display: 'inline-block'} : {display: 'none'};
        return (
            <div className="tu-table-filter">
                <button className="btn btn-default tu-table-triggerFilter" onClick={this.showFilter}><i className="fa fa-filter"></i>过滤列</button>
                <ul style={filterListStyle} className="tu-table-filterContainer">
                    <li key='tableFilterasKey'><input type="checkbox" checked={showNo} onChange={(e) => {filterColumnsShow(e,-1)}}/><span className="tu-table-columnTitle">序号</span></li>
                    { columns.map((c,index) => {
                        return <li key={c['key']}><input type="checkbox" checked={c['visible']} onChange={(e) => {filterColumnsShow(e,index)}}/><span className="tu-table-columnTitle">{c['title']}</span></li>
                    })}
                </ul>
            </div>
        );
    }
}

export default TutablePluginFilter;