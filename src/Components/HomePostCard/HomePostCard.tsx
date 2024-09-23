import {Link} from "react-router-dom";
import './HomePostCard.scss';

interface HomePostCardProps {
    id: number,
    title: string,
    description: string,
};

function HomePostCard({ id, title, description }: HomePostCardProps) {

    function sliceDescription(description: string): string {
        const updatedDescription = description.split(' ').slice(0, 10).join(' ');
        return updatedDescription + '...';
    }

    return (
        <Link to={`/post/${id}`} className='post-card'>
                <img className="post-card__img" src={"https://placehold.co/200x200"} alt=""/>
                <div className="post-card__body">
                    <div className="post-card__title">
                        {title}
                    </div>
                    <div className="post-card__info">
                        <div className='info__elem description'>{sliceDescription(description)}</div>
                    </div>
                </div>
        </Link>
    );
}

export default HomePostCard;