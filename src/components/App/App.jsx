import './App.css';
import {Route,Routes} from 'react-router-dom';

import NotFound from '../NotFound/NotFound';
import TopBar from '../TopBar/TopBar'
import Main from '../Main/Main'
import MetricTop from '../MetricTop/MetricTop';
import MetricBtm from '../MetricBtm/MetricBtm';
import WrapperUser from '../WrapperUser/WrapperUser';
import WrapperCar from '../WrapperCar/WrapperCar';
import WrapperMetric from '../WrapperMetric/WrapperMetric';

function App() {
  return (
    <div className="App">
    {/* Routes */}
    <Routes>
      <Route path='/' element={<><TopBar /><Main /></>}>
        <Route path='users' element={<WrapperUser/>}/>
        <Route path='cars' element={<WrapperCar/>}/>
        <Route path='metrics/:last' element={<WrapperMetric/>}/>
        <Route path="*" element={<NotFound />}/>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>

      
      
    </div>
  );
}

export default App;
