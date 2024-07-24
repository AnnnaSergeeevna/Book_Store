import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Card, Image } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Bootstrap.css';
import { ITEM_ROUTE } from '../utils/consts';
import { item } from '../store/ItemStore';


const Item = observer(({ item }) => {
    const navigate = useNavigate()
    return (<>
        <Col md={4} className='d-flex mt-1 align-items-center justify-content-center'>
            <Card style={{ cursor: 'pointer' }} border='light'
                onClick={() => navigate(`${ITEM_ROUTE}/${item.id}`)}
            >
                <Image style={{ height: 150 }} src={process.env.REACT_APP_API_URL + item.img} thumbnail />
                <div className='d-flex mt-1 align-items-center justify-content-between'>
                    <div>Perfume</div>
                    <div className='d-flex'>
                        <div>{item.rating} ⭐️</div>
                        {/* <Image width={20} src={star} /> */}
                    </div>
                </div>
                <div>{item.name.length <= 14 ? item.name : `${item.name.slice(0, 15)}...`}
                </div>

            </Card>
        </Col>
    </>);
}
);

export default Item;






