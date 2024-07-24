import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemList = ({ items }) => {

    return (
        <Container>
            <Row>
                {items.map((item, index) => (
                    <Col key={index} md={12} className="mb-4">
                        <div className="book-item">
                            <h2>{item.title}</h2>
                            <p><strong>Author:</strong> {item.author}</p>
                            {item.illustrator && <p><strong>Illustrator:</strong> {item.illustrator}</p>}
                            <p><strong>Date:</strong> {item.date}</p>
                            <p><strong>Price:</strong> ${item.price}</p>
                            <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ItemList;

