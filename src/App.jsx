import React from 'react'
import Home from './pages/Home/Home'
import {BrowserRouter as Router ,Route,Routes,Navigate} from 'react-router-dom'
import Navbar from './components/Shared/Navbar/Navbar'
import Authenticate from './pages/Authenticate/Authenticate'
import Activate from './pages/Activate/Activate'
import Rooms from './Rooms/Rooms'
import {useSelector} from 'react-redux'
import Room from './pages/Room/Room'
import socketInit from './socket/index'
// const isAuth = true
// const user = {
//   activated:true
// }
// const isAuth = localStorage.getItem('isAuth')
//  const user = localStorage.getItem('user')
// console.log(user,isAuth)
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
        < Route path="/room/:roomId" element={<Room />} />

        <Route
            path="/"
            element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            } />
             <Route
            path="/activate"
            element={
              <SemiProtected>
                <Activate />
              </SemiProtected>
            } />
                 <Route
            path="/rooms"
            element={
              <Protected>
                <Rooms />
              </Protected>
            } />
                  <Route
            path="/room/:id"
            element={
              <Protected>
                <Room />
              </Protected>
            } />
          <Route path='/authenticate' element={<Authenticate />} />

        </Routes>
      </Router>
      
    </div>
  )
}

const GuestRoute = ({ children }) => {
  // const {isAuth} = useSelector((state)=>state.auth)
  const authdata = localStorage.getItem('isAuth')
  let isAuth;
  if(authdata){
    isAuth = JSON.parse(authdata)

  } 
  return isAuth ? (
    <Navigate to="/rooms" replace />
  ) : (
    children
  );
};





const SemiProtected = ({ children }) => {
  // const {user} = useSelector((state)=>state.auth)
  // const {isAuth} = useSelector((state)=>state.auth)
  const authdata = localStorage.getItem('isAuth')
  let isAuth
  if(authdata){
    isAuth = JSON.parse(authdata)

  } 

const storeData = localStorage.getItem('user')
let user;
console.log(user)
if(storeData)
{
  user = JSON.parse(storeData)
}
console.log(!user.activated)
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.activated  ? (
    children
  ) : (
    <Navigate to="/rooms" replace />
  );
};

//---------


















const Protected = ({children})=>{
  // const {isAuth} = useSelector((state)=>state.auth)

  const authdata = localStorage.getItem('isAuth')
  let isAuth
  if(authdata){
    isAuth = JSON.parse(authdata)

  }  
  console.log(isAuth)
  const storeData = localStorage.getItem('user')
  let user;
  if(storeData)
  {
    user = JSON.parse(storeData)
  }

  return !isAuth ?(
    <Navigate to='/' replace />
    
  ): isAuth && !user.activated ?(
    <Navigate to='/activate' replace />
  ):
  children
}

export default App