import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryById, useUpdateCategory } from "../../../hooks/useCategories";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Schema validation
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

function EditCategoryForm() {
  const { id } = useParams();
  const categoryId = id ? id : "";
  
  const { data: curCategory, isLoading } = useCategoryById(categoryId);
  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (curCategory) {
      reset({
        name: curCategory?.name,
      });
    }
  }, [curCategory, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    if (!categoryId) return;

    // Mutation Update Category
    updateCategory(
      { id: categoryId, data },
      {
        onSuccess: () => {
          navigate("/category");
        },
        onError: (error) => {
            console.error("Update failed:", error);
        }
    }
);
  };

  // Loader
  if (isLoading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[800px] mx-auto p-5 rounded-sm shadow-2xs mt-10"
    >
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2" htmlFor="name">
          Category Name
        </label>
        <input
          className="border-1 px-3 py-2 border-bd-gray w-full text-xl"
          type="text"
          placeholder="Category Name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
      <button 
        type="submit" 
        className="btn-primary w-full"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}

export default EditCategoryForm;