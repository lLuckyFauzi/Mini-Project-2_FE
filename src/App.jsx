import "./App.scss";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import Detail from "./pages/detail/Index";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Profil from "./pages/profil/Profil";
import { Routes, Route } from "react-router-dom";
import TvSeries from "./pages/TvSeries/TvSeries";
import MyList from "./pages/mylist/MyList";
import Reviewed from "./pages/reviewed/Reviewed";
import Animation from "./pages/animation/Animation";
import Notify from "./components/Notify/Notify";
import Backup from "./pages/Backup/Backup";

const App = () => {
  return (
    <div className="App">
      <Notify />
      <Routes>
        <Route path="*" element={<Backup />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/detail/:allmovie" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/tvseries" element={<TvSeries />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/reviewed" element={<Reviewed />} />
        <Route path="/animation" element={<Animation />} />
      </Routes>
    </div>
  );
};

export default App;
