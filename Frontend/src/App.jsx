import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/UserWebApp/Dashboard/Dashboard";
import AddResource from "./pages/UserWebApp/Resources/AddResource";
import Rediscovery from "./pages/UserWebApp/Rediscovery/Rediscovery";
import Library from "./pages/UserWebApp/Library/Library";
import Collections from "./pages/UserWebApp/Collections/Collections";
import CollectionDetail from "./pages/UserWebApp/Collections/CollectionDetail";
import Insights from "./pages/UserWebApp/Insights/Insights";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-resource" element={<AddResource />} />
      <Route path="/rediscovery" element={<Rediscovery />} />
      <Route path="/library" element={<Library />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:id" element={<CollectionDetail />} />
      <Route path="/insights" element={<Insights />} />
    </Routes>
  );
}

export default App;
