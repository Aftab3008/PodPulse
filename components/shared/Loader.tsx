const Loader = () => {
  return (
    <div className="relative w-2 h-10 bg-orange-1 rounded-lg mx-auto my-5 animate-pulse">
      <div className="absolute top-1/2 w-2 h-10 bg-orange-1 rounded-lg transform -translate-y-1/2 -left-5 animate-loader-pulse delay-150"></div>
      <div className="absolute top-1/2 w-2 h-10 bg-orange-1 rounded-lg transform -translate-y-1/2 left-5 animate-loader-pulse delay-300"></div>
    </div>
  );
};

export default Loader;
