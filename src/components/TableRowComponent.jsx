import { Table } from "flowbite-react";

export default function TableRowComponent({ row }) {
    return (
        <Table.Row>
            <Table.Cell>
                {row.name}
            </Table.Cell>
            <Table.Cell>
                {row.email}
            </Table.Cell>
            <Table.Cell>
                {row.role}
            </Table.Cell>
        </Table.Row>
    );
}
