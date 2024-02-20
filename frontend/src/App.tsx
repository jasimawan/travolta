import Box from "@mui/material/Box";
import MainAppBar from "./components/Appbar";
import { GlobalSearch } from "./components/GlobalSearch";

function App() {
  return (
    <Box>
      <MainAppBar />
      <GlobalSearch />
    </Box>
  );
}

export default App;
