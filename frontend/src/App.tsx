import Box from "@mui/material/Box";
import MainAppBar from "./components/Appbar";
import { GlobalSearch } from "./components/GlobalSearch";
import { useGlobalSearchContext } from "./context/GlobalSearchContext";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import HotelList from "./components/HotelsList";
import styled from "@mui/material/styles/styled";
import { Hotel, IGlobalSearch } from "./types";
import useFetcher from "./hooks/useFetcher";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { usePage } from "./selectors/globalSearchSelectors";
import isValidDateRange from "./utils/validateDateRange";
import { useSnackbar } from "./context/SnackbarProvider";

const StyledBox = styled(Box)(() => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
}));

function App() {
  const { setGlobalSearch } = useGlobalSearchContext();
  const { page: globalPage, setPage } = usePage();
  const { openSnackbar } = useSnackbar();
  const { fetcher } = useFetcher();
  const {
    isLoading,
    mutate,
    data: hotels,
  } = useSWR(`/api/hotels/${window.location.search}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnMount: false,
    errorRetryCount: 1,
  });

  const handleSearch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const handlePageChange = useCallback(
    async (_: React.ChangeEvent<unknown>, page: number) => {
      if (globalPage === page) {
        return;
      }
      setPage(page);
      const params = new URLSearchParams(window.location.search);
      params.set("page", `${page}`);
      window.location.search = params.toString();
    },
    [globalPage, setPage]
  );

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

      const isValidDate = isValidDateRange(
        queryParams.checkin,
        queryParams.checkout
      );

      console.log(isValidDate);

      if (!isValidDate) {
        openSnackbar({ message: "Invalid date range.", severity: "error" });
        return;
      }

      handleSearch();
    }
  }, []);

  return (
    <StyledBox>
      <MainAppBar />
      <GlobalSearch onSearchHotels={handleSearch} />
      <HotelList isLoading={isLoading} hotels={(hotels as Hotel[]) || []} />
      {hotels && (
        <StyledStack spacing={2} margin={1} alignItems="center">
          <Pagination
            count={10}
            color="primary"
            shape="rounded"
            sx={{ padding: "6px" }}
            page={globalPage}
            onChange={handlePageChange}
          />
        </StyledStack>
      )}
    </StyledBox>
  );
}

export default App;
