import { useContext, useState } from 'react';
import './App.css';
import Alert from './components/common/Alert';
import Spinner from './components/common/Spinner';
import ReactRoutes from './components/ReactRoutes';
import UserContext from './context/user/UesrContext';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type, msgType) => {
    setAlert({ type: type, msg: message, msgType: msgType });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const context = useContext(UserContext);
  const { spinner } = context;

  return (
    <div className='App'>
      <Alert alert={alert} />
      <div className='row'>
        <ReactRoutes showAlert={showAlert} />
      </div>
      {spinner && <Spinner />}
    </div>
  );
}

export default App;
