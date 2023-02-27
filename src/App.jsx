import { Footer } from "flowbite-react";

export default function App() {
	return (
		<>
			<Footer container={true}>
				<Footer.Brand href="." name="Admin UI" />
				<Footer.Copyright href="https://github.com/gauravagrwal/Admin-UI" by="Gaurav Agrawal" year={2023} />
			</Footer>
		</>
	);
}
