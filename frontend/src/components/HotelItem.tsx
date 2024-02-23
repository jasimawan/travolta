import { memo, useCallback } from "react";
import { Hotel } from "../types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LazyCardMedia from "./LazyCardMedia";

const HotelItem = memo(
  ({ hotel, onOpen }: { hotel: Hotel; onOpen?: (hotel: Hotel) => void }) => {
    const handleOpen = useCallback(() => {
      onOpen?.(hotel);
    }, [onOpen]);

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%" }} onClick={handleOpen}>
          <LazyCardMedia image={hotel.images[0]} height={200} />
          <CardContent>
            <Typography variant="h6" component="div">
              {hotel.name}
            </Typography>
            <Typography color="textSecondary">{hotel.address}</Typography>
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
          </CardContent>
        </Card>
      </Grid>
    );
  }
);

export default HotelItem;
