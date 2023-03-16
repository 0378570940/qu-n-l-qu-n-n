import React, { useEffect, useState } from 'react'
import { CButton, CCardImage, CContainer, CForm, CFormInput, CImage, CModal, CModalFooter, CModalHeader, CModalTitle, CNavbar, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash } from '@coreui/icons'
import MangaAPI from 'src/API/MangaAPI'
import { uploadImage } from 'src/commons/uploadImage'

export default function Manga() {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [manga, setManga] = useState([]);
    const [seachText, setSeachText] = useState("")
    const [mangaList, setMangaList] = useState(
        {
            name: "",
            code: "",
            author: "",
            year: "",
            content: ""
        }
    )
    const [currentManga, setCurrentManga] = useState()

    const [file, setFile] = useState()
    const [preview, setPreview] = useState('')


    useEffect(() => {
        setPreview('')
        setFile()
        setCurrentManga()
    }, [])

    // hiện thị danh sách truyện
    const getManga = async () => {
        const results = await MangaAPI.getAll()
        console.log(results);
        setManga(results.data)

    }
    useEffect(() => {
        getManga()
    }, [])

    //xóa sản phẩm theo id
    const deleteManga = async (id) => {
        await MangaAPI.delete(id).then(
            async () => getManga()
        )
    }

    //thêm sản phẩm
    const ChangeValue = (event) => {
        setMangaList({
            ...mangaList, [event.target.name]: event.target.value
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
            const result = await MangaAPI.update(sending)
            setManga(result.data)
        } else {
            if (!file) {
                alert("Vui long chon anh")
                return;
            }
            //validate
            const image = await uploadImage(file);
            console.log(image)
            await MangaAPI.create({ ...mangaList, img: image }).then(
                async () => getManga())
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
        const kq = manga.filter(item => item.name.toLowerCase().includes(seachText.toLocaleLowerCase()))
        setManga(kq)
    }
    console.log('update', visibleUpdate);
    return (
        <>
            <CNavbar colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CButton onClick={() => setVisible(!visible)}>Thêm mới</CButton>
                    <CForm onSubmit={handleSearch} className="d-flex">
                        <CFormInput type="search" value={seachText} onChange={seachChang} className="me-2" placeholder="Search" />
                        {/* <CButton type="submit" color="success" variant="outline">
                            Search
                        </CButton> */}
                    </CForm>
                </CContainer>
            </CNavbar>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>thêm danh sách Truyện</CModalTitle>
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
                    <CFormInput type="text" name='name' value={mangaList.name} onChange={ChangeValue} id="mangaName" label="Tên truyện" placeholder="Nhập tên truyện" />
                    <CFormInput type="number" name='code' value={mangaList.code} onChange={ChangeValue} id="mangaCode" label="Mã truyện" placeholder="Nhập mã truyện" />
                    <CFormInput type="text" name='author' value={mangaList.author} onChange={ChangeValue} id="mangaCode" label="Tên xuất bản" placeholder="Nhập Tên xuất bản" />
                    <CFormInput type="data" name='year' value={mangaList.year} onChange={ChangeValue} id="mangaYear" label="Năm sản xuất" placeholder="Nhập Năm sản xuất" />
                    <CFormInput type="text" name='content' value={mangaList.content} onChange={ChangeValue} id="mangaContent" label="Nội dung" placeholder="Nhập Nội dung" />
                </CForm>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={createList}>Save changes</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={visibleUpdate} onClose={() => setVisibleUpdate(false)}>
                <CModalHeader onClose={() => setVisibleUpdate(false)}>
                    <CModalTitle>Cập nhật danh sách Truyện</CModalTitle>
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
                    <CFormInput type="text" name='name' value={currentManga?.name} onChange={ChangeValueUpdate} id="mangaName" label="Tên truyện" placeholder="Nhập tên truyện" />
                    <CFormInput type="number" name='code' value={currentManga?.code} onChange={ChangeValueUpdate} id="mangaCode" label="Mã truyện" placeholder="Nhập mã truyện" />
                    <CFormInput type="text" name='author' value={currentManga?.author} onChange={ChangeValueUpdate} id="mangaCode" label="Tên xuất bản" placeholder="Nhập Tên xuất bản" />
                    <CFormInput type="data" name='year' value={currentManga?.year} onChange={ChangeValueUpdate} id="mangaYear" label="Năm sản xuất" placeholder="Nhập Năm sản xuất" />
                    <CFormInput type="text" name='content' value={currentManga?.content} onChange={ChangeValueUpdate} id="mangaContent" label="Nội dung" placeholder="Nhập Nội dung" />
                </CForm>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleUpdate(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={createList}>Save changes</CButton>
                </CModalFooter>
            </CModal>
            <CTable color="dark" hover>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ảnh</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tên truyện</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Mã sách</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Nhà xuất bản</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Năm sản suất</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Nội dung</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {

                        manga.map((item, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                    <CTableDataCell><CCardImage orientation="top" src={item.img} style={{ width: '30px' }} /></CTableDataCell>
                                    <CTableDataCell>{item.name}</CTableDataCell>
                                    <CTableDataCell>{item.code}</CTableDataCell>
                                    <CTableDataCell>{item.author}</CTableDataCell>
                                    <CTableDataCell>{item.year}</CTableDataCell>
                                    <CTableDataCell>{item.content}</CTableDataCell>
                                    <CTableDataCell>
                                        <CIcon icon={cilPen} size="x" onClick={() => {
                                            setCurrentManga(item)
                                            setVisibleUpdate(true)
                                        }} />
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
