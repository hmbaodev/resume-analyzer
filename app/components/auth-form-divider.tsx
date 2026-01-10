const AuthFormDivider = () => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-gray-500">or</span>
      </div>
    </div>
  );
};

export default AuthFormDivider;
