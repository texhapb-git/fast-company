import React from "react";
import PropTypes from "prop-types";

function SearchBar({ onChangeValue, value }) {
    const onChange = (e) => {
        onChangeValue(e.target.value);
    };

    return (
        <div className="mt-2 mb-2">
            <input className="form-control" type="text" name="searchName" placeholder="Введите имя" value={value} onChange={onChange} />
        </div>
    );
};

SearchBar.propTypes = {
    value: PropTypes.string,
    onChangeValue: PropTypes.func
};

export default SearchBar;
