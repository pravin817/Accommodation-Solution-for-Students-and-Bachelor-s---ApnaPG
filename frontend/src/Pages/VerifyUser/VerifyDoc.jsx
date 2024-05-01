import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import { LiaPhotoVideoSolid } from "react-icons/lia";

import { LiaGreaterThanSolid } from "react-icons/lia";
import { useNavigate, useParams } from "react-router-dom";
import { createNewRoom } from "../../redux/actions/roomActions";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
import api, { API } from "../../backend";

const governmentDocumentDetail = [
  {
    id: 1,
    title: "Passport ",
    description: "Upload the image of the passport photo page",
  },
  {
    id: 2,
    title: "Aadhaar Card",
    description: "Upload the image of the front page of the Aadhaar Card",
  },
  {
    id: 3,
    title: "PAN Card",
    description: "Upload the image of the front page of the PAN Card",
  },
];

const VerifyDoc = () => {
  // get the house photos from redux
  const photos = useSelector((state) => state.room.newRoom?.photos);
  const user = useSelector((state) => state.user.userDetails);

  const navigate = useNavigate();

  const { id } = useParams();

  const newRoomData = useSelector((state) => state.room.newRoom);
  const [image, setImage] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageSelect = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setInputImage(selectedImage);
    }
  };

  // upload Image to DB
  useEffect(() => {
    async function uploadImagetoDB() {
      setIsImageUploading(true);
      if (image) {
        let document = {
          image: image,
          docType: governmentDocumentDetail[id - 1].title,
        };

        const res = await api.post("/auth/verify-id", document, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("The response is ", res);
        toast.success("Image uploaded successfully");

        setIsImageUploading(false);
      }
    }
    // const uploadImagetoDB = async () => {
    //   try {
    //     console.log("upload Image to db called", image);
    //     const res = await axios.post(
    //       `${api}auth/verify-id`,
    //       {
    //         image: image,
    //         docType: governmentDocumentDetail[id - 1].title,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     console.log("The response is ", res.data);
    //     if (res?.data?.success) {
    //       toast.success("Image uploaded successfully");
    //     } else {
    //       toast.error("Image upload failed");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    uploadImagetoDB();
  }, [image]);

  const handleUploadImage = async () => {
    if (!inputImage) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsImageUploading(true);

    const imageFormData = new FormData();
    imageFormData.append("file", inputImage);
    imageFormData.append("upload_preset", "ApnaPG_preset");
    imageFormData.append(
      "cloud_name",
      import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
    );

    // saving to cloudinary
    try {
      let cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
      let url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      await fetch(url, {
        method: "POST",
        body: imageFormData,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setImage(data.url);

          if (data.error) {
            toast.error(data?.error?.message);
            setIsImageUploading(false);
          } else {
            setIsImageUploading(false);
          }
        })
        .catch((err) => {
          toast.error(err.message + "try again");
          setIsImageUploading(false);
        });
    } catch (error) {
      console.log(error);
      toast.error(error);
      setIsImageUploading(false);
    } finally {
      setIsImageUploading(false);
      setInputImage(null);
    }
  };

  return (
    <section className=" max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-20 py-8 md:py-12">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className=" flex flex-rows gap-3 items-center"
      >
        <img
          src={backIcon}
          alt="back"
          className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
        />
        <h5 className="text-[#222222] text-xl font-semibold">
          Upload {governmentDocumentDetail[id - 1].title}
        </h5>
      </div>

      <div className="mt-2">
        <hr className="mt-2 w-full h-[1px] bg-[#dddddd] z-0" />

        <div className="mt-10 w-11/12 mx-auto">
          <div className="w-11/12 mx-auto flex flex-col items-center justify-center ">
            <h2 className="text-xl font-semibold p-2 text-center">
              {governmentDocumentDetail[id - 1].title}
            </h2>{" "}
            <p className="text-base text-center">
              {governmentDocumentDetail[id - 1].description}
            </p>
            <label
              htmlFor="houseImage"
              className=" py-20 mt-3 mb-4 bg-white border-dashed border-[#b0b0b0] border flex justify-center items-center max-h-[250px] w-10/12"
            >
              {/* {isImageUploading ? (
                <>
                  <PropagateLoader loading color="#717171" />
                </>
              ) : ( */}
              <div className=" flex flex-col justify-center items-center gap-3">
                <div>
                  <LiaPhotoVideoSolid size={72} />
                </div>
                <div className="text-center h-[100px]">
                  <h6 className=" text-xl text-black font-medium py-2">
                    Select your photo of{" "}
                    {governmentDocumentDetail[id - 1].title} here
                  </h6>

                  <p className=" text-black text-sm underline underline-offset-2 font-medium cursor-pointer">
                    Upload from your device
                  </p>
                </div>
              </div>
              {/* )} */}
              <input
                type="file"
                name="photos"
                className=" hidden"
                onChange={handleImageSelect}
                id="houseImage"
                multiple
                accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
              />
            </label>
            <div
              className="btn bg-black px-2 py-1 rounded-md text-white cursor-pointer"
              onClick={handleUploadImage}
            >
              Upload
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyDoc;
