import { Footer } from "flowbite-react";

import AdminUI from "./AdminUI";

export default function App() {
	return (
		<>
			<main className="p-4">
				<AdminUI />
			</main>

			<Footer container={true}>
				<Footer.Brand href="." name="Admin UI" />
				<Footer.Copyright href="https://github.com/gauravagrwal/Admin-UI" by="Gaurav Agrawal" year={2023} />
			</Footer>
		</>
	);
}
