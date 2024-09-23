import Container from "react-bootstrap/Container";
import "./Home.scss";
import {useState, useEffect} from "react";
import axios from "axios";
import HomePostCard from "../../Components/HomePostCard/HomePostCard.tsx";
import {Link} from "react-router-dom";

interface Post {
    id: number,
    title: string,
    author: string,
    description: string,
}

function Home() {

    const [posts, setPosts] = useState<Post[]>([]);

   useEffect( () => {
       getPosts().then((data) => {
           setPosts(data);
       });
   })

    async function getPosts() {
        try {
            const postRequest = await axios.get(`${import.meta.env.VITE_API_URL}/post/`, {});
            return postRequest.data;
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    }

    return (
        <Container className="home">
            <h3 className={"text-uppercase text-center"}>Slogan</h3>
            <h1 className={"text-uppercase text-center"}>Best decision<br/> to your service</h1>
            <div className={"text-center home-text"}>
                Placeholder text is used to demonstrate the layout of the page and does not carry any meaning. It helps to see how the final design will look. Pay attention to fonts, line spacing, and margins to make the project harmonious.
            </div>
            <div className="division-line"></div>
            <div className="brows-posts">
                <div className="brows-posts__top">
                    <div className="brows-posts__left"><h2>Brows posts</h2></div>
                    <div className="brows-posts__right text-center">Explore all the components and pages below. They can
                        be reused across all your projects and easily customized to fit your brand and project needs.
                    </div>
                </div>
                <div className="division-line"></div>
                <div className="brows-posts__bottom">
                    {
                        posts.map(post => (
                            <HomePostCard key={post.id} id={post.id} title={post.title} description={post.description}>
                            </HomePostCard>
                        ))
                    }
                </div>
                <Link to={"/post"}  className="brows-posts__learn-more">Learn more</Link>
            </div>
        </Container>
    );
}

export default Home;