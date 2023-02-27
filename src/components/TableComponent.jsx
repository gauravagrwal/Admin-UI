import { Table } from "flowbite-react";

import TableRowComponent from "./TableRowComponent";

export default function TableComponent({ tData }) {
    return (
        <>

            <Table hoverable={true}>

                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {tData.map((row) => (
                        <TableRowComponent key={row.id} row={row} />
                    ))}
                </Table.Body>

            </Table>

        </>
    );
}
