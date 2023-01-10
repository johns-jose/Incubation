
import './App.css'
import {Route,Routes} from 'react-router-dom'




import Home from './Pages/HomePage';
import SigninPage from './Pages/SigninPage';
import LoginPage from './Pages/LoginPage'
import ApplicationFormPage from './Pages/applicationForm';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminDashBoardPage from './Pages/AdmindashBoardPage';
import { Context } from './Store/userContext';
import SuccessPage from './Pages/successPage';
import ApprovedListPage from './Pages/ApprovedListPage';
import RejectedListPage from './Pages/rejectedListPage';
import ProgressPage from './Pages/ProgressPage';
import SlotPage from './Pages/SlotPage';
import { ModContext } from './Store/Modalcontext';





function App() {

  return (
    <div>
      <ModContext>
     <Context>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SigninPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/appFormPage" element={<ApplicationFormPage/>} />
          <Route path="/success" element={<SuccessPage/>} />
        </Routes>


        <Routes>
          <Route path="/admin" element={<AdminLoginPage/>} />
          <Route path="/dashboard" element={<AdminDashBoardPage/>} />
          <Route path="/approved"  element={<ApprovedListPage/>}/>
          <Route path="/rejected"  element={<RejectedListPage/>}/>
          <Route path="/progress"  element={<ProgressPage/>}/>
          <Route path="/slot"  element={<SlotPage/>}/>
        </Routes>
      </Context>
      </ModContext>
       
        
       
      
    
    
  
    </div>
  );
}

export default App;
