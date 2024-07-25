import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemList = ({ items }) => {

    return (
        <Container>
            <Row className='mt-3 books-row'>
                {items.map((item, index) => (
                    <Col key={index} md={12} >
                        <div className="book-item">
                            <h2>{item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}</h2>
                            <strong>By</strong> {item.author}
                            {item.illustrator && <div><strong>Illustrator:</strong> {item.illustrator}</div>}
                            <div>{item.date}</div>
                            <p className='price-block'>{item.price}$</p>
                            <div>
                                {item.tags.map((tag, tagitem) => (
                                    <button key={tag} className='tag-button'>{tag}</button>
                                ))}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ItemList;

