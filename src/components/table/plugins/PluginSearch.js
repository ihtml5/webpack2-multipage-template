import React, { Component,Children,cloneElement } from 'react';
class TutablePluginSearch extends Component {
    traverseChildrens() {
        const { children,onSearch } = this.props;
        const extraAttrs = {onSearch};
        return Children.map(children,(child,index) => {
            return cloneElement(child,Object.assign({},child.props,extraAttrs),child.props.children);
        });
    }
    render() {
        return (
            <div className="tu-table-extraInfo">
                {this.traverseChildrens()}
            </div>
        );
    }
}

export default TutablePluginSearch;