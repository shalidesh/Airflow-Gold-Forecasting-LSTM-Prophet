import { useContext, useRef } from "react";
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import { Context } from './context/Context';
import News from "./pages/News";


function App() {

  const { user } = useContext(Context);

  console.log(user);

  return (
    <Routes>
        <Route path="/" element={ user ?  <Home /> : <Login /> } />
        <Route path="/news" element={user ? <News />: <Login />} />
    </Routes>
  );
 }

export default App;
