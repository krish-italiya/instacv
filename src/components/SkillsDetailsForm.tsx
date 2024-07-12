import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { addCategory, removeCategory } from "../redux/slices/skillSlice";
import SkillsForm from "./SkillsForm";

const SkillsDetailsForm = () => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const id = Number(resumeId);
  const categories = useSelector((state: RootState) => {
    return state.persistedReducer.skillsSlice.skills[id].skillsDetail;
  });

  const handleAddCategory = () => {
    dispatch(addCategory(id));
  };

  return (
    <>
      <div className="container flex flex-col items-center text-white w-full">
        {categories.map((_, index) => (
          <>
            {index > 0 && <hr className="bg-white py-2" />}
            <div key={index}>
              <SkillsForm categoryId={index} />
              <button
                className="btn btn-outline btn-secondary"
                onClick={() =>
                  dispatch(
                    removeCategory({
                      resumeId: id,
                      categoryId: index,
                    })
                  )
                }
              >
                Remove Category
              </button>
            </div>
          </>
        ))}
        <div className="my-3">
          <button className="btn  btn-outline" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>
      </div>
    </>
  );
};

export default SkillsDetailsForm;
