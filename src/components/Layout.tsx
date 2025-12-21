import styled from 'styled-components';
// import bgImg from "../../public/img/bg.jpg";


export const Layout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  min-width: ${(p) =>
    p.theme.dimensions.minWidth + p.theme.dimensions.sidebarX + 40}px;
  min-height: 600px;

  background-image: url("/img/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;


export const Sidebar = styled.aside`
    position: relative;
    flex-basis: ${(p) => p.theme.dimensions.sidebarX}px;
    background-color: ${(p) => p.theme.colors.bgSidebar};
    padding-top: 120px;
    color: ${(p) => p.theme.colors.textDefault};
    display: flex;
    flex-direction: column;

    img {
        position: absolute;
        top: 0;
        left: 16px;
        height: 140px;
        width: 70%;
        margin: auto;
    }

    
`;

export const Main = styled.main`
    position: relative;
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
`;
