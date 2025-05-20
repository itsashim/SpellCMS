import { useForm } from "react-hook-form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema validation
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

function CreateCategoryForm() {   
   const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log("Form Data", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] mx-auto p-5 rounded-sm shadow-2xs mt-10">
        <div className="mb-4 ">
            <label className="block text-lg font-semibold mb-2" htmlFor="name">Category Name</label>
            <input className="border-1 px-3 py-2 border-bd-gray w-full text-xl" type='text' placeholder='Category Name' {...register("name")}/>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
        </div>
        <button type="submit" className="btn-primary w-full">Submit</button>
    </form>
  )
}

export default CreateCategoryForm