import Input from "@mui/material/Input";

export default function MyInput() {
  return (
    <Input
      placeholder="Enter Text"
      inputProps={{ "aria-label": "description" }}
      fullWidth
    />
  );
}
