import React, { Component } from 'react';
import Tutable from './components/table/index';
import Tutbody from './components/table/tbody';
import Tuthead from './components/table/thead';
import 'babel-polyfill';
import './App.css';
// import TutablePluginMulti from './components/table/plugins/PluginMulti';
// import TutablePluginSearch from './components/table/plugins/PluginSearch';
import logo from './logo.svg';
import { tableCfg } from './config';
import Tumenu from './components/menu';
import {console} from './utils';
import apiService from './services';

console.log = () => {};
// const { onSearch,onCheckAll,onCheck,onExport,limit,offset,url,exportTypes,onPageChange } = tableCfg;
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<TutablePluginSearch onSearch={onSearch}>
          <TutablePluginMulti onCheckAll={onCheckAll} onCheck={onCheck}>*/}
            <div className="App-header">
              <img src={logo} className="App-logo" alt="a simple fe workflow"/>
              <h1 className="tupack-name">Tupack</h1>
              <p className="tupack-des">
                <a href="http://www.github.com/tujs/tupack" target="_blank" title="a simple fe workflow">a simple fe workflow</a>
              </p>
            </div>
            <div className="App-main">
              <div className="App-sidebar">
                <Tumenu/>
              </div>
              <div className="App-content">
                <Tutable multi sticky filter {...tableCfg} apiService={apiService}>
                  <Tuthead/>
                  <Tutbody/>
                </Tutable>
              </div>
            </div>
          {/*</TutablePluginMulti>
        </TutablePluginSearch>*/}
      </div>
    );
  }
}

export default App;