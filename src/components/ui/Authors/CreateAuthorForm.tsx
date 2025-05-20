import { useForm } from "react-hook-form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload } from "react-icons/fi";

// Schema validation
const authorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  avatar: z.any().refine((files) => files?.[0], "Avatar is required")
});

type AuthorFormData = z.infer<typeof authorSchema>;

function CreateAuthorForm() {   
   const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
  });
  const coverImage = watch('avatar');


  const onSubmit = (data: AuthorFormData) => {
    console.log("Form Data", data);

    const avatarFile = data.avatar[0];
    console.log("Avatar File:", avatarFile);
  };
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