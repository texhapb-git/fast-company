import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    const normalizeItems = (items) => {
        if (Array.isArray(items)) {
            return items;
        } else {
            return Array.from(items);
        }
    };

    items = normalizeItems(items);

    return (
        <ul className="list-group">
            {items.map(item => (
                <li
                    key={item[valueProperty]}
                    className={"list-group-item" + (item === selectedItem ? " active" : "")}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item[contentProperty]}
                </li>
            )
            )}

        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
