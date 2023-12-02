import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Model";
import Input from "../Input";
import ImageUpload from "../ImageUpload";
import { MdDelete } from "react-icons/md";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");

  const handleDelete = () => {
    setProfileImage("");
  }
  

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUserName(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();

      toast.success("Updated Succesfully");

      editModal.onClose();
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <p className="text-white flex justify-between">Profile Picture <MdDelete onClick={handleDelete} size={30} color="red" className="cursor-pointer"/></p>
        <ImageUpload
         value={profileImage}
         disabled={isLoading}
         onChange={(image) => setProfileImage(image)}
         label="Upload Profile Image"
        />
        
        <p className="text-white text-center">Cover Image</p>
        <ImageUpload
         value={coverImage}
         disabled={isLoading}
         onChange={(image) => setCoverImage(image)}
         label="Upload Cover Image"
        />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={editModal.isOpen}
        title="Edit your profile"
        actionLabel="Save"
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
      />
    </div>
  );
};

export default EditModal;
