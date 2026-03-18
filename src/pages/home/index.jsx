// Landing page pública da aplicação.
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/banner.png';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { ROUTES } from '../../routes/paths';

import { Banner, Container, Content, Title, TitleHighlight, TextContent } from './styles';

const Home = () => {
  return (
    <>
      <Header />
      {/* A home é o conteúdo principal da rota pública, então expomos uma landmark `main`. */}
      <Container as="main" id="page-content">
        <Content>
          <Title>
            <TitleHighlight>
              Implemente <br />
            </TitleHighlight>
            o seu futuro global agora!
          </Title>
          <TextContent>
            Domine as tecnologias utilizadas pelas empresas mais inovadoras do mundo e encare seu
            novo desafio profissional, evoluindo em comunidade com os melhores experts.
          </TextContent>
          <Button
            as={Link}
            size="lg"
            to={ROUTES.register}
            title="Começar agora"
            variant="secondary"
          />
        </Content>

        <Banner
          src={bannerImage}
          alt="Ilustração de desenvolvimento de software com uma pessoa utilizando notebook."
        />
      </Container>
    </>
  );
};

export { Home };
