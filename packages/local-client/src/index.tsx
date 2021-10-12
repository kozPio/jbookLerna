import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  ReactDOM  from "react-dom";
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
import CacheBuster from 'react-cache-buster';
import { version } from '../package.json';
import Loading from '../src/components/loading';


const App = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction} 
      isVerboseMode={false} 
      loadingComponent={<Loading />} 
    >

      <Provider store={store}>
          <div>
            <CellList  />
          </div>
        </Provider>

    </CacheBuster>);
  
};




ReactDOM.render(
  <App />,
  document.querySelector('#root')
);