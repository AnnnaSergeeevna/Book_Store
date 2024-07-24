import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FilterBar from './FilterBar';
import ItemList from './ItemList';
import ItemStore from '../Store/ItemStore';

const BookStoreContainer = () => {
    const [sortedItems, setSortedItems] = useState(ItemStore);
    const [filterTags, setFilterTags] = useState([]);

    const tags = Array.from(new Set(ItemStore.flatMap(item => item.tags)));

    useEffect(() => {
        let filteredItems = ItemStore;

        if (filterTags.length > 0) {
            filteredItems = filteredItems.filter(item =>
                filterTags.every(tag => item.tags.includes(tag))
            );
        }

        setSortedItems(filteredItems);
    }, [filterTags]);

    const handleSortChange = (field, order) => {
        const sorted = [...sortedItems].sort((a, b) => {
            if (field === 'price') {
                return order === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (field === 'author') {
                return order === 'asc'
                    ? a.author.localeCompare(b.author)
                    : b.author.localeCompare(a.author);
            } else if (field === 'date') {
                return order === 'asc'
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
            return 0;
        });
        setSortedItems(sorted);
    };

    const handleFilterChange = (tags) => {
        setFilterTags(tags);
    };

    return (
        <Container>
            <Row>
                <Col md={9}>
                    <h1>Book Store</h1>
                    <FilterBar tags={tags} onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
                    <ItemList items={sortedItems} />
                </Col>
            </Row>
        </Container>
    );
};

export default BookStoreContainer;
