import React from "react";
import styled from "@mui/material/styles/styled";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import GuestsMenu from "./GuestsMenu";
import {
  useCheckin,
  useCheckout,
  useGuests,
  useLocation,
  usePage,
} from "../selectors/globalSearchSelectors";
import DatePicker from "./DatePicker";

const cities: string[] = [
  "New York City",
  "San Francisco",
  "Warsaw",
  "Miami",
  "Berlin",
  "Munich",
  "Minsk",
];

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: "40px",
  backgroundColor: theme.palette.grey[300],
  padding: `${theme.spacing(1.5)} 0`,
}));

type Props = {
  onSearchHotels: () => void;
};

export const GlobalSearch: React.FC<Props> = ({ onSearchHotels }) => {
  const { location, setLocation } = useLocation();
  const { checkin, setCheckin } = useCheckin();
  const { checkout, setCheckout } = useCheckout();
  const { totalGuests, guests } = useGuests();
  const { page } = usePage();

  const isSearchDisabled =
    location === "" || checkin === "" || checkout === "" || totalGuests === 0;

  const handleSetLocation = (
    _: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (!value) {
      return;
    }
    setLocation(value);
  };

  const handleSearch = () => {
    const guestsQueryString = Object.entries(guests)
      .filter(([, value]) => value !== 0)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const queryString = `?location=${location}&checkin=${checkin}&checkout=${checkout}&${guestsQueryString}&page=${page}`;

    const newUrl = `${window.location.origin}/search${queryString}`;
    window.history.pushState({}, "", newUrl);
    onSearchHotels();
  };

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
          value={location || null}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          onChange={handleSetLocation}
        />
        <DatePicker
          label="Check-in"
          date={checkin}
          dateLimit={new Date().toDateString()}
          onDateChange={setCheckin}
        />
        <DatePicker
          label="Check-out"
          date={checkout}
          dateLimit={checkin}
          onDateChange={setCheckout}
        />
        <GuestsMenu />
        <Button
          variant="contained"
          color="primary"
          disabled={isSearchDisabled}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>
    </StyledContainer>
  );
};
