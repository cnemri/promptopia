import PromptCard from "./PromptCard";
import React from "react";

interface ProfileProps {
  name: string;
  desc: string;
  data: Array<any>;
  handleEdit?: (post: { _id: string }) => void;
  handleDelete?: (post: { _id: string }) => void;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="mt-16 prompt_layout">{desc}</p>
      {data.map((post: any) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </section>
  );
};

export default Profile;
