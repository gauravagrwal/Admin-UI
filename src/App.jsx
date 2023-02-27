import { Footer } from "flowbite-react";

import AdminUI from "./AdminUI";

export default function App() {
	return (
		<>
			<main>
				<AdminUI />
			</main>

			<Footer container={true}>
				<Footer.Brand href="." name="Admin UI" />
				<Footer.Copyright href="https://github.com/gauravagrwal/Admin-UI" by="Gaurav Agrawal" year={2023} />
			</Footer>
		</>
	);
}
