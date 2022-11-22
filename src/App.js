import Account from "./components/Pages/Account";
import Home from "./components/Pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./components/Pages/SignUp";
import SignIn from "./components/Pages/SignIn";
import TopNavBar from "./components/TopNavBar";
import { Routes, Route } from 'react-router-dom'
import BlogDetail from "./components/Pages/BlogDetail";
import Discover from "./components/Pages/Discover";
import { BlogContextProvider } from "./context/BlogContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BlogContextProvider>
          <TopNavBar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/Discover" element={<Discover />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/BlogDetail/:id" element={<BlogDetail />} />

          </Routes>
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
