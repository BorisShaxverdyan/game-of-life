import Application from "./services/Application";
import Config from "./services/Config";

export default class App extends Application {
	public configs = ["app", "game"];

	public bootstrap = () => {};
}
