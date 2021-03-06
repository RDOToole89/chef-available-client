import React from "react";
import dayStyles, { availableStyles } from "./styles.js";
import { addAvailableDate, removeAvailableDate } from "../../store/users/userActions";
import { useDispatch } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Day = (props) => {
  const { dayIndex, same, day, selectedDate } = props;
  const dispatch = useDispatch();
  return (
    <OverlayTrigger
      delay={{ show: 300, hide: 100 }}
      placement={"bottom"}
      overlay={<Tooltip>Toggle availability</Tooltip>}
    >
      <div
        key={dayIndex}
        style={availableStyles(same)}
        className="day"
        onClick={() => {
          const availableDate = day.format("YYYY-MM-DD");
          if (same) {
            dispatch(removeAvailableDate(availableDate));
          } else {
            dispatch(addAvailableDate(availableDate));
          }
        }}
      >
        <div className={dayStyles(day, selectedDate)}>{day.format("D")}</div>
      </div>
    </OverlayTrigger>
  );
};

export default Day;
