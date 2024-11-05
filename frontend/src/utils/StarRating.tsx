import { IoIosStar } from "react-icons/io";

type StarRatingProps = {
    rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
    const fillPercentage = (rating / 5) * 100;
    return (
      <div className="relative">
        <IoIosStar className="text-[1.3rem] text-gray-500" />
        <IoIosStar
          className="absolute top-0 left-0 text-[1.3rem] text-customYellow"
          style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
        />
      </div>
    );
}

export default StarRating;