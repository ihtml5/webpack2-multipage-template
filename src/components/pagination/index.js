import React, { Component } from 'react';

class Tupagination extends Component {
    hightSelect(offset,index) {
        return offset+1 === index ? {backgroundColor:'#333',color:'#fff'}: undefined;
    }
    genPagination(offset,pages) {
        let pageArr = [];
        const pageLen = pages;
        while(pages>0) {
            pageArr.push(1);
            --pages;
        }
        let paginationLis = pageArr.map((v,index) => {
            // if (pageLen>5 && index>=3) {
            //     return undefined;
            // } 
            return <li key={index+1} style={this.hightSelect(offset,index+1)}>{index+1}</li>
        });
        if (pageLen>0) {
            paginationLis.unshift(<li key='paginationprevaskey' className="tu-pagination-prev" style={this.hightSelect(offset)}>{`<<`}</li>);
            paginationLis.push(<li key='paginationnextaskey' className="tu-pagination-next" style={this.hightSelect(offset)}>{`>>`}</li>);
        }
        console.info(paginationLis,pageLen);
        return paginationLis;
    }
    render() {
        const { onChange,offset,pages } = this.props;
        return (
            <ul className="tu-pagination" onClick={(e) => {onChange(e)}}>
                {this.genPagination(offset,pages)}
            </ul>
        );
    }
}


export default Tupagination;