import { Link } from "react-router-dom";
import bannerImage from '../../assets/banner.png'

import { Button } from '../../components/Button';

import { Header } from '../../components/Header';

import { Banner, Container, Content, Title, TitleHighlight, TextContent } from './styles';

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>
            <TitleHighlight>
              Implemente <br />
            </TitleHighlight>
            o seu futuro global agora!
          </Title>
          <TextContent>
            Domine as tecnologias utilizadas pelas empresas mais inovadoras do mundo e encare seu novo
            desafio profissional, evoluindo em comunidade com os melhores experts.
          </TextContent>
          <Button as={Link} to="/cadastro" title="Começar agora" variant="secondary" />
        </Content>

        <Banner src={bannerImage} alt="Imagem principal do site." />
      </Container>
    </>
  );
};

export { Home }
