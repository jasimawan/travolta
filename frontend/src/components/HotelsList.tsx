import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@mui/material/styles/styled";
import { Hotel } from "../types";

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
    <StyledBox>
      <Container>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {hotels.map((hotel) => (
              <Grid item key={hotel.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={hotel.images[0]}
                    alt={hotel.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {hotel.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {hotel.address}
                    </Typography>
                    <Typography variant="body2">
                      {`Rate per day: $${hotel.price.rate}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Total price: $${hotel.price.total}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Rating: ${hotel.rating} (${hotel.reviewsCount})`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </StyledBox>
  );
};

export default HotelList;
