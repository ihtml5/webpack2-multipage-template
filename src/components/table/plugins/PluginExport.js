import React, { Component,Children,cloneElement } from 'react';
class TutablePluginExport extends Component {
    traverseChildrens() {
        const { children,onSearch } = this.props;
        const extraAttrs = {onSearch};
        return Children.map(children,(child,index) => {
            return cloneElement(child,Object.assign({},child.props,extraAttrs),child.props.children);
        });
    }
    render() {
        return (
            <div className="tu-table-search">
                {this.traverseChildrens()}
            </div>
        );
    }
}

export default TutablePluginExport;