import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@mui/material/styles/styled";
import { Hotel } from "../types";
import HotelItem from "./HotelItem";
import { useCallback, useState } from "react";
import HotelDetailsModal from "./HotelDetailsModal";
import useSWRMutation from "swr/mutation";
import useFetcher from "../hooks/useFetcher";
import { useSnackbar } from "../context/SnackbarProvider";

const StyledBox = styled(Box)(() => ({
  marginTop: "12px",
  overflowY: "scroll",
  height: "100%",
}));

const HotelList = ({
  isLoading,
  hotels,
}: {
  isLoading: boolean;
  hotels: Hotel[];
}) => {
  const { openSnackbar } = useSnackbar();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>();
  const { mutator } = useFetcher();
  const { trigger, isMutating } = useSWRMutation(`/api/hotels`, mutator);

  const handleClose = () => {
    setSelectedHotel(undefined);
  };

  const handleOpen = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleBookHotel = useCallback(
    async (hotel?: Hotel) => {
      if (!hotel) {
        return;
      }
      const response = await trigger(hotel);
      if (!response.success) {
        openSnackbar({
          message: response.errors[0].message,
          severity: "error",
        });
        return;
      }
      openSnackbar({ message: response.message, severity: "success" });
      setSelectedHotel(undefined);
    },
    [openSnackbar, setSelectedHotel, trigger]
  );

  if (hotels.length === 0 && !isLoading) {
    return (
      <StyledBox>
        <Container>
          <Typography>Search and book your favourite Hotels with us</Typography>
        </Container>
      </StyledBox>
    );
  }

  return (
    <>
      <StyledBox>
        <Container>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {hotels.map((hotel) => (
                <HotelItem key={hotel.id} hotel={hotel} onOpen={handleOpen} />
              ))}
            </Grid>
          )}
        </Container>
      </StyledBox>
      <HotelDetailsModal
        open={!!selectedHotel}
        onClose={handleClose}
        hotel={selectedHotel}
        onBookHotel={handleBookHotel}
        isBooking={isMutating}
      />
    </>
  );
};

export default HotelList;
