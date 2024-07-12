import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { addResume } from "../redux/slices/resumeSlice";

const DashBoardModal: React.FC = () => {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  const resumes = useSelector((state: RootState) => state.persistedReducer.resumeSlice.resumes);
  const openModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  const closeModalAndCreateResume = () => {
    const modal = document.getElementById("my_modal_2");
    dispatch(addResume({ resumeId: resumes.length, resumeName: val }));
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };
  const closeModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };
  const personalDetails = useSelector(
    (state: RootState) => state.persistedReducer.personalDetailsSlice.personalDetails
  );

  return (
    <>
      <button className="btn px-5 mx-9" onClick={openModal}>
        Add Resume
      </button>
      <dialog id="my_modal_2" className="modal text-white">
        <div className="modal-box ">
          <div className="modal-action w-full flex items-center justify-evenly">
            <input
              type="text"
              placeholder="Resume Name"
              className="input input-bordered w-full max-w-xs"
              required
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
            {val !== "" && (
              <Link to={`/dashboard/${personalDetails.length}`}>
                <button className="btn" onClick={closeModalAndCreateResume}>
                  Add Resume
                </button>
              </Link>
            )}
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DashBoardModal;
