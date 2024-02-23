import { useCallback } from "react";
import { useSnackbar } from "../context/SnackbarProvider";
import { Hotel } from "../types";

const useFetcher = () => {
  const { openSnackbar } = useSnackbar();

  const fetcher = useCallback(
    async (url: string) => {
      try {
        const response = await fetch(url);
        return response.json();
      } catch (e: any) {
        openSnackbar({ message: e.message, severity: "error" });
      }
    },
    [openSnackbar]
  );

  const mutator = useCallback(
    async (url: string, { arg }: { arg: Hotel }) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(arg),
        });
        return response.json();
      } catch (e: any) {
        openSnackbar({ message: e.message, severity: "error" });
      }
    },
    [openSnackbar]
  );

  return { fetcher, mutator };
};

export default useFetcher;
