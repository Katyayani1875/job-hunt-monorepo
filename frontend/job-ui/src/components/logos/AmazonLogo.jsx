export default function AmazonLogo({ className = "h-6" }) {
    return (
      <svg
        className={className}
        viewBox="0 0 400 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="0" y="60" fontSize="60" fontWeight="bold" fill="currentColor">
          amazon
        </text>
        <path
          d="M50 75 C150 110, 250 110, 350 75"
          stroke="#FF9900"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M330 65 l-10 15 l20 -10"
          fill="#FF9900"
        />
      </svg>
    );
  }
  