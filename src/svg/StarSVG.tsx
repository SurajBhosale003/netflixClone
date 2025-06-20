const StarSVG = ({ className = "h-8 w-24 " }) => {
    return (
        <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={className}
        >
        <path
            fill="currentColor"
            d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z"
        ></path>
        </svg>
    );
  };
  
  export default StarSVG;
  