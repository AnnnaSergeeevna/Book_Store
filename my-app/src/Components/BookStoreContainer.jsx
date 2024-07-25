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
            let comparison = 0;

            if (field === 'price') {
                if (a.price === b.price) {
                    const authorA = a.author.split(' ').pop().toLowerCase();
                    const authorB = b.author.split(' ').pop().toLowerCase();
                    comparison = authorA.localeCompare(authorB);
                } else {
                    comparison = a.price - b.price;
                }
            }

            if (field === 'date') {
                if (new Date(a.date).getTime() === new Date(b.date).getTime()) {
                    const authorA = a.author.split(' ').pop().toLowerCase();
                    const authorB = b.author.split(' ').pop().toLowerCase();
                    comparison = authorA.localeCompare(authorB);
                } else {
                    comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                }
            }

            if (field === 'author') {
                comparison = a.author.localeCompare(b.author);
            }

            return order === 'asc' ? comparison : -comparison;
        });

        setSortedItems(sorted);
    };


    const handleFilterChange = (tags) => {
        setFilterTags(tags);
    };
    const allTags = Array.from(new Set(ItemStore.flatMap(item => item.tags)));

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1 className='header-block'>Book Store</h1>
                    <FilterBar tags={tags} onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
                    <ItemList items={sortedItems} />
                </Col>
            </Row>
        </Container>
    );
};

export default BookStoreContainer;
