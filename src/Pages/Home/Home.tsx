import Container from "react-bootstrap/Container";
import "./Home.scss";

function Home() {
    return (
        <Container className="home">
            <h1 className={"text-uppercase title text-center"}>Brand name</h1>
            <div className={"text-center home-text"}>
                Временный текст используется для демонстрации макета страницы и не несет смысла. Он помогает увидеть, как будет выглядеть окончательный дизайн. Обратите внимание на шрифты, интерлиньяж и отступы, чтобы сделать проект гармоничным.
            </div>
        </Container>
    );
}

export default Home;