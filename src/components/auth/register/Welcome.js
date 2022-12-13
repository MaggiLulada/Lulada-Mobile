import React from "react";
import { useTranslation } from "react-i18next";
import Swiper from "../../swiper/Swiper";

const Welcome = ({ navigation }) => {

  const {t, i18n} = useTranslation()

  return (
    <Swiper
      pages={[
        {
          title: t("welcome_title1"),
          description: t("welcome_description1"),
          image: require('../../../assets/images/background/Welcome_1.jpeg'),
          positionImage: "down",
          background: "#FFFFFF",
          active:0
        },
        {
          title: t("welcome_title2"),
          description: t("welcome_description2"),
          image: require('../../../assets/images/background/Welcome_2.jpeg'),
          positionImage: "up",
          background: "#FFFFFF",
          active:1
        },
        
      ]}
      actionPress='Register'
    />
  );
};

export default Welcome;