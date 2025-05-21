import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { useAuthors } from '../../../hooks/useAuthors';
import { useCategories } from '../../../hooks/useCategories';
import JoditEditor from 'jodit-react';
import { usePosts, usePostsMutation } from '../../../hooks/usePost';
import { uploadImageToCloudinary } from '../../../helpers/uploadImageToCloudinary';
import { useNavigate } from 'react-router';
import Loading from '../../Loading';

type PostFormData = {
  title: string;
  body: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  coverImage: FileList;
};

export default function PostForm() {
  const {data:authors=[]} = useAuthors();
  const {data:categories=[]} = useCategories();
  const {data:posts=[]} = usePosts()
  const [tagInput, setTagInput] = useState('');
  const [content, setContent]= useState("");
  const editor = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      status: 'draft',
      tags: [],
    },
  });

  const {mutate: createPost} = usePostsMutation()

  // const onSubmit = (data: PostFormData) => {
  //   const newPost = {
  //     content,
  //     ...data
  //   }
  //   console.log('Form data:', newPost);
  // };
      const maxId = posts.reduce((max, item) => {
        const id = typeof item.id === "string" ? parseInt(item.id, 10) : item.id;
        return Math.max(max, id ?? 0);
      }, 0);


   const onSubmit = async (data: PostFormData) => {    
      setIsSubmitting(true);
  
      try {
        // Upload the image to Cloudinary
        const coverImageFile = data.coverImage[0];
        const imageURL = await uploadImageToCloudinary(coverImageFile);
        
        // Prepare the author data
        const newPost = {
          id: String(maxId + 1),
          title: data.title,
          author: data.author,
          category: data.category,
          tags: data.tags,
          status: data.status,
          createdAt: new Date(),
          coverImage: imageURL
        };

        console.log(newPost);
        
        // Use mutation with success/error handling
        createPost(newPost, {
          onSuccess: () => {
            reset();
            navigate("/")
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



  const coverImage = watch('coverImage');
  const tags = watch('tags');


  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setValue('tags', [...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  if(isSubmitting) return <Loading>Creating Post</Loading>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10">
      {/* Title */}
      <div className="mb-6">
        <label className="form-label">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="form-input"
          placeholder="Post title"
        />
        {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      {/* Body - Markdown/WYSIWYG */}
      <div className="mb-6">
        <label className="form-label">Content</label>
        <JoditEditor
            className='rounded-none'
        ref={editor}
        value={content}
        onChange={newContent => setContent(newContent)}
      />
      </div>

      {/* Author Dropdown */}
      <div className="mb-6">
        <label className="form-label">Author</label>
        <select
          {...register('author', { required: 'Author is required' })}
          className="form-input"
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.author && <p className="text-red-500 mt-1">{errors.author.message}</p>}
      </div>

      {/* Category Dropdown */}
      <div className="mb-6">
        <label className="form-label">Category</label>
        <select
          {...register('category', { required: 'Category is required' })}
          className="form-input"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
      </div>

      {/* Tags Multi-input */}
      <div className="mb-6">
        <label className="form-label">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="form-input"
            placeholder="Add tags (press Enter)"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-primary text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Status Toggle */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Status</label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setValue('status', 'draft')}
            className={`px-4 py-2 rounded-none ${watch('status') === 'draft' ? 'bg-yellow-500 text-yellow-50' : 'bg-gray-200'}`}
          >
            Draft
          </button>
          <button
            type="button"
            onClick={() => setValue('status', 'published')}
            className={`px-4 py-2 rounded-none ${watch('status') === 'published' ? 'bg-green-500 text-green-50' : 'bg-gray-200'}`}
          >
            Published
          </button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Cover Image</label>
        <div className="flex items-center gap-4">
          <label className="flex-1">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition">
              <FiUpload className="mx-auto text-2xl mb-2 text-gray-400" />
              <p className="text-gray-500">Click to upload or drag and drop</p>
              <input
                type="file"
                {...register('coverImage')}
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

      <button
        type="submit"
        className="w-full btn-primary"
      >
        Create Post
      </button>
    </form>
  );
}