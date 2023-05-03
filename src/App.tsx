import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppRouter from './AppRouter';

function App() {

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
