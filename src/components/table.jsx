import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

function Table({ selectedSort, onSort, columns, data, children }) {
    return (
        <table className="table" >
            {children ||
                <>
                    <TableHeader selectedSort={selectedSort} onSort={onSort} columns={columns} />
                    <TableBody data={data} columns={columns} />
                </>
            }
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    children: PropTypes.array
};

export default Table;
