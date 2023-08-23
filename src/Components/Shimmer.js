const Shimmer = () => {
  return (
    <div className="flex max-w-[1240px] mx-auto flex-wrap justify-center mt-16">
      {Array(12)
        .fill("")
        .map((e, index) => (
          <div
            key={index}
            className="w-80 h-60 p-4 mx-4 my-2 bg-gray-400 animate-pulse rounded-md"
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
