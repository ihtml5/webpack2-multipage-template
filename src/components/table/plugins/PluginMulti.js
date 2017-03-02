import React, { Component,Children,cloneElement } from 'react';
class TutablePluginMulti extends Component {
    traverseChildrens() {
        const { children } = this.props;
        return Children.map(children,(child,index) => {
            return cloneElement(child,Object.assign({},child.props,{...this.props}),child.props.children);
        });
    }
    render() {
        return (
            <div className="tu-table-multi">
                {this.traverseChildrens()}
            </div>
        );
    }
}

export default TutablePluginMulti;