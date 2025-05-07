export default function DeloitteLogo({ className = "h-6" }) {
    return (
      <svg
        className={className}
        viewBox="0 0 300 60"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="0" y="45" fontSize="40" fontWeight="bold" fill="currentColor">
          Deloitte
        </text>
        <circle cx="275" cy="25" r="6" fill="#78BE20" />
      </svg>
    );
  }
  