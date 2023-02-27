import { Checkbox, Table, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

import TableRowComponent from "./TableRowComponent";
import TablePaginationComponent from "./TablePaginationComponent";

export default function TableComponent({ tData }) {
    //#region Search
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function handleSearch(e) {
        setCurrentPage(1);
        setSearchTerm(e.target.value);
        if (searchTerm === "")
            setSearchResults(tData);
        else {
            const filteredData = tData.filter((data) => {
                if (
                    data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    data.role.toLowerCase().includes(searchTerm.toLowerCase())
                )
                    return data;
            });
            setSearchResults(filteredData);
        }
    }
    //#endregion

    //#region Pagination
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    let indexOfLastRow = currentPage * rowsPerPage;
    let indexOfFirstRow = indexOfLastRow - rowsPerPage;

    let currentRows = searchTerm.length > 0
        ? searchResults.length > 0
            ? searchResults.slice(indexOfFirstRow, indexOfLastRow)
            : []
        : tData.slice(indexOfFirstRow, indexOfLastRow);

    let totalRows = searchTerm.length > 0
        ? searchResults.length > 0
            ? searchResults.length
            : searchResults.length
        : tData.length;

    let totalPages = Math.ceil(totalRows / rowsPerPage);

    function handlePagination(pageNumber) {
        checkAllRows.current.checked = false;
        checkedRows.map((row) => { return row.isChecked = false; });
        setCheckedRows([]);
        setCurrentPage(pageNumber);
    }

    function nextPage() {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function previousPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    //#endregion

    //#region Select
    const checkAllRows = useRef(false);
    const [checkedRows, setCheckedRows] = useState([]);

    function handleSelectAll(e) {
        let isChecked = e.target.checked;
        checkAllRows.current.checked = isChecked;
        let currentlyCheckedRows;

        if (searchTerm.length > 0 && searchResults.length > 0) {
            currentlyCheckedRows = [];
            for (let i = 0; i < searchResults.length; i++) {
                currentlyCheckedRows.push(searchResults[i]);
            }
        }
        else {
            currentlyCheckedRows = [...checkedRows];
            for (let i = rowsPerPage; i > 0; i--) {
                if (indexOfLastRow - i < tData.length) {
                    currentlyCheckedRows.push(tData[indexOfLastRow - i]);
                }
            }
        }

        currentlyCheckedRows.forEach((row) => { return row.isChecked = isChecked; });
        console.log(currentlyCheckedRows);
        setCheckedRows(currentlyCheckedRows);
    }

    function handleSelect(e, id) {
        let currentlyCheckedRow = [...checkedRows];
        tData.forEach((row) => {
            if (row.id === id) {
                row.isChecked = !row.isChecked;
                if (row.isChecked)
                    currentlyCheckedRow.push(row);
                else
                    currentlyCheckedRow = currentlyCheckedRow.filter((row) => { return row.id !== id; });
            }
        });
        console.log(currentlyCheckedRow);
        setCheckedRows(currentlyCheckedRow);
    }
    //#endregion

    return (
        <>

            <TextInput addon="🔍" placeholder="Search by name, email or role" value={searchTerm} onChange={handleSearch} />

            <Table hoverable={true}>

                <Table.Head>
                    <Table.HeadCell>
                        <Checkbox onClick={handleSelectAll} ref={checkAllRows} />
                    </Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>

                {currentRows.length === 0
                    ? (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan={4}>No Records Found!</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                    : (
                        <Table.Body className="divide-y">
                            {currentRows.map((row) => (
                                <TableRowComponent key={row.id} row={row}
                                    handleSelect={handleSelect} />
                            ))}
                        </Table.Body>
                    )
                }

            </Table>

            {
                totalRows > 10
                &&
                (
                    <TablePaginationComponent
                        currentPage={currentPage}
                        nextPage={nextPage} paginate={handlePagination} previousPage={previousPage}
                        totalPages={totalPages} />
                )
            }

        </>
    );
}
