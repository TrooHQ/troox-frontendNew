const TopMenuNav = () => {
  const userName = "John Doe";
  //   const userProfilePic = "https://example.com/profile-pic.jpg";
  return (
    <div className="">
      <div className="p-4 w-full">
        <div className="flex justify-end items-center">
          <div className="text-lg font-bold">{userName}</div>
        </div>
      </div>
    </div>
  );
};

export default TopMenuNav;
