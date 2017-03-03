import React, { Component } from 'react';
import { isArray } from '../../utils';
import './tutable.css';
class Tuthead extends Component {
    genHeaders() {
        const {columns,selectMode,sortBy,order,showNo,selectAll} = this.props;
        if (columns && isArray(columns) && columns.length>0) {
            let headerThs = columns.map((col,index) => {
                const ascCls = order.value && order.value === 'asc' && order.by === col['key'] ? 'tu-table-sort tu-table-asc-hightLight' : 'tu-table-sort tu-table-asc';
                const descCls = order.value && order.value === 'desc' && order.by === col['key'] ? 'tu-table-sort tu-table-desc-hightLight' : 'tu-table-sort tu-table-desc';
                if (col['visible']) {
                    return (
                        <th key={col['key'] || index}>
                            <span className="tu-table-headerTitle">{col['title']}</span>
                            <div className="tu-table-sortArea">
                                <div className={ascCls} onClick={() => {sortBy('asc',col['key'])}}></div>
                                <div className={descCls} onClick={() => {sortBy('desc',col['key'])}}></div>
                            </div>
                        </th>
                    );
                } else {
                    return undefined;
                }
            });
            showNo && headerThs.unshift(<th key='thnumberaskey'>
                <span className="tu-table-headerTitle">序号</span>
                <div className="tu-table-sortArea">
                </div>
            </th>);
            selectMode === 'multi' && headerThs.unshift(<th key="checkboxaskey"><input type="checkbox" onChange={(e) => {selectAll(e)}}/></th>)
            selectMode === 'single' && headerThs.unshift(<th key="checkboxaskey"></th>)
            return (
                <tr key='traskey'>
                    {headerThs}
                </tr>
            );
        }
        return undefined;
    }
    render() {
        return (
            <thead>
                {this.genHeaders()}
            </thead>
        );
    }
}

export default Tuthead;