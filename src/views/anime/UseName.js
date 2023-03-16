import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CContainer, CForm, CFormInput, CModal, CModalFooter, CModalHeader, CModalTitle, CNavbar, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import UserAPI from 'src/API/UserAPI'
import getDate from 'src/commons/getDate';

export default function UseName() {
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState([]);
    const [seachText, setSeachText] = useState("");
    const [userList, setUserList] = useState(
        {
            name: "",
            account: "",
            password: "",
            gmail: "",

        }
    )

    //hiện thị sản phẩm 
    const getUser = async () => {
        const result = await UserAPI.getAll()
        setUser(result.data)
    }
    useEffect(() => {
        getUser();
    }, [])

    //xóa sản phẩm theo id
    const deleteManga = async (id) => {
        await UserAPI.delete(id).then(
            async () => getUser()
        )
    }

    //thêm sản phẩm
    const ChangeValue = (event) => {
        setUserList({
            ...userList, [event.target.name]: event.target.value
        })
    }
    const createList = async () => {
        if (userList.id) {
            const result = await UserAPI.update(userList)
            setUser(result.data)
        } else {
            await UserAPI.create({ ...userList, date: getDate(), dateex: getDate(70) }).then(
                async () => getUser())
        }
    }

    //hàm seach tên sản phẩm  
    const seachChang = (event) => {
        setSeachText(event.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (!seachText.trim()) {
            return;
        }
        const kq = user.filter(item => item.name.toLowerCase().includes(seachText.toLocaleLowerCase()))
        setUser(kq)
    }

    return (
        <>
            <CNavbar colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CButton onClick={() => setVisible(!visible)}>Thêm mới</CButton>
                    <CForm onSubmit={handleSearch} className="d-flex">
                        <CFormInput type="search" value={seachText} onChange={seachChang} className="me-2" placeholder="Search" />
                    </CForm>
                </CContainer>
            </CNavbar>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>thêm danh sách Truyện</CModalTitle>
                </CModalHeader>
                <CForm>
                    <CFormInput type="text" name='name' value={userList.name} onChange={ChangeValue} id="userName" label="Tên người dùng" placeholder="Nhập tên người dùng" />
                    <CFormInput type="text" name='account' value={userList.account} onChange={ChangeValue} id="userAccount" label="Tài khoản" placeholder="Nhập tài khoản" />
                    <CFormInput type="password" name='password' value={userList.password} onChange={ChangeValue} id="userPassword" label="Password" placeholder="Nhập password" />
                    <CFormInput type="gmail" name='gmail' value={userList.gmail} onChange={ChangeValue} id="userGmail" label="Gamil" placeholder="Nhập Gamil" />
                    {/* <CFormInput type="data" name='date' value={userList.date} onChange={ChangeValue} id="userDate" label="Ngày đăng ký" placeholder="Nhập ngày đăng ký" />
                    <CFormInput type="data" name='dateex' value={userList.dateex} onChange={ChangeValue} id="userDateex" label="Ngày hêt hạn" placeholder="Nhập ngày hêt hạn" /> */}
                </CForm>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={createList}>Save changes</CButton>
                </CModalFooter>
            </CModal>
            <CTable color="dark" hover>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tên người dùng</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tài khoản</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Mật khẩu</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Gmail</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ngày đăng ký</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ngày hết hạn</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        user.map((item, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                    <CTableDataCell>{item.name}</CTableDataCell>
                                    <CTableDataCell>{item.account}</CTableDataCell>
                                    <CTableDataCell>{item.password}</CTableDataCell>
                                    <CTableDataCell>{item.gmail}</CTableDataCell>
                                    <CTableDataCell>{item.date}</CTableDataCell>
                                    <CTableDataCell>{item.dateex}</CTableDataCell>
                                    <CTableDataCell>
                                        <CIcon icon={cilTrash} size="x" onClick={() => deleteManga(item.id)} />
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    }
                </CTableBody>
            </CTable>
        </>
    )
}
