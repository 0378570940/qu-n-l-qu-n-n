import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CContainer, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTableDataCell } from '@coreui/react'
import React, { useEffect, useMemo, useState } from 'react'
import "./Sales.css"
import MenuAPI from 'src/API/MenuAPI'
import { useCart } from "react-use-cart"
import ATM from './img/ATM-removebg-preview.png'
import Momo from './img/momo-removebg-preview.png'
import VP from './img/vietpay-removebg-preview.png'

import { Navigate, useNavigate } from 'react-router-dom'

export default function Sales() {
    let navigate = useNavigate();
    const [sales, setSales] = useState([])
    const { addItem } = useCart()
    const [visible, setVisible] = useState(false);
    const [price, setPrice] = useState('')
    const [total, setTotal] = useState('')
    const [tien, setTien] = useState(0)
    const [timkiem, setTimKiem] = useState([])
    const [seachText, setSeachText] = useState("")

    const getSale = async () => {
        const result = await MenuAPI.getAll()
        setSales(result.data)
    }

    useEffect(() => {
        if (visible === false) {
            setPrice('')
            setTien('')
        }
    }, [visible])

    useEffect(() => {
        getSale()
        setPrice('')

    }, [])

    //lấy từ giỏ hàng
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();
    // if (isEmpty) return <h1 className='text-center'>Your Cart is Empty</h1>

    //tìm kiếm tên món
    const filter = async (type) => {
        setSales(sales.filter((prduct) => prduct.type === type))
    }

    const serverPrine = () => {
        // window.print(Navigate(/views/Quanlyquanan/Bill))
        navigate("/views/Quanlyquanan/Bill")
    }

    //mảng
    const arr = [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000]

    const changePrice = (e) => {
        setPrice(
            e.target.value
        )
    }

    const changeTotal = (e) => {
        setTotal(
            e.target.value
        )
    }

    useEffect(() => {
        if (price)
            setTien(price - cartTotal)
    }, [price])

    // const kq1 = useMemo(() => {
    //     return (price - cartTotal)
    // }, [price])

    //seach theo tên
    const handleSearch = (e) => {
        e.preventDefault();
        if (!seachText.trim()) {
            return;
        }
        const kq = sales.filter(item => item.name.toLowerCase().includes(seachText.toLocaleLowerCase()))
        setSales(kq)
    }

    const logins = () => {
        navigate('/login')
    }


    return (
        <>
            <div className='login'>
                <button onClick={logins}>Login</button>
            </div>
            <div className="row">
                <div className="col-sm-6 card overflow-auto" style={{ height: 500 }}>
                    <ul className="nav nav-tabs  position-fixed z-n1 rounded-3 top-1">
                        <li className="nav-item bg-primary">
                            <a className="nav-link active" aria-current="page" href="#" >Thực Đơn</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => filter("che")}>Chè</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => filter("sua chua")}>Sữa Chua</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => filter("do an")}>Đồ ăn</a>
                        </li>
                        <form onSubmit={handleSearch} className="d-flex mx-5" role="search">
                            <input onChange={e => setSeachText(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" width={50} />
                        </form>
                    </ul>
                    <CRow xs={{ cols: 1 }} md={{ cols: 4 }} className="g-4 mt-4">
                        {
                            sales.map((item, index) => {
                                return (
                                    <button key={index} onClick={() => addItem(item)}>
                                        <CCol xs >
                                            <CCard className="h-100 w-100">
                                                <CCardImage orientation="top" style={{ width: 106, height: 80, }} src={item.img} />
                                                <CCardBody>
                                                    <CCardText>{item.name}</CCardText>
                                                    <CCardText>{item.price} đ</CCardText>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </button>
                                )
                            })
                        }
                    </CRow>
                </div>
                {/* ----------- */}
                <div className="col-sm-6 card overflow-auto" style={{ height: 500 }}>
                    <section className='py-4 container '>
                        <div className='row justify-content-center'>
                            <div className='col-12'>
                                <h5>Món ({totalUniqueItems}) Số lượng: ({totalItems})</h5>
                                <table className='table table-light table-hover m-0 '>
                                    <tbody className=''>
                                        {items.map((item, index) => {
                                            return (
                                                <tr key={index} className="tables">
                                                    <td>
                                                        <img src={item.img} style={{ height: 6 + `rem`, width: 6 + `rem` }} />
                                                    </td>
                                                    <td className='table-name'>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    {/* <td>Quantity </td> */}
                                                    <td className='row'>
                                                        <button
                                                            className='btn btn-info ms-2 col-md-4'
                                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                        >-</button>
                                                        <div className='quatity col-md-4'>{item.quantity}</div>
                                                        <button
                                                            className='btn btn-info ms-2 col-md-4 w-20'
                                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                        >+</button>
                                                        <button
                                                            className='btn btn-danger dangers ms-2'
                                                            onClick={() => removeItem(item.id)}
                                                        >Xóa</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
            <div className='add-card'>
                <div className='col-auto ms-auto'>
                    <h3>Tiền: {cartTotal} VND</h3>
                </div>
                <div className='col-auto'>
                    <CButton onClick={() => setVisible(!visible)} className='button-price'>Thu tiền</CButton>
                    <CModal visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                            <CModalTitle>Thanh Toán</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div>
                                <div className='col-10 price-text'>
                                    <div className='col-md-5 buttonprice'>
                                        {
                                            arr.map((item, index) => {
                                                return (
                                                    <button key={index} onClick={() => { setPrice(item + +price) }}>{item}</button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='col-md-5 input-text'>
                                        Nhập tiền
                                        <input onChange={changePrice} name="abc" value={price}></input>
                                        {/* <input>{cartTotal}</input> */}
                                        Số tiền
                                        <div className='prices'>{cartTotal}</div>
                                        Tông tiền
                                        <input onChange={changeTotal} value={tien}></input>
                                    </div>
                                </div>
                                <div className='col-2 img-text'>
                                    <img src={ATM}></img>
                                    <img src={Momo}></img>
                                    <img src={VP}></img>
                                </div>
                            </div>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary" onClick={serverPrine}>In Bill</CButton>
                        </CModalFooter>
                    </CModal>
                </div>
            </div>
        </>
    )
}
