import axios from "axios";
import { useEffect, useState } from "react";

import TableComponent from "./components/TableComponent";

export default function AdminUI() {
	const [data, setData] = useState([]);

	async function getData() {
		try {
			const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
			console.info(response);
			setData(response.data);
		}
		catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<TableComponent tData={data} />
	);
}
