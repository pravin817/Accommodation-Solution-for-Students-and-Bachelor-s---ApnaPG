import { useSelector } from "react-redux";
import backIcon from "../../assets/BasicIcon/backIcon.png";

import { LiaGreaterThanSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";

const governmentDocumentDetail = [
  {
    id: 1,
    title: "Passport",
    description: "Face photo page",
    to: "/doc",
  },
  {
    id: 2,
    title: "Aadhaar Card",
    description: "Front and back page",
    to: "/verify-phone",
  },
  {
    id: 3,
    title: "PAN Card",
    description: "Front and back page",
    to: "/verify-email",
  },
];

const VerifyDocuments = () => {
  // get the house photos from redux
  const photos = useSelector((state) => state.room.newRoom?.photos);
  const user = useSelector((state) => state.user.userDetails);
  console.log("User", user);

  const userId = user?._id;
  console.log("The user Id is ", userId);

  const navigate = useNavigate();

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
          Verify Documents
        </h5>
      </div>

      <div className="mt-2">
        <hr className="mt-2 w-full h-[1px] bg-[#dddddd] z-0" />

        <div className="mt-10 w-10/12 mx-auto">
          <p className="text-[#222222] font-semibold ">
            Which document would you like to upload?
          </p>

          <div className="mt-4 p-3">
            {governmentDocumentDetail.map((document) => {
              return (
                <div key={document.id}>
                  <Link
                    to={`/users/show/${userId}/verify-account/verify-documents/doc/${document.id}`}
                    className="flex items-center justify-between border mb-4 p-3 rounded-lg hover:bg-[#f1f1f1] cursor-pointer transition duration-200"
                  >
                    <div>
                      <h4 className="text-[#222222] text-base md:text-[18px] font-medium">
                        {document.title}
                      </h4>
                      <p className="text-base md:text-sm mt-2 text-[#717171]">
                        {document.description}
                      </p>
                    </div>
                    <div>
                      <LiaGreaterThanSolid />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyDocuments;
