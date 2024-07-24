import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterBar = ({ tags, onSortChange, onFilterChange }) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterTags, setFilterTags] = useState([]);

    const handleSort = (field) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        onSortChange(field, newSortOrder);
    };

    const handleTagChange = (tag) => {
        const newFilterTags = filterTags.includes(tag)
            ? filterTags.filter(t => t !== tag)
            : [...filterTags, tag];
        setFilterTags(newFilterTags);
        onFilterChange(newFilterTags);
    };

    return (
        <div className="filter-bar">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <div onClick={() => handleSort('price')}>
                        Price {sortOrder === 'asc' ? '↑' : '↓'}
                    </div>
                </li>
                <li className="nav-item">
                    <div onClick={() => handleSort('author')}>
                        Author
                    </div>
                </li>
                <li className="nav-item">
                    <div onClick={() => handleSort('date')}>
                        Date
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







