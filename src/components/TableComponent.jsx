import { Button, Checkbox, Table, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

import TableRowComponent from "./TableRowComponent";
import TablePaginationComponent from "./TablePaginationComponent";

export default function TableComponent({ tData, setTData }) {
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
        setShowMultiDeleteButton(false);
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
        setShowMultiDeleteButton(isChecked);
    }

    function handleSelect(e, id) {
        let currentlyCheckedRow = [...checkedRows];
        tData.forEach((row) => {
            if (row.id === id) {
                setShowMultiDeleteButton(e.target.checked);
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

    //#region Update
    function handleUpdate(updateRow) {
        const updatedRowData = tData.map((row) => {
            if (row.id === updateRow.id) {
                row.name = updateRow.name;
                row.email = updateRow.email;
                row.role = updateRow.role;
            }
            return row;
        });
        setTData(updatedRowData);
    }
    //#endregion

    //#region Delete
    const [showMultiDeleteButton, setShowMultiDeleteButton] = useState(false);

    function handleDelete(id) {
        if (window.confirm("are you sure you want to delete this record?")) {
            if (searchResults.length !== 0)
                setSearchResults(searchResults.filter((result) => { return result.id !== id; }));

            setTData(tData.filter((row) => { return row.id !== id; }));
        }
    }

    function handleDeleteSelected() {
        if (window.confirm("are you sure you want to delete all the selected records?")) {
            if (searchResults.length > 0) {
                const newData = searchResults.filter((row) => { return !checkedRows.includes(row); });
                setTData(tData.filter((row) => { return !checkedRows.includes(row); }));

                if (newData.length > 0)
                    setSearchResults(newData);
                else
                    setSearchResults([]);

                setShowMultiDeleteButton(false);
                checkAllRows.current.checked = false;
            }
            else {
                const newData = tData.filter((row) => { return !checkedRows.includes(row); });
                setTData(newData);

                let totalPages = Math.ceil(newData.length / rowsPerPage);
                if (currentPage > totalPages - 1)
                    handlePagination(totalPages);
                else
                    handlePagination(currentPage);

                setShowMultiDeleteButton(false);
                checkAllRows.current.checked = false;
            }
        }
    }
    //#endregion

    return (
        <>

            <div className="flex">
                <TextInput className="grow" addon="🔍" placeholder="Search by name, email or role" value={searchTerm} onChange={handleSearch} />
                {
                    showMultiDeleteButton === true
                        ? (<Button color="failure" onClick={() => handleDeleteSelected()}>Delete Selected</Button>)
                        : null
                }
            </div>

            <Table hoverable={true}>

                <Table.Head>
                    <Table.HeadCell>
                        <Checkbox onClick={handleSelectAll} ref={checkAllRows} />
                    </Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>

                {currentRows.length === 0
                    ? (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan={5}>No Records Found!</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                    : (
                        <Table.Body className="divide-y">
                            {currentRows.map((row) => (
                                <TableRowComponent key={row.id} row={row}
                                    handleSelect={handleSelect}
                                    handleUpdate={handleUpdate}
                                    handleDelete={handleDelete} />
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
