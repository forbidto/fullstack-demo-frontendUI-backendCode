import '@aws-amplify/ui-react/styles.css'
import './App.css';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import HomePage from './Home/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListingDetailPage from './ListingDetail/ListingDetailPage';
import ChatPage from './Chat/ChatPage';
import PreSellHouseForm from './SellHouseForm/PreSellHouseForm';
import SellHouseForm3 from './SellHouseForm/SellHouseForm3';
import SellHouseSign from './SellHouseForm/SellHouseFormSign';
import Header from './Home/HomeComponents/Header';
import NavBarWithResponsive from './Home/HomeComponents/NavBar_withResponsive';
import Footer from './Home/HomeComponents/Footer';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Form3Pdf from './SellHouseForm/form3PdfGeneration';
import SellHouseFormFill from './SellHouseForm/SellHouseFormFill';
import PendingList from './Admin/PendingList';
import PendingListingDetail from './Admin/PendingListDetail';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MyListingList from './MyListing/MyListingList';
import MyListingDetail from './MyListing/MyListingDetail';
import PreBuyHouseForm from './BuyerForm/PreBuyHouseForm';
import BuyHouseFormInput from './BuyerForm/BuyHouseFormInput';
import BuyHouseForm4 from './BuyerForm/BuyerFormTemplate';

const localToken = sessionStorage.getItem('localToken');

Amplify.configure(config, {
  API: {
    headers: async () => ({
      'Authorization': localToken
    })
  }
});

function App() {

  const authState = useSelector((state) => state.userAuth);

  useEffect(() => {
    console.log("authState:", authState)

  }, [authState.isAuthenticated])

  function PrivateRoute({ element, isAuthenticated }) {
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" replace />
    );
  }


  return (
    <div>
      <BrowserRouter>
        <Header />
        <NavBarWithResponsive />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/listing" element={<ListingDetailPage />}></Route>
          <Route path ="/prebuyhouse" element={<PreBuyHouseForm/>}></Route>
          <Route path ="/buyhouseform" element={<BuyHouseFormInput/>}></Route>
          <Route path = "/buyhouseform4" element={<BuyHouseForm4/>}/>
          <Route path="/chat" element={<ChatPage />}></Route>
          <Route path="/presellhouse" element={<PreSellHouseForm />}></Route>
          <Route path="/sellhouseform" element={<SellHouseFormFill />}></Route>
          <Route path="/sellhouseformsign" element={<SellHouseSign />}></Route>
          <Route path="/form3pdf" element={<Form3Pdf />}></Route>
          <Route path="/mylisting">
            <Route index element={<MyListingList />} />
            <Route path="sellhousef3">
              <Route index element={<SellHouseForm3 />} />
              <Route path="sellhouseformsign" element={<SellHouseSign />} />
            </Route>
            <Route path="detail" element={<MyListingDetail />} />
          </Route>
          <Route path="/admin/pendinglist" element={<PendingList />}></Route>
          <Route path="/admin/pendinglist/detail/:id" element={<PendingListingDetail />}></Route>

          {/* Protected Routes */}

          {/*    <PrivateRoute
  path="/mylisting"
  element={<MyListingList />}
  isAuthenticated={authState.isAuthenticated}
>
  <Route index element={<MyListingList />} />
  <Route path="sellhousef3/:id" element={<SellHouseForm3 />} />
  <Route path="sellhouseformsign" element={<SellHouseSign />} />
  <Route path="detail" element={<MyListingDetail />} />
</PrivateRoute>

 */}

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
