import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@mui/material/styles/styled";

const hotels = [
  {
    id: 1,
    name: "Hotel A",
    image: "https://via.placeholder.com/150",
    location: "City A",
    price: "$100",
  },
  {
    id: 2,
    name: "Hotel B",
    image: "https://via.placeholder.com/150",
    location: "City B",
    price: "$120",
  },
  {
    id: 3,
    name: "Hotel C",
    image: "https://via.placeholder.com/150",
    location: "City C",
    price: "$150",
  },
  {
    id: 1,
    name: "Hotel A",
    image: "https://via.placeholder.com/150",
    location: "City A",
    price: "$100",
  },
  {
    id: 2,
    name: "Hotel B",
    image: "https://via.placeholder.com/150",
    location: "City B",
    price: "$120",
  },
  {
    id: 3,
    name: "Hotel C",
    image: "https://via.placeholder.com/150",
    location: "City C",
    price: "$150",
  },
  {
    id: 1,
    name: "Hotel A",
    image: "https://via.placeholder.com/150",
    location: "City A",
    price: "$100",
  },
  {
    id: 2,
    name: "Hotel B",
    image: "https://via.placeholder.com/150",
    location: "City B",
    price: "$120",
  },
  {
    id: 3,
    name: "Hotel C",
    image: "https://via.placeholder.com/150",
    location: "City C",
    price: "$150",
  },
];

const StyledBox = styled(Box)(() => ({
  marginTop: "24px",
  overflowY: "scroll",
  height: "100%",
}));

const HotelList = ({ isLoading, data }: { isLoading: boolean; data: any }) => {
  if (!data && !isLoading) {
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
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={hotel.image}
                    alt={hotel.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {hotel.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {hotel.location}
                    </Typography>
                    <Typography variant="body2">
                      Price: {hotel.price}
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
