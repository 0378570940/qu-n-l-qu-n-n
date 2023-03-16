import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CContainer, CForm, CFormInput, CImage, CModal, CModalFooter, CModalHeader, CModalTitle, CNavbar, CRow, CTableDataCell } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import MenuAPI from 'src/API/MenuAPI';
import getDate from 'src/commons/getDate';
import { uploadImage } from 'src/commons/uploadImage'

export default function QuanAn() {
    const [menu, setMenu] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [seachText, setSeachText] = useState("")
    const [menuList, setMenuList] = useState(
        {
            img: "",
            name: "",
            price: 0
        }
    )
    const [currentManga, setCurrentManga] = useState()
    const [file, setFile] = useState()
    const [preview, setPreview] = useState('')

    useEffect(() => {
        setPreview('')
        setFile()
        setCurrentManga()
        setSeachText('')
    }, [])

    //lấy sản phẩm từ api
    const getMunu = async () => {
        const result = await MenuAPI.getAll()
        setMenu(result.data)
        console.log(result);
    }
    useEffect(() => {
        getMunu()
    }, [])

    //xóa sản phảm theo id
    const deleteMenu = async (id) => {
        await MenuAPI.delete(id).then(
            async () => getMunu()
        )
    }

    //thêm sản phẩm
    const ChangeValue = (e) => {
        setMenuList({
            ...menuList, [e.target.name]: e.target.value
        })
    }
    const ChangeValueUpdate = (event) => {
        setCurrentManga({
            ...currentManga, [event.target.name]: event.target.value
        })
    }
    const createList = async () => {
        if (currentManga) {
            const sending = { ...currentManga }
            if (file) {
                const image = await uploadImage(file);
                sending.img = image;
            }
            const result = await MenuAPI.update(sending)
            setMenu(result.data)
        } else {
            if (!file) {
                alert("Vui long chon anh")
                return;
            }
            //validate
            const image = await uploadImage(file);
            console.log(image)
            await MenuAPI.create({ ...menuList, img: image, createal: getDate() }).then(
                async () => getMunu())
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
        const kq = menu.filter(item => item.name.toLowerCase().includes(seachText.toLocaleLowerCase()))
        setMenu(kq)
    }

    return (
        <>
            <CNavbar colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CButton onClick={() => setVisible(!visible)}>Thêm món</CButton>
                    <CForm onSubmit={handleSearch} className="d-flex">
                        <CFormInput type="search" value={seachText} onChange={seachChang} className="m-2" placeholder="Search" />

                    </CForm>
                </CContainer>
            </CNavbar>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>thêm món ăn</CModalTitle>
                </CModalHeader>
                <CForm>
                    {/* add attribute mutiple choose many image */}
                    <CFormInput type="file" onChange={(e) => {
                        const files = e.target.files[0]
                        setFile(files)
                        setPreview(URL.createObjectURL(files))
                    }} id="formFile" label="Default file input example" />
                    {
                        preview && <div style={{ marginTop: 8 }}>
                            <CImage align="center" rounded src={preview} width={200} height={200} />
                        </div>
                    }
                    <CFormInput type="text" name='name' value={menuList.name} onChange={ChangeValue} id="mangaName" label="Nhập tên món" placeholder="Nhập tên truyện" />
                    <CFormInput type="number" name='price' value={menuList.price} onChange={ChangeValue} id="mangaCode" label="Nhập giá tiền" placeholder="Nhập mã truyện" />
                </CForm>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Hủy
                    </CButton>
                    <CButton color="primary" onClick={createList}>Thêm</CButton>
                </CModalFooter>
            </CModal>

            {/*  */}
            <CModal visible={visibleUpdate} onClose={() => setVisibleUpdate(false)}>
                <CModalHeader onClose={() => setVisibleUpdate(false)}>
                    <CModalTitle>Cập nhật món</CModalTitle>
                </CModalHeader>
                <CForm>
                    {/* add attribute mutiple choose many image */}
                    <CFormInput type="file" onChange={(e) => {
                        const files = e.target.files[0]
                        setFile(files)
                        setCurrentManga({ ...currentManga, img: URL.createObjectURL(files) })
                    }} id="formFile" label="Default file input example" />
                    {
                        currentManga?.img && <div style={{ marginTop: 8 }}>
                            <CImage align="center" rounded src={currentManga?.img} width={200} height={200} />
                        </div>
                    }
                    <CFormInput type="text" name='name' value={currentManga?.name} onChange={ChangeValueUpdate} id="mangaName" label="Nhập tên món" placeholder="Nhập tên truyện" />
                    <CFormInput type="number" name='price' value={currentManga?.price} onChange={ChangeValueUpdate} id="mangaCode" label="Nhập giá tiền" placeholder="Nhập mã truyện" />
                </CForm>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleUpdate(false)}>
                        Hủy
                    </CButton>
                    <CButton color="primary" onClick={createList}>Thêm</CButton>
                </CModalFooter>
            </CModal>
            {/*  */}
            <CRow xs={{ cols: 1 }} md={{ cols: 6 }} className="g-4 text-center">
                {
                    menu.map((item, index) => {
                        return (
                            <CCol xs key={index}>
                                <CCard className="h-100 w-100">
                                    <CCardImage orientation="top" className="" style={{ width: 153, height: 100 }} src={item.img} />
                                    <CCardBody>
                                        <CCardTitle>{item.name}</CCardTitle>
                                        <CCardText>$ {item.price}</CCardText>
                                    </CCardBody>
                                    <CTableDataCell className='justify-content-center'>
                                        <CIcon icon={cilPen} size="x"
                                            onClick={() => {
                                                setCurrentManga(item)
                                                setVisibleUpdate(true)
                                            }}
                                        />
                                        <CIcon icon={cilTrash} size="x" onClick={() => deleteMenu(item.id)} />
                                    </CTableDataCell>
                                </CCard>
                            </CCol>
                        )
                    })
                }
            </CRow>
        </>
    )
}
