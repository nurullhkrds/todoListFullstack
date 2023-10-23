import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './components/Navbar';
import Content from './components/Content';
import { Button } from 'antd';

function App() {


   

  return (
    <div className="App">
      <Navbar/>

      <Content/>
     
    </div>
  );
}

export default App;
