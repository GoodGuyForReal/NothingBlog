import Account from "./components/Pages/Account";
import Home from "./components/Pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./components/Pages/SignUp";
import SignIn from "./components/Pages/SignIn";
import TopNavBar from "./components/TopNavBar";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>

        <TopNavBar />
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Account" element={<Account />} />

        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
