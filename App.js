import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import RootNavigation from "./src/navigation/RootNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
