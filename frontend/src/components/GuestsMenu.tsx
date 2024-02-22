import React, { memo, useCallback, useMemo, useState } from "react";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useGuests } from "../selectors/globalSearchSelectors";

interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

type GuestType = keyof Guests;

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0, 12px !important",
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-start",
}));

const GuestsMenu: React.FC = () => {
  const { guests, setGuests } = useGuests();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const totalGuests = useMemo(
    () => Object.values(guests).reduce((acc, val) => acc + val, 0),
    [guests]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIncrement = (type: GuestType) => {
    setGuests({ ...guests, [type]: guests[type] + 1 });
  };

  const handleDecrement = (type: GuestType) => {
    if (guests[type] > 0) {
      setGuests({ ...guests, [type]: guests[type] - 1 });
    }
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained">
        {`Add Guests (${totalGuests})`}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {Object.entries(guests).map(([guestType, count]) => (
          <MenuItem
            key={guestType}
            count={count}
            guestType={guestType as GuestType}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
      </Menu>
    </div>
  );
};

const MenuItem = memo(
  ({
    onDecrement,
    onIncrement,
    guestType,
    count,
  }: {
    guestType: GuestType;
    count: number;
    onDecrement: (guestType: GuestType) => void;
    onIncrement: (guestType: GuestType) => void;
  }) => {
    const handleIncrement = useCallback(() => {
      onIncrement(guestType);
    }, [onIncrement, guestType]);

    const handleDecrement = useCallback(() => {
      onDecrement(guestType);
    }, [onDecrement, guestType]);

    return (
      <StyledContainer>
        <Typography width="50%">{`${guestType.toUpperCase()}:`}</Typography>
        <StyledBox>
          <Button onClick={handleDecrement}>-</Button>
          <Typography>{count}</Typography>
          <Button onClick={handleIncrement}>+</Button>
        </StyledBox>
      </StyledContainer>
    );
  }
);

export default GuestsMenu;
