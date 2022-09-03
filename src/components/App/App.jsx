import './App.css';
import {Route,Routes} from 'react-router-dom';

import NotFound from '../NotFound/NotFound';
import TopBar from '../TopBar/TopBar'
import Main from '../Main/Main'
import WrapperUser from '../WrapperUser/WrapperUser';
import WrapperCar from '../WrapperCar/WrapperCar';
import WrapperMetric from '../WrapperMetric/WrapperMetric';
import End from '../End/End';

function App() {
  return (
    <div className="App">
    {/* Routes */}
    <Routes>
      <Route path='/' element={<><TopBar /><Main /></>}>
        <Route path='users' element={<WrapperUser/>}/>
        <Route path='cars' element={<WrapperCar/>}/>
        <Route path='metrics/:lastOp' element={<WrapperMetric/>}/>
        <Route path='end' element={<End/>}/>
        <Route path="*" exact={true} element={<NotFound />}/>
      </Route>
      <Route path="*" exact={true} element={<NotFound />}/>
    </Routes>

      
      
    </div>
  );
}

export default App;
