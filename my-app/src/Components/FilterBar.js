import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterBar = ({ onSortChange, onFilterChange }) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('price');
    const [filterTags, setFilterTags] = useState([]);

    const handleSort = (field) => {
        const newSortOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortField(field);
        onSortChange(field, newSortOrder);
    };

    const handleTagChange = (tag) => {
        const newFilterTags = filterTags.includes(tag)
            ? filterTags.filter(t => t !== tag)
            : [...filterTags, tag];
        setFilterTags(newFilterTags);
        onFilterChange(newFilterTags);
    };

    const tags = ["Climate change", "Sci-Fi", "History", "Technology", "Health", "Biochemistry"];

    return (
        <div className="mt-3 filter-bar">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <div onClick={() => handleSort('price')}>
                        Price {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </div>
                </li>
                <li className="nav-item">
                    <div onClick={() => handleSort('author')}>
                        Author {sortField === 'author' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </div>
                </li>
                <li className="nav-item">
                    <div onClick={() => handleSort('date')}>
                        Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </div>
                </li>
                <li className="nav-item">
                    <Dropdown className="tags-dropdown">
                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                            Tags
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="tags-dropdown-menu">
                            {tags.map(tag => (
                                <Dropdown.Item key={tag} onClick={() => handleTagChange(tag)}>
                                    <input
                                        type="checkbox"
                                        checked={filterTags.includes(tag)}
                                        readOnly
                                    />
                                    {' '}{tag}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="nav-item">
                    <div onClick={() => {
                        setSortOrder('asc');
                        setSortField('price');
                        setFilterTags([]);
                        onSortChange('price', 'asc');
                        onFilterChange([]);
                    }}>
                        Reset rules
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default FilterBar;
