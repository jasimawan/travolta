import Box from "@mui/material/Box";
import MainAppBar from "./components/Appbar";
import { GlobalSearch } from "./components/GlobalSearch";
import { GlobalSearchProvider } from "./context/GlobalSearchContext";

function App() {
  return (
    <GlobalSearchProvider>
      <Box>
        <MainAppBar />
        <GlobalSearch />
      </Box>
    </GlobalSearchProvider>
  );
}

export default App;
