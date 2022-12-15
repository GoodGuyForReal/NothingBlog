import Account from "./components/Pages/Account";
import Home from "./components/Pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./components/Pages/SignUp";
import SignIn from "./components/Pages/SignIn";
import { Routes, Route } from 'react-router-dom'
import BlogDetail from "./components/Pages/BlogDetail";
import Discover from "./components/Pages/Discover";
import { BlogContextProvider } from "./context/BlogContext";
import CreatePage from "./components/Pages/CreatePage";
import PersonProfile from "./components/Pages/Person";
import Error from "./components/Pages/Error";
import Nawbar from "./components/Nawbar";
import ProtectedRoute from "./context/ProtectedRoute";
import ScrollToTop from "./ScrollToTop";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BlogContextProvider>
          <Nawbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/Discover" element={
              <ProtectedRoute>
                <Discover />
              </ProtectedRoute>
            } />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            <Route path="/PersonProfile/:id" element={<PersonProfile />} />
            <Route path="/CreatePage" element={<CreatePage />} />
            <Route path="/BlogDetail/:id" element={<BlogDetail />} />
          </Routes>
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
