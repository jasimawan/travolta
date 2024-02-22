import Box from "@mui/material/Box";
import MainAppBar from "./components/Appbar";
import { GlobalSearch } from "./components/GlobalSearch";
import {
  IGlobalSearch,
  useGlobalSearchContext,
} from "./context/GlobalSearchContext";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import HotelList from "./components/HotelsList";
import styled from "@mui/material/styles/styled";

const StyledBox = styled(Box)(() => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

function App() {
  const { setGlobalSearch } = useGlobalSearchContext();
  const { isLoading, mutate, data } = useSWR(
    `${process.env.REACT_BACKEND_URL}/hotels/${window.location.search}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnMount: false,
    }
  );

  const handleSearch = useCallback(async () => {
    console.log(window.location.search);
    await mutate();

    // Additionally, you can make the API call here if needed
    // fetch(`your_api_endpoint${queryString}`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Handle the API response data here
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     // Handle errors here
    //     console.error('There was a problem with the fetch operation:', error);
    //   });
  }, [mutate]);

  useEffect(() => {
    const parseQueryParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const queryParams = {
        location: searchParams.get("location") || "",
        checkin: searchParams.get("checkin") || "",
        checkout: searchParams.get("checkout") || "",
        adults: searchParams.get("adults") || "",
        children: searchParams.get("children") || "",
        infants: searchParams.get("infants") || "",
        pets: searchParams.get("pets") || "",
        page: searchParams.get("page") || "",
      };
      return queryParams;
    };

    const queryParams = parseQueryParams();

    if (
      queryParams.location &&
      queryParams.checkin &&
      queryParams.checkout &&
      (queryParams.adults ||
        queryParams.children ||
        queryParams.infants ||
        queryParams.pets) &&
      queryParams.page
    ) {
      const searchData: IGlobalSearch = {
        ...queryParams,
        guests: {
          adults: +queryParams.adults || 0,
          children: +queryParams.children || 0,
          infants: +queryParams.infants || 0,
          pets: +queryParams.pets || 0,
        },
        page: +queryParams.page,
      };
      setGlobalSearch(searchData);

      handleSearch();
    }
  }, []);

  return (
    <StyledBox>
      <MainAppBar />
      <GlobalSearch onSearchHotels={handleSearch} />
      <HotelList isLoading={isLoading} data={data} />
    </StyledBox>
  );
}

export default App;
