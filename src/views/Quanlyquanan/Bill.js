import React from 'react'
import Logo from './img/2-removebg-preview.png'
import './bill.css'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import getDate from 'src/commons/getDate'
import { useCart } from 'react-use-cart'


export default function Bill() {

    //lấy từ giỏ hàng
    const {
        items,
        cartTotal,
        totalItems,
    } = useCart();

    const printClick = () => {
        console.log("pri");
        window.print()
    }

    return (
        <>
            <div className='print'>
                <button className='prints' onClick={printClick}>Print</button>
            </div>
            <div className='bill'>
                <div className='bill-logo'>
                    <img src={Logo} width={120}></img>
                    <h1>Yashop</h1>
                </div>
                <p>ĐC: Tổ 8 tu hoàng phường phương canh</p>
                <h4>HÓA ĐƠN THANH TOÁN</h4>
                <span>Ngày/Giờ: {getDate()}</span>
                <CTable className='bill-table'>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Tên món</CTableHeaderCell>
                            <CTableHeaderCell scope="col">SL</CTableHeaderCell>
                            <CTableHeaderCell scope="col">ĐG</CTableHeaderCell>
                            <CTableHeaderCell scope="col">T/Tiền</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {items.map((item, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row">{item.name}</CTableHeaderCell>
                                    <CTableDataCell>{item.quantity}</CTableDataCell>
                                    <CTableDataCell>{item.price}</CTableDataCell>
                                    <CTableDataCell>{item.quantity * item.price}</CTableDataCell>
                                </CTableRow>
                            )
                        })}
                    </CTableBody>
                    <div className='bill-price'>
                        <h3 className='bill-text'>Tổng Cộng: </h3>
                        <h3 className='bill-prices'>{cartTotal} đ</h3>
                    </div>
                </CTable>
                <img src={Logo} className='bill-logo2'></img>
                <h5>Chúc quý khách vui vẻ, hẹn gặp lại!</h5>
            </div>
        </>
    )
}
