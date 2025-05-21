import { useForm } from "react-hook-form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload } from "react-icons/fi";
import { useAuthorMutation, useAuthors } from "../../../hooks/useAuthors";
import { uploadImageToCloudinary } from "../../../helpers/uploadImageToCloudinary";
import { useState } from "react";
import Loading from "../../Loading";
import { useNavigate } from "react-router";

// Schema validation
const authorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(10, "Bio should be at least 10 characters").max(40,"Bio should be less than 4- characters"),
  avatar: z.any().refine((files) => files?.[0], "Avatar is required")
});

type AuthorFormData = z.infer<typeof authorSchema>;

function CreateAuthorForm() {   
   const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors}
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
  });
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const coverImage = watch('avatar');

  const {data:authors=[]} = useAuthors();

    const maxId = authors.reduce((max, item) => {
    const id = typeof item.id === "string" ? parseInt(item.id, 10) : item.id;
    return Math.max(max, id ?? 0);
  }, 0);

  const {mutate:createAuthor} = useAuthorMutation()

 const onSubmit = async (data: AuthorFormData) => {    
    setIsSubmitting(true);
    setUploadError('');

    try {
      // Upload the image to Cloudinary
      const avatarFile = data.avatar[0];
      const imageURL = await uploadImageToCloudinary(avatarFile);
      
      // Prepare the author data
      const newAuthorData = {
        id: String(maxId + 1),
        name: data.name,
        avatar: imageURL,
        bio: data.bio
      };
      
      // Use mutation with success/error handling
      createAuthor(newAuthorData, {
        onSuccess: () => {
          reset();
          navigate("/authors")
        },
        onError: (error) => {
          setUploadError('Failed to create author. Please try again.');
          console.error("Author creation failed:", error);
        }
      });
    } catch (error) {
      setUploadError('Image upload failed. Please try again.');
      console.error("Upload error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

if (isSubmitting) {
  return (
    <Loading>Creating Authors</Loading>
  );
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] mx-auto p-5 rounded-sm shadow-2xs mt-10">
        <div className="mb-4 ">
            <label className="block text-lg font-semibold mb-2" htmlFor="name">Author Name</label>
            <input className="border-1 px-3 py-2 border-bd-gray w-full text-xl" type='text' placeholder='Author Name' {...register("name")}/>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
        </div>
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Avatar</label>
        <div className="flex items-center gap-4">
          <label className="flex-1">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition">
              <FiUpload className="mx-auto text-2xl mb-2 text-gray-400" />
              <p className="text-gray-500">Click to upload or drag and drop</p>
              <input
                type="file"
                {...register('avatar')}
                className="hidden"
                accept="image/*"
              />
            </div>
          </label>
          {coverImage?.[0] && (
            <div className="w-32 h-32 rounded-lg overflow-hidden border">
              <img
                src={URL.createObjectURL(coverImage[0])}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        {uploadError && (
        <p className="text-red-500 text-sm mb-4">{uploadError}</p>
          )}
      </div>
        <div className="mb-4">
            <label htmlFor="" className="block text-lg font-semibold mb-2">Bio</label>
            <textarea className="border-1 px-3 py-2 border-bd-gray w-full text-xl" placeholder='Bio...' {...register("bio")}></textarea>
        {errors.bio && (
          <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
        )}
        </div>
        <button type="submit" className="btn-primary w-full">Submit</button>
    </form>
  )
}

export default CreateAuthorForm