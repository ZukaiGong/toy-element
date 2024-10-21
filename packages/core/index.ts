import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@toy-element/utils";
import components from "./components";
import "@toy-element/theme/index.css";

library.add(fas);
const intaller = makeInstaller(components);

export * from "../components";
export default intaller;
