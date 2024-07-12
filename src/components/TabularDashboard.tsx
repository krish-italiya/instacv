import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DashBoardModal from "./DashBoardModal";
import { Link } from "react-router-dom";
import { removeResume, ResumeDetail } from "../redux/slices/resumeSlice";
import { removePersonalDetailSection } from "../redux/slices/personalDetailsSlice";
import { removeEducationSection } from "../redux/slices/educationSlice";
import { removeExperienceSection } from "../redux/slices/experienceSlice";
import { removeProjectSection } from "../redux/slices/projectDetailsSlice";
import { removeSkillSection } from "../redux/slices/skillSlice";

const TabularDashboard: React.FC = () => {
  const resumes = useSelector(
    (state: RootState) => state.persistedReducer.resumeSlice.resumes
  );
  const [resume, setResume] = useState<{
    resume: ResumeDetail;
  }>({ resume: { resumeId: 0, resumeName: "" } });
  const dispatch = useDispatch();
  const openModal = (resume: ResumeDetail) => {
    setResume({ resume });
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };
  const closeModalAndDelete = (id: number) => {
    const modal = document.getElementById("my_modal_1");
    dispatch(removeResume({ resumeId: id }));
    dispatch(removePersonalDetailSection({ resumeId: id }));
    dispatch(removeEducationSection({ resumeId: id }));
    dispatch(removeExperienceSection({ resumeId: id }));
    dispatch(removeProjectSection({ resumeId: id }));
    dispatch(removeSkillSection({ resumeId: id }));
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };

  return (
    <>
      <div className="flex  p-8 flex-col">
        <div className="-m-1.5  overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr key="header">
                    <th
                      key="header-name"
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Resume Name
                    </th>
                    <th
                      key="header-edit"
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Edit Resume
                    </th>
                    <th
                      key="header-delete"
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                {resumes.length > 1 &&
                  resumes.map((resume, index) =>
                    index > 0 ? (
                      <tbody
                        key={resume.resumeId} // Use resumeId as the unique key
                        className="divide-y divide-gray-200 dark:divide-neutral-700"
                      >
                        <tr
                          key={resume.resumeId}
                          className="hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            {resume.resumeName}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <Link to={`/dashboard/${index}`}>
                              <button
                                type="button"
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                              >
                                Edit Resume
                              </button>
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                              onClick={() => openModal(resume)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <></>
                    )
                  )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal text-white">
        <div className="modal-box ">
          <div className="modal-action w-full flex items-center justify-evenly">
            <p>
              Do you want to Delete{" "}
              {`'${resume && resume.resume.resumeName}' Resume?`}
            </p>
            <button
              className="btn"
              onClick={() => {
                if (resume) {
                  closeModalAndDelete(resume.resume.resumeId);
                }
              }}
            >
              Yes
            </button>
            <button className="btn" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </dialog>
      <div>
        <div className="flex flex-col gap-4">
          <DashBoardModal />
        </div>
      </div>
    </>
  );
};

export default TabularDashboard;
