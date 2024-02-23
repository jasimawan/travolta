import { useCallback } from "react";
import { useSnackbar } from "../context/SnackbarProvider";

const useFetcher = () => {
  const { openSnackbar } = useSnackbar();

  const fetcher = useCallback(
    async (url: string, options?: RequestInit) => {
      try {
        const response = await fetch(url, options);
        return response.json();
      } catch (e: any) {
        openSnackbar({ message: e.message, severity: "error" });
      }
    },
    [openSnackbar]
  );

  return { fetcher };
};

export default useFetcher;
