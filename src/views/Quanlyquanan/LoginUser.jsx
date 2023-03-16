import CIcon from '@coreui/icons-react'
import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

export default function LoginUser() {
    let navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // const serverLogin =()=>{
    //     axios.post('https://63c3d2dba9085635752cdd01.mockapi.io/login', { username, password })
    //     .then(response => {
    //       // handle successful login, e.g. set user session, navigate to homepage
    //       navigate("/views/Quanlyquanan/Sales")
    //     })
    //     .catch(error => {
    //       // handle failed login, e.g. display error message
    //       alert("Sai mặt Khẩu")
    //       console.log("mặt khẩu sai");
    //     });
    // }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        const response = await fetch('https://63c3d2dba9085635752cdd01.mockapi.io/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (response.ok) {
          // handle successful login
          navigate("/views/Quanlyquanan/Sales")
        } else {
          // handle failed login
          alert("Sai mặt khẩu")
        }
    }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm  onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" name='username' onChange={e=>setUserName(e.target.value)} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name='password'
                        onChange={e=>setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      </div>
  )
}
