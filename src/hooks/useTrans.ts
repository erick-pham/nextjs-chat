import { useRouter } from "next/router";
import en from "../i18n/en";
import vi from "../i18n/vi";

const useTrans = () => {
  const { locale } = useRouter();

  const trans = locale === "vi" ? vi : en;

  return trans;
};

export default useTrans;
