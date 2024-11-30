import { Box, InputAdornment, MenuItem, Popover, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { searchByName } from "../utils/filter";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  handleProductSelection: (productId: string) => void;
}

const SearchBar = ({ handleProductSelection }: SearchBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState<string>("");

  const { products } = useProducts();

  const searchedProducts = search === "" ? products : searchByName(products, search);

  const handleClickSearchBar = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setTimeout(() => textFieldRef.current?.focus(), 0);
  };

  const handleCloseSearchMenu = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleProductClick = (productId: string) => {
    handleProductSelection(productId);
    setSearch("");
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "end", mb: 5 }}>
      <TextField
        id="filled-search"
        placeholder="Pesquise pelo produto"
        type="search"
        variant="outlined"
        size="small"
        onClick={handleClickSearchBar}
        onChange={handleSearch}
        value={search}
        inputRef={textFieldRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Popover
        id="products-popover"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseSearchMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus
      >
        <Box sx={{ maxHeight: 150, overflow: "auto", width: "250px" }}>
          {searchedProducts?.length === 0 ? (
            <MenuItem disabled>Nenhum produto encontrado</MenuItem>
          ) : (
            searchedProducts.map((product) => (
              <MenuItem key={product.id} onClick={() => handleProductClick(product.id)}>
                {product.name}
              </MenuItem>
            ))
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default SearchBar;
