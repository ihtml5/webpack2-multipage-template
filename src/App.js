import React, { Component } from 'react';
import Tutable from './components/table/index';
import Tutbody from './components/table/tbody';
import Tuthead from './components/table/thead';
import 'babel-polyfill';
// import TutablePluginMulti from './components/table/plugins/PluginMulti';
// import TutablePluginSearch from './components/table/plugins/PluginSearch';
import { tableCfg } from './config';
// const { onSearch,onCheckAll,onCheck,onExport,limit,offset,url,exportTypes,onPageChange } = tableCfg;
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<TutablePluginSearch onSearch={onSearch}>
          <TutablePluginMulti onCheckAll={onCheckAll} onCheck={onCheck}>*/}
            <Tutable multi sticky filter {...tableCfg}>
              <Tuthead/>
              <Tutbody/>
            </Tutable>
          {/*</TutablePluginMulti>
        </TutablePluginSearch>*/}
      </div>
    );
  }
}

export default App;