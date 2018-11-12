import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Meteor } from "meteor/meteor";
import CircularIndeterminate from "../../loadingSpinner/index";
import ProfileCard from "../../profileCard";
import Button from "@material-ui/core/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Slide from "@material-ui/core/Slide";

library.add(faCarSide, faCheckCircle);

class PassengerList extends Component {
  constructor() {
    super();
    this.state = {
      partnerId: null
    };
  }

  passengerArray = (allUserInfo, myUserInfo) => {
    const passengers = allUserInfo
      .filter(record => {
        return record.passenger;
      })
      .filter(record => {
        return !record.occupied;
      })
      .filter(passenger => {
        return (
          (passenger.destination.lat === myUserInfo[0].destination.lat &&
            passenger.destination.long === myUserInfo[0].destination.long) ||
          (passenger.destination.lat === !null &&
            passenger.destination.long === !null)
        );
      });
    console.log(passengers);
    return passengers;
  };

  updateToPending = event => {
    let passengerId = event.target.name;
    Meteor.call("rides.updateToPending", passengerId);
    Meteor.call("usersInfo.updateOccupied", passengerId);
  };

  render() {
    const {
      classes,
      allUserInfo,
      myUserInfo,
      loading,
      ridesLoading,
      rides
    } = this.props;

    const actualRide = rides.filter(ride => {
      const final =
        ride.driverId === Meteor.userId() ||
        ride.passengerId === Meteor.userId();
      return final;
    });

    const driver = myUserInfo[0].driver;
    return driver ? (
      !ridesLoading && actualRide[0].rideStates === "initial" ? (
        <div className={classes.list}>
          {!loading &&
            myUserInfo[0].driver === true &&
            this.passengerArray(allUserInfo, myUserInfo).map(
              (record, index) => {
                return (
                  <React.Fragment key={index}>
                    <ProfileCard
                      className={classes.card}
                      key={index}
                      user={record}
                    />
                    <button
                      className={classes.button}
                      name={record.id}
                      onClick={event => {
                        this.updateToPending(event);
                      }}
                    >
                      Accept
                    </button>
                  </React.Fragment>
                );
              }
            )}
        </div>
      ) : !ridesLoading && actualRide[0].rideStates === "pending" ? (
        <div>
          <CircularIndeterminate />
        </div>
      ) : (
        !ridesLoading &&
        actualRide[0].rideStates === "matched" && (
          <div className={classes.animation}>
            <Slide in={true} direction="up" timeout={1000}>
              <FontAwesomeIcon
                className={classes.car}
                icon="car-side"
                spin={true}
              />
            </Slide>
            <Slide in={true} direction="up" timeout={1000}>
              <p className={classes.quote}>Enroute to your destination...</p>
            </Slide>
          </div>
        )
      )
    ) : !ridesLoading && !actualRide[0] ? (
      <div className={classes.animation}>
        <p className={classes.quote}>
          Please select a destination. Drivers going to the same destination
          will be listed in this panel.
        </p>
      </div>
    ) : !ridesLoading && actualRide[0].rideStates === "pending" ? (
      <div className={classes.loading}>
        <CircularIndeterminate className={classes.loadingAnimation} />
      </div>
    ) : (
      !ridesLoading &&
      actualRide[0].rideStates === "matched" && (
        <div className={classes.animation}>
          <FontAwesomeIcon
            className={classes.car}
            icon="car-side"
            spin={true}
          />
          <Slide in={true} direction="up" timeout={1000}>
            <p className={classes.quote}>
              Driver is on the way. Please wait a moment...
            </p>
          </Slide>

          <Slide in={true} direction="up" timeout={1000}>
            <p className={classes.quote}>
              Press "Cancel trip" to cancel your trip or press "End trip" once
              your trip has ended.
            </p>
          </Slide>
        </div>
      )
    );
  }
}

export default withStyles(styles)(PassengerList);
