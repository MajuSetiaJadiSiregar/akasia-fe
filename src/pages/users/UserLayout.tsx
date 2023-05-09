import styled from "styled-components";
import { useState } from "react";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import Footer from "components/Footer";


type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpened, setOpened] = useState(false);
  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer} />
      <Content>
        <Sidebar isOpened={isOpened} />
        <PageContainer>{children}</PageContainer>
      </Content>
      <Footer />
    </Container>
  );
}


const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: ${(props) => props.theme.colors.textDark};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const PageContainer = styled.div`
  padding: 20px;
  width: 80vw;
`;
