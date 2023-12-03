import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import HomeGuest from "./HomeGuest";
import InstitutionHome from "./InstitutionHome";
import SearchResults from "./SearchResults";
import RecordPage from "./RecordPage";
import AllFonds from "./AllFonds";
import AllRecords from "./AllRecords";
import FondsPage from "./FondsPage";
import RelatedRecords from "./RelatedRecords";
import UploadRecord from "./UploadRecord";
import RelatedRecordById from "./RelatedRecordById";
import UploadFonds from "./UploadFonds";
import AllFondsLoggedIn from "./AllFondsLoggedIn";
import AllRecordsLoggedIn from "./AllRecordsLoggedIn";
import FondsPageLoggedIn from "./FondsPageLoggedIn";
import RecordPageLoggedIn from "./RecordPageLoggedIn";
import SavedItems from './SavedItems';
import InstitutionSearchResults from './InstitutionSearchResults';
import AllInstitutions from "./AllInstitutions";
import GuestInstitutionHome from "./GuestInstitutionHome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//create folders per Route 

const App = () => {
    return (
        <React.Fragment>
            <GlobalStyles/>
            <Router>
            <ToastContainer/>
            <Header/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/institutions" element={< AllInstitutions/>}/>
                    <Route path="/institutions/:institutionName" element={ <GuestInstitutionHome/>} />
                    <Route path="/:institutionName/upload-record" element={<UploadRecord/>}/>
                    <Route path="/:institutionName/upload-fonds" element={<UploadFonds/>}/>
                    <Route path="/" element={<HomeGuest/>}/> 
                    <Route path="/:institutionName" element={<InstitutionHome />}/>
                    <Route path="/:institutionName/search-results/:query" element={< InstitutionSearchResults/>}/>
                    <Route path="/:institutionName/fonds" element={<AllFondsLoggedIn/>}/> 
                    <Route path="/:institutionName/records" element={<AllRecordsLoggedIn/>}/>
                    <Route path="/:institutionName/fonds/:fondsName" element={<FondsPageLoggedIn/>}/>
                    <Route path="/:institutionName/records/:recordId" element={<RecordPageLoggedIn/>}/>
                    <Route path="/search-results/:query" element={< SearchResults/>}/>
                    <Route path="/fonds" element={< AllFonds/>}/>
                    <Route path="/fonds/:fondsName" element={< FondsPage/>}/>
                    <Route path="/records" element={<AllRecords/>}/>
                    <Route path="/records/:recordId" element={<RecordPage/>}/>
                    <Route path="/related-records/:fondsId" element={<RelatedRecords/>}/>
                    <Route path="/related-records/:fondsId/:recordId" element={ <RelatedRecordById/>}/>
                    <Route path="/saved-items" element={<SavedItems/>}/>
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App;