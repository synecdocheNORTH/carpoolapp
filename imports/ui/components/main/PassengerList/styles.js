import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  list: {
    overflow: "scroll",
    width: "90%",
    height: "35%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  button: {
    width: "20%",
    height: "10%",
    background: "#29eecb"
  },
  animation: {
    fontSize: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
  },
  quote: {
    fontSize: "25px",
    color: "white"
  },
  button: {
    background: "#29eecb",
    width: 75,
    height: 50,
    cursor: "pointer",
    borderRadius: "10px 10px 10px 10px",
    boxShadow: "0px 0px 13px 1px rgba(0,0,0,0.73)",
    border: "none",
    textTransform: "uppercase",
    fontSize: "12px"
  }
});
export default styles;
