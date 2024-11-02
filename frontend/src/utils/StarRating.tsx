import { FaStar } from 'react-icons/fa';
import { IoIosStar } from "react-icons/io";

type StarRatingProps = {
    rating: number; // Defina rating como number aqui
}

const StarRating = ({ rating }: StarRatingProps) => { // Apenas use StarRatingProps
    const fillPercentage = (rating / 5) * 100;
    return (
      <div className="relative">
        <IoIosStar className="text-xl text-gray-500" />
        <IoIosStar
          className="absolute top-0 left-0 text-xl text-customYellow"
          style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
        />
      </div>
    );
}

export default StarRating;