import { Table, TextInput } from "flowbite-react";
import { useState } from "react";

import TableRowComponent from "./TableRowComponent";

export default function TableComponent({ tData }) {
    //#region Search
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function handleSearch(e) {
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

    return (
        <>

            <TextInput addon="🔍" placeholder="Search by name, email or role" value={searchTerm} onChange={handleSearch} />

            <Table hoverable={true}>

                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>

                {searchResults.length === 0
                    ? (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan={3}>No Records Found!</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                    : (
                        <Table.Body className="divide-y">
                            {searchResults.map((row) => (
                                <TableRowComponent key={row.id} row={row} />
                            ))}
                        </Table.Body>
                    )
                }

            </Table>

        </>
    );
}
