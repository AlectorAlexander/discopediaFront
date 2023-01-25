/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from 'react-router';
import './App.css';
import Store from './pages/Store';
import DiscDetails from './pages/DiscsDetails';
import Cart from './pages/Cart';
import MinhaEstante from './pages/MinhaEstante';
import Home from './pages/Home';
import AdminProducts from './pages/AdminDisc';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />}> </Route>
                <Route path="/store" element={<Store />}> </Route>
                <Route path="/admin/store" element={<AdminProducts />}> </Route>
                <Route path="/store/details/:id" element={<DiscDetails />}> </Route>
                <Route path="/cart" element={<Cart />}> </Route>
                <Route path="/discase" element={<MinhaEstante />}> </Route>
            </Routes>
        </div>
    );
}

export default App;
