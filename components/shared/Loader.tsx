type LoaderProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const Loader = ({
  width = 2,
  height = 10,
  color = "bg-orange-1",
}: LoaderProps) => {
  return (
    <div
      className={`relative w-${width} h-${height} ${color} rounded-lg mx-auto my-5 animate-pulse`}
    >
      <div
        className={`absolute top-1/2 w-${width} h-${height} ${color} rounded-lg transform -translate-y-1/2 -left-5 animate-loader-pulse delay-150`}
      ></div>
      <div
        className={`absolute top-1/2 w-${width} h-${height} ${color} rounded-lg transform -translate-y-1/2 left-5 animate-loader-pulse delay-300`}
      ></div>
    </div>
  );
};

export default Loader;
