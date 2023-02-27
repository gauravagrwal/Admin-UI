import { Checkbox, Table, TextInput } from "flowbite-react";
import { useState } from "react";

export default function TableRowComponent({ row, handleSelect, handleUpdate }) {
    const [canEdit, setCanEdit] = useState(false);
    const [currentValue, setCurrentValue] = useState(row);

    function handleChange(e) {
        const { name, value } = e.target;
        setCurrentValue({ ...currentValue, [name]: value });
    }

    function doEdit() {
        setCanEdit(true);
    }

    function validation(data) {
        if (data.name.length === 0) {
            alert("name is a required field");
            return false;
        }
        else if (data.email.length === 0) {
            alert("email is a required field");
            return false;
        }
        else if (data.role.length === 0) {
            alert("role is a required field");
            return false;
        }
        else
            return true;
    }

    function handleSave() {
        if (!validation(currentValue))
            return;
        setCanEdit(false);
        handleUpdate(currentValue);
    }

    return (
        <Table.Row style={{ backgroundColor: row.isChecked ? "lightgray" : "" }}>
            <Table.Cell>
                <Checkbox onChange={(e) => handleSelect(e, row.id)} checked={row.isChecked} />
            </Table.Cell>

            <Table.Cell>
                {
                    canEdit === true
                        ? (<TextInput name="name" value={currentValue.name} onChange={handleChange} required />)
                        : (row.name)
                }
            </Table.Cell>

            <Table.Cell>
                {
                    canEdit === true
                        ? (<TextInput name="email" value={currentValue.email} onChange={handleChange} required />)
                        : (row.email)
                }
            </Table.Cell>

            <Table.Cell>
                {
                    canEdit === true
                        ? (<TextInput name="role" value={currentValue.role} onChange={handleChange} required />)
                        : (row.role)
                }
            </Table.Cell>

            <Table.Cell>
                {
                    canEdit === false
                        ? (
                            <a href="#" onClick={doEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </a>
                        )
                        : (
                            <a href="#" onClick={handleSave}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                            </a>
                        )
                }
            </Table.Cell>
        </Table.Row>
    );
}
