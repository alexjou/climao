import clearSkyD from "../assets/images/01d.gif";
import clearSkyN from "../assets/images/01n.gif";
import fewCloudsD from "../assets/images/02d.gif";
import fewCloudsN from "../assets/images/02n.gif";
import scatteredClouds from "../assets/images/03.gif";
import brokenClouds from "../assets/images/03.gif";
import showerRainD from "../assets/images/09.gif";
import rainD from "../assets/images/02d.gif";
import thunderstormD from "../assets/images/11.gif";
import snowD from "../assets/images/13.gif";
import mistD from "../assets/images/02d.gif";

//Gifs para mostrar na tela de acordo com o tempo meteorológico

var data = new Date();
var day = data.getHours();

const types = {
  200: thunderstormD,
  201: thunderstormD,
  202: thunderstormD,
  210: thunderstormD,
  211: thunderstormD,
  212: thunderstormD,
  221: thunderstormD,
  230: thunderstormD,
  231: thunderstormD,
  232: thunderstormD,

  300: showerRainD,
  301: showerRainD,
  302: showerRainD,
  310: showerRainD,
  312: showerRainD,
  313: showerRainD,
  314: showerRainD,
  321: showerRainD,

  500: rainD,
  501: rainD,
  502: rainD,
  503: rainD,
  504: rainD,
  511: snowD,
  520: thunderstormD,
  521: thunderstormD,
  522: thunderstormD,
  531: thunderstormD,

  600: snowD,
  601: snowD,
  602: snowD,
  611: snowD,
  612: snowD,
  613: snowD,
  615: snowD,
  616: snowD,
  620: snowD,
  621: snowD,
  622: snowD,

  701: mistD,
  711: mistD,
  721: mistD,
  731: mistD,
  741: mistD,
  751: mistD,
  761: mistD,
  762: mistD,
  771: mistD,
  781: mistD,

  800: day > 5 && day < 18 ? clearSkyD : clearSkyN,
  801: day > 5 && day < 18 ? fewCloudsD : fewCloudsN,
  802: scatteredClouds,
  803: brokenClouds,
  804: brokenClouds,
};

export default types;
