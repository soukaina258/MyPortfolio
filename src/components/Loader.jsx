import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json"; // update path

const Loader = () => {
  return (
    <div style={styles.wrapper}>
      <Lottie 
        animationData={loadingAnimation}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent"
  }
};

export default Loader;
