import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload } from "react-icons/fi";
import { useAuthorById, useUpdateAuthor } from "../../../hooks/useAuthors";
import { uploadImageToCloudinary } from "../../../helpers/uploadImageToCloudinary";
import { useState, useEffect, useMemo } from "react";
import Loading from "../../Loading";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

// Create schema dynamically based on existing avatar
const createAuthorSchema = (existingAvatar: string) =>
  z.object({
    name: z.string().min(1, "Name is required"),
    bio: z
      .string()
      .min(10, "Bio should be at least 10 characters")
      .max(40, "Bio should be less than 40 characters"),
    avatar: z
      .any()
      .refine((files) => files?.[0] || existingAvatar, "Avatar is required")
      .refine(
        (files) => !files?.[0] || files[0].size <= 5_000_000,
        "Max image size is 5MB"
      )
      .refine(
        (files) =>
          !files?.[0] ||
          ["image/jpeg", "image/png", "image/webp"].includes(
            files[0].type
          ),
        "Only .jpg, .png, and .webp formats are supported"
      ),
  });

type AuthorFormData = z.infer<ReturnType<typeof createAuthorSchema>>;

export default function EditAuthorForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [existingAvatar, setExistingAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch author data
  const { data: author, isLoading } = useAuthorById(id!);
  const { mutate: updateAuthor } = useUpdateAuthor();

  // Memoize schema so it updates when existingAvatar changes
  const schema = useMemo(
    () => createAuthorSchema(existingAvatar),
    [existingAvatar]
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(schema),
  });

  const coverImage = watch("avatar");

  // Reset form 
  useEffect(() => {
    if (author) {
      setExistingAvatar(author.avatar);
      reset({ name: author.name, bio: author.bio, avatar: undefined });
    }
  }, [author, reset]);

  const onSubmit = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    try {
      let imageURL = existingAvatar;
      if (data.avatar && data.avatar.length > 0) {
        imageURL = await uploadImageToCloudinary(data.avatar[0]);
      }

      const updatedAuthorData = {
        name: data.name,
        avatar: imageURL,
        bio: data.bio,
      };

      updateAuthor(
        { id: id!, data: updatedAuthorData },
        {
          onSuccess: () => {
            toast.success("Author updated successfully");
            navigate("/authors");
          },
          onError: (err) => {
            console.error("Update error:", err);
            toast.error("Failed to update author. Please try again.");
          },
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Image upload failed: ${error || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading>Loading author data...</Loading>;
  if (isSubmitting) return <Loading>Updating Author...</Loading>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] mx-auto p-5 rounded-sm shadow-2xs mt-10">
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-semibold mb-2">
          Author Name
        </label>
        <input
          type="text"
          placeholder="Author Name"
          className="border-1 px-3 py-2 border-bd-gray w-full text-xl"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Avatar</label>
        <div className="flex items-center gap-4">
          <label className="flex-1">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition">
              <FiUpload className="mx-auto text-2xl mb-2 text-gray-400" />
              <p className="text-gray-500">Click to upload or drag and drop</p>
              <input type="file" {...register("avatar")} className="hidden" accept="image/*" />
            </div>
          </label>
          {(coverImage?.[0] || existingAvatar) && (
            <div className="w-32 h-32 rounded-lg overflow-hidden border">
              <img
                src={coverImage?.[0] ? URL.createObjectURL(coverImage[0]) : existingAvatar}
                alt="Author preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message as string}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Bio</label>
        <textarea
          placeholder="Bio..."
          className="border-1 px-3 py-2 border-bd-gray w-full text-xl"
          {...register("bio")}
        />
        {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
      </div>

      <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Author"}
      </button>
    </form>
  );
}
