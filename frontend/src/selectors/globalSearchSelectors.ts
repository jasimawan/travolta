import { useGlobalSearchContext, Guests } from "../context/GlobalSearchContext";

export const useLocation = () => {
  const { globalSearch, setGlobalSearch } = useGlobalSearchContext();
  const location = globalSearch.location;

  const setLocation = (newLocation: string) => {
    setGlobalSearch((prevState) => ({
      ...prevState,
      location: newLocation,
    }));
  };

  return { location, setLocation };
};

export const useCheckin = () => {
  const { globalSearch, setGlobalSearch } = useGlobalSearchContext();
  const checkin = globalSearch.checkin;

  const setCheckin = (newCheckin: string) => {
    setGlobalSearch((prevState) => ({
      ...prevState,
      checkin: newCheckin,
    }));
  };

  return { checkin, setCheckin };
};

export const useCheckout = () => {
  const { globalSearch, setGlobalSearch } = useGlobalSearchContext();
  const checkout = globalSearch.checkout;

  const setCheckout = (newCheckout: string) => {
    setGlobalSearch((prevState) => ({
      ...prevState,
      checkout: newCheckout,
    }));
  };

  return { checkout, setCheckout };
};

export const useGuests = () => {
  const { globalSearch, setGlobalSearch } = useGlobalSearchContext();
  const guests = globalSearch.guests;

  const setGuests = (newGuests: Guests) => {
    setGlobalSearch((prevState) => ({
      ...prevState,
      guests: newGuests,
    }));
  };

  return { guests, setGuests };
};
