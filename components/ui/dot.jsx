
  
  export default function Dot({
    color = "#000000",
    size = 3,
    spacing = 100,
    children,
    className="bg-primary",
    style = {
      backgroundColor: "#",
    },
  }) {
    return (
      <div
        style={{
          ...style,
          backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
          backgroundSize: `calc(${spacing} * ${size}px) calc(${spacing} * ${size}px)`,
        }}
        className={className}
      >
        {children}
      </div>
    );
  }
  