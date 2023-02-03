import './App.css';
import ContextProvider from './context';
import Main from './components/SmartComponents/Main';

const App = () => {


  return (
    <ContextProvider>
      <Main />
    </ContextProvider>
  );
}

export default App;
