import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Hotel } from "../types";
import Button from "@mui/material/Button";
import { useCallback } from "react";
import ImageCarousel from "./ImageCarousel";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

const HotelDetailsModal = ({
  hotel,
  onClose,
  open,
  onBookHotel,
  isBooking,
}: {
  open: boolean;
  onClose: () => void;
  hotel?: Hotel;
  onBookHotel: (hotel?: Hotel) => void;
  isBooking: boolean;
}) => {
  const handleBookHotel = useCallback(() => {
    onBookHotel(hotel);
  }, [onBookHotel, hotel]);

  if (!hotel) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{hotel.name}</DialogTitle>
      <DialogContent>
        <ImageCarousel images={hotel.images} />
        <Typography variant="body2" sx={{ mt: "12px" }}>
          {hotel.address}
        </Typography>
        <Typography variant="body2">
          {`Rate per day: $${hotel.price.rate}`}
        </Typography>
        <Typography variant="body2">
          {`Total price: $${hotel.price.total}`}
        </Typography>
        {hotel.rating && (
          <Typography variant="body2">
            {`Rating: ${hotel.rating} (${hotel.reviewsCount})`}
          </Typography>
        )}
        <Typography variant="body2">
          {`Amenities: ${hotel.previewAmenities.join()}`}
        </Typography>
        <Typography variant="body2">
          {`Bathrooms: ${hotel.bathrooms}`}
        </Typography>
        <Typography variant="body2">{`Bedrooms: ${hotel.bedrooms}`}</Typography>
        <Typography variant="body2">{`Beds: ${hotel.beds}`}</Typography>
        <Typography variant="body2">{`Persons: ${hotel.persons}`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <LoadingButton
          variant="contained"
          onClick={handleBookHotel}
          disabled={isBooking}
          loading={isBooking}
        >
          Book Hotel
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default HotelDetailsModal;
