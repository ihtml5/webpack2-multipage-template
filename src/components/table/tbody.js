import React, { Component } from 'react';
import { isArray } from '../../utils';
import Tuloading from '../loading';

class Tutbody extends Component {
    isNoEditor(idx,index,cnt) {
        const { editor: {col,row} } = this.props;
        console.log(idx,index,typeof idx,typeof index);
        console.log(col,row);
        if (col === idx && row === index) {
            return <input type='text' placeholder='请输入' className="form-control" defaultValue={cnt}/>;
        }
        return <span>{cnt}</span>
    }
    genRows() {
        const {columns,dataSource,selectMode,selectRows,showNo,loading,showEditor} = this.props;
        let colLen = columns.length;
        if (loading) {
            return <tr><td colSpan={colLen}><Tuloading/></td></tr>
        }
        if (dataSource && isArray(dataSource) && dataSource.length>0) {
            return dataSource.map((dt,index) => {
                return (
                    <tr key={dt['key']}>
                        { selectMode ? <td data-rowindex={index}><input type="checkbox" checked={dt['checked']} onChange={ (e) => {selectRows(e,index);}}/></td> : null }
                        { showNo ? 
                         <td key='tbodynumberaskey' data-rowindex={index}>{Number(index+1)}</td>
                         : null}
                        { columns.map((c,idx) => { 
                            if (c['visible']) {
                                let idxasparams = showNo ? idx+2 : idx+1
                                return <td data-rowindex={index} key={c['key']} onDoubleClick={(e) => {showEditor(e)}}>{this.isNoEditor(idxasparams,index,dt[c['key']])}</td>
                            }
                            return undefined;
                        })}
                    </tr>
                )
            });
        }
        return undefined;
    }
    render() {
        return (
            <tbody>
                {this.genRows()}
            </tbody>
        );
    }
}

export default Tutbody;