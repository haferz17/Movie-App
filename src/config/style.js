import { wp, fp, hp } from "../utils/Responsive";

const AppStyles = {
  color: {
    primary: "#2196f3",
    light: "#fff",
    lightGrey: '#eee',
    black: '#000',
    grey: '#ccc',
  },
  font: {
    regular: "OpenSans-Regular",
    light: "OpenSans-Light",
    semiBold: "OpenSans-SemiBold",
    bold: "OpenSans-Bold",
    extraBold: "OpenSans-ExtraBold",
  },
  fontSize: {
    semiSmall: fp(1.8),
    small: fp(2.05),
    extraSmall: fp(2.15),
    semiMedium: fp(2.2),
    medium: fp(2.5),
    extraMedium: fp(2.7),
    semiLarge: fp(3.5),
    large: fp(4),
    extraLarge: fp(5),
    extra: fp(8),
  },
  fontColor: {
    primary: "#2196f3",
    black: "#000",
    light: "#fff",
    grey: '#ccc',
    placeholder: '#bbb',
  },
  margin: {
    horizontal: wp(6),
    vertical: hp(5)
  },
};

export default AppStyles;
