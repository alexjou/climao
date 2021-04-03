import React from "react";

import styled from "styled-components";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";

//Estilização com Styled Component
const Container = styled.div`
  color: #fff;
  text-align: center;
  font-style: italic;
  margin-top: 40px;
  margin-bottom: 30px;
`;

function Footer() {
  //Pegando o ano em que estamos
  const year = new Date().getFullYear();
  return (
    <Container>
      {/* Link para meu Portfólio */}
      <a
        href="https://alexjou.github.io/meu-portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginRight: "20px" }}
      >
        <ImportantDevicesIcon /> Meu Portfólio
      </a>

      <span>• Álex Joubert • {year}</span>
    </Container>
  );
}

export default Footer;
