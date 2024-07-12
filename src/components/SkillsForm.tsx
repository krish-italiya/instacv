import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import {
  addSkill,
  removeSkill,
  Skills,
  updateSkillsDetails,
} from "../redux/slices/skillSlice";

interface SkillsFormProps {
  categoryId: number;
}

const SkillsForm = ({ categoryId }: SkillsFormProps) => {
  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>();
  const id = Number(resumeId);
  const category = useSelector((state: RootState) => {
    return state.persistedReducer.skillsSlice.skills[id].skillsDetail[categoryId];
  });

  const handleInputChange = (field: keyof Skills, value: string | string[]) => {
    dispatch(
      updateSkillsDetails({
        resumeId: id,
        categoryId: categoryId,
        skillDetails: { [field]: value },
      })
    );
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...(category.skills || [])];
    newSkills[index] = value;
    handleInputChange("skills", newSkills);
  };
  return (
    <>
      <div className="flex flex-col pros text-white w-full">
        <div className="flex gap-5 items-start">
          <label className="input input-bordered flex flex-grow items-center gap-2 my-4 w-full">
            <input
              type="text"
              className="grow"
              name="category"
              placeholder="Skill Category"
              value={category.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            />
          </label>
        </div>
        {category.skills.map((skill, index) => (
          <div className="flex flex-grow gap-2 items-center w-full" key={index}>
            <label className="input input-bordered flex items-center gap-2 my-4 w-full">
              <input
                type="text"
                className=" w-full"
                placeholder={`Skill ${index + 1}...`}
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
            </label>
            <button
              className="btn btn-ghost text-slate-200"
              onClick={() =>
                dispatch(
                  removeSkill({
                    resumeId: id,
                    categoryId,
                    skillId: index,
                  })
                )
              }
            >
              Remove
            </button>
          </div>
        ))}
        <div className="w-full">
          <button
            className="btn btn-outline text-white w-full my-2"
            onClick={() => dispatch(addSkill({ resumeId: id, categoryId }))}
          >
            Add Skill
          </button>
        </div>
      </div>
    </>
  );
};

export default SkillsForm;
