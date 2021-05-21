import { Route, Switch } from "react-router";
import EditorPage from "./pages/EditorPage";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/:csId" component={EditorPage} />
			</Switch>
		</main>
	);
}

export default App;
