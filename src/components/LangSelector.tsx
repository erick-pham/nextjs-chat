import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";

export default function SelectSmall() {
  const router = useRouter();
  const currentLocale = router.locale || router.defaultLocale;
  const [lang, setLang] = React.useState(currentLocale);

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
    router.push(router.asPath, router.asPath, { locale: event.target.value });
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select value={lang} onChange={handleChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="vi">Vietnamese</MenuItem>
      </Select>
    </FormControl>
  );
}
