import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../src/maincss/Style.css";
import "../src/maincss/faiz.css";
import "../src/maincss/ahsan.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/maincss/responsive.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/animate.min.css";
import "../src/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../src/assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Subscriber from "./views/Subscriber";
import Packages from "./views/Packages";
import Addsubscriber from "./views/Addsubscriber";
import Editsubscriber from "./views/Editsubscriber";
import Dashboard from "./views/Dashboard";
import AddPackage from "./views/AddPackages";
import SimplePage from "./views/SimplePage";
import PoolnestRevenue from "./views/PoolnestRevenue";
import EditPackage from "./views/EditPackages";
import Loginpage from "./views/Loginpage";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
// import ShoppingList from "./views/ShoppingList";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Loginpage />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/subscriber" element={<Subscriber />} />
          <Route exact path="/add-subscriber" element={<Addsubscriber />} />
          <Route exact path="/edit-subscriber" element={<Editsubscriber />} />
          <Route exact path="/packages" element={<Packages />} />
          <Route exact path="/add-package" element={<AddPackage />} />
          <Route exact path="/edit-package" element={<EditPackage />} />

          {/* All New Pages Routes Simple */}

          <Route exact path="/Communication" element={<SimplePage />} />
          <Route exact path="/ProductUsage" element={<SimplePage />} />
          <Route exact path="/CustomerSupport" element={<SimplePage />} />
          <Route exact path="/Feedback" element={<SimplePage />} />
          <Route exact path="/SalesConversion" element={<SimplePage />} />
          <Route exact path="/MarketingMetrics" element={<SimplePage />} />
          <Route exact path="/SystemHealth" element={<SimplePage />} />
          <Route exact path="/Settings" element={<SimplePage />} />
          <Route exact path="/UserRevenue" element={<SimplePage />} />
          <Route exact path="/FinancialMetrics" element={<SimplePage />} />
          <Route exact path="/PoolNestRevenue" element={<PoolnestRevenue />} />


        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);