import React from "react";
import styled from "@mui/material/styles/styled";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

interface City {
  label: string;
}

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: "40px",
  backgroundColor: theme.palette.grey[300],
  padding: `${theme.spacing(1.5)} 0`,
}));

export const GlobalSearch: React.FC = () => {
  // Example data for autocomplete options
  const cities: City[] = [
    { label: "New York City" },
    { label: "Los Angeles" },
    { label: "San Francisco" },
    { label: "Chicago" },
    { label: "Miami" },
  ];

  return (
    <StyledContainer maxWidth="lg">
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Autocomplete
          disablePortal
          id="search-hotels-input"
          options={cities}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Destination" />
          )}
        />
        <TextField
          id="check-in-date"
          label="Check-in"
          type="date"
          defaultValue="2024-02-20"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="check-out-date"
          label="Check-out"
          type="date"
          defaultValue="2024-02-22"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary">
          Search
        </Button>
      </Stack>
    </StyledContainer>
  );
};
