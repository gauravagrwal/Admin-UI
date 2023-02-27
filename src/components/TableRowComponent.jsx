import { Checkbox, Table } from "flowbite-react";

export default function TableRowComponent({ row, handleSelect }) {
    return (
        <Table.Row style={{ backgroundColor: row.isChecked ? "lightgray" : "" }}>
            <Table.Cell>
                <Checkbox onChange={(e) => handleSelect(e, row.id)} checked={row.isChecked} />
            </Table.Cell>
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
