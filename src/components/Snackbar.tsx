import { useSnackbar, ProviderContext, OptionsObject } from "notistack";

//sets a default length for all Snack messages
const defaultSnackMessageLength = 100;

const trimMessage = (
  msg: string,
  length: number = defaultSnackMessageLength
) => {
  return msg.substring(0, length);
};

let useSnackbarRef: ProviderContext;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg: string, options: OptionsObject = {}) {
    this.toast(trimMessage(msg), { ...options, variant: "success" });
  },
  warning(msg: string, options: OptionsObject = {}) {
    this.toast(trimMessage(msg), { ...options, variant: "warning" });
  },
  info(msg: string, options: OptionsObject = {}) {
    this.toast(trimMessage(msg), { ...options, variant: "info" });
  },
  error(msg: string, options: OptionsObject = {}) {
    this.toast(trimMessage(msg), { ...options, variant: "error" });
  },
  toast(msg: string, options: OptionsObject = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options);
  },
};
