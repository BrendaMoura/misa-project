import { MenuItem, Select, Typography } from "@mui/material";
import { useVendors } from "../hooks/useVendors";

interface VendorListProps {
  vendorId: string;
  handleChange: (event: any) => void;
}

const VendorList = ({ vendorId, handleChange }: VendorListProps) => {
  const { vendors } = useVendors();
  return (
    <>
      <Typography variant="body2" component="h2" sx={{ mt: 6, mb: 2, fontWeight: "bold" }}>
        Fornecedor
      </Typography>

      <Select displayEmpty value={vendorId} onChange={handleChange} sx={{ width: "100%" }}>
        <MenuItem value="" disabled>
          Selecione o fornecedor
        </MenuItem>
        {vendors?.map((vendor) => (
          <MenuItem key={vendor.id} value={vendor.id}>
            {vendor.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default VendorList;
