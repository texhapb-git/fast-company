import React from "react";
import PropTypes from "prop-types";

function TableHeader({ onSort, selectedSort, columns }) {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    console.log(selectedSort);

    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        scope="col"
                        {...{ role: columns[column].path ? "button" : "" }}
                    >
                        {columns[column].name}
                        {columns[column].path && columns[column].path === selectedSort.path
                            ? <i className={selectedSort.order === "asc" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"}></i>
                            : ""}

                    </th>
                ))}
            </tr>
        </thead >
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
