import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CContainer, CForm, CFormInput, CFormSwitch, CModal, CModalFooter, CModalHeader, CModalTitle, CNavbar, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import CategoryAPI from 'src/API/CategoryAPI';
import getDate from 'src/commons/getDate';

export default function Category() {
    const [visible, setVisible] = useState(false);
    const [category, setCategory] = useState([]);
    const [seachText, setSeachText] = useState("");
    const [categoryList, setCategoryList] = useState(
        {
            category: "",

        }
    )

    //hiện thị sản phẩm 
    const getCategory = async () => {
        const result = await CategoryAPI.getAll()
        setCategory(result.data)
        console.log(result);
    }
    useEffect(() => {
        getCategory()
    }, [])

    //xóa sản phẩm theo id
    const deleteCategory = async (id) => {
        await CategoryAPI.delete(id).then(
            async () => getCategory()
        )
    }

    //thêm sản phẩm
    const ChangeValue = (event) => {
        setCategoryList({
            ...categoryList, [event.target.name]: event.target.value
        })
    }
    const createList = async () => {
        if (categoryList.id) {
            const result = await CategoryAPI.update(categoryList)
            setCategory(result.data)

        } else {
            await CategoryAPI.create({ ...categoryList, createdAt: getDate(), updatedAt: getDate() }).then(
                async () => getCategory())
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
        const kq = category.filter(item => item.name.toLowerCase().includes(seachText.toLocaleLowerCase()))
        setCategory(kq)
    }


    console.log(Date.now());



    // document.getElementById('DATE').value = formattedToday;

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
                    <CModalTitle>thêm danh thể loại</CModalTitle>
                </CModalHeader>
                <CForm>
                    <CFormInput type="text" name='category' value={categoryList.category} onChange={ChangeValue} id="userAccount" label="thể loại" placeholder="Nhập thể loại" />
                    {/* <CFormInput type="" name='createdAt' value={categoryList.createdAt} onChange={ChangeValue} id="userPassword" label="ngày phát hành" placeholder="Nhập ngày phát hành" />
                    <CFormInput type="" name='updatedAt' value={categoryList.updatedAt} onChange={ChangeValue} id="userPassword" label="ngày phát hành" placeholder="Nhập ngày phát hành" /> */}
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
                        <CTableHeaderCell scope="col">Tên thể loại</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ngày tạo </CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ngày cập nhật</CTableHeaderCell>
                        <CTableHeaderCell scope="col">hoạt động</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        category.map((item, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                    <CTableDataCell>{item.category}</CTableDataCell>
                                    <CTableDataCell>{item.createdAt}</CTableDataCell>
                                    <CTableDataCell>{item.updatedAt}</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormSwitch size="lg" id="formSwitchCheckDefaultLg" />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CIcon icon={cilTrash} size="x" onClick={() => deleteCategory(item.id)} />
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
