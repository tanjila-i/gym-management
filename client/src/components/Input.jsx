const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-8 ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-white font-bold" />
      </div>
      <input
        className="w-full pl-10 pr-3  rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
        {...props}
      />
    </div>
  );
};

export default Input;
// w-full pl-10 pr-3 py-2 px-8 input rounded-lg transition-all duration-200 box text-white placeholder-gray-400
