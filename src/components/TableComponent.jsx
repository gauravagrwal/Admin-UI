import { Table, TextInput } from "flowbite-react";
import { useState } from "react";

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

    return (
        <>

            <TextInput addon="🔍" placeholder="Search by name, email or role" value={searchTerm} onChange={handleSearch} />

            <Table hoverable={true}>

                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>

                {currentRows.length === 0
                    ? (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan={3}>No Records Found!</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                    : (
                        <Table.Body className="divide-y">
                            {currentRows.map((row) => (
                                <TableRowComponent key={row.id} row={row} />
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
