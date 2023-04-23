import { boot } from "quasar/wrappers";
import { input, button } from "src/util/visual-customizations";
import { Screen } from "quasar";

export default boot(({ app }) => {
  app.config.globalProperties.$visualInput = input;
  app.config.globalProperties.$visualButton = button;
  app.config.globalProperties.$screen = Screen;
});
