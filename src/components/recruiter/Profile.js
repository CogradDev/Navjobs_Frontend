import { useEffect, useState } from "react";
import apiList from "../../libs/apiLists";
import { toast } from "react-toastify";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
    console.log("key is :  ", key, " Value is :  ", value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(apiList.user, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await response.json();
      if (json.success) {
        setProfileDetails(json.data);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async () => {
    if (
      profileDetails.contactNumber.length > 13 ||
      profileDetails.contactNumber.length < 13
    ) {
      toast.warn("Enter valid contact number\n+91..........");
      return;
    }

    setIsClicked(true);

    try {
      const response = await fetch(apiList.user, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileDetails),
      });

      const json = await response.json();
      if (json.success) {
        getData();
        toast.success("Profile updated successfully.");
        setIsClicked(false);
        setModalOpen(false);
      } else {
        toast.error(json.message);
        setIsClicked(false);
        setModalOpen(false);
      }
    } catch (err) {
      toast.error(err.message);
      setIsClicked(false);
      setModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold my-8">Profile</h2>
      {isModalOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={profileDetails.name}
              onChange={(event) => handleInput("name", event.target.value)}
              className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Bio (upto 250 words)
            </label>
            <textarea
              id="bio"
              rows="4"
              value={profileDetails.bio}
              onChange={(event) => {
                if (
                  event.target.value.split(" ").filter(function (n) {
                    return n !== "";
                  }).length <= 250
                ) {
                  handleInput("bio", event.target.value);
                }
              }}
              className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="contact"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              value={profileDetails.contactNumber}
              onChange={(event) =>
                handleInput("contactNumber", event.target.value)
              }
              className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
            />
          </div>
          <button
            onClick={handleUpdate}
            className={`${
              isClicked ? "animate-pulse" : "animate-none"
            } w-full my-6 px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:bg-blue-600`}
          >
            Update Details
          </button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center my-12">
          <div className="border border-blue-400 shadow-lg shadow-gray-400 rounded-lg  p-4 text-gray-700 w-full lg:w-[70%]">
            <div className="flex items-center justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png"
                alt="Profile"
                className="w-40 h-24"
              />
            </div>

            <div className="text-center text-2xl font-semibold my-2 mb-6">
              <p>
                Hello{" "}
                <span className="text-blue-600">{profileDetails.name}</span>
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold mb-2">
                Contact Number:{" "}
                <span className="font-normal">
                  {profileDetails.contactNumber}
                </span>
              </p>
            </div>
            <div className="">
              <p className="text-xl font-semibold">
                Bio: <span className="font-normal">{profileDetails.bio}</span>
              </p>
            </div>

            <div
              className="text-center my-4"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <button className="border border-gray-400 py-1 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
