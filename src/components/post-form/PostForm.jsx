import React, { useEffect, useCallback, use } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import dbServices from '../../appwrite/config'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import RTE from '../RTE'
import parse from 'html-react-parser'
import { useDispatch } from 'react-redux'
import {showMessage} from '../../store/messageSlice'

function PostForm({ post }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
    }
  });
  const slugFormation = useCallback((value) => {
    if (value) {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, [])
  post ? setValue("slug", slugFormation(post.title), { shouldValidate: true }) : ""
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);






  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await dbServices.uploadImage(data.image[0]) : null;
      if (file) {
        await dbServices.deleteImage(post.featuredImage);
      }

      const dbPost = await dbServices.updatePost(post.$id, { ...data, likes: post.likes, Bookmarks: post.Bookmarks, featuredImage: file ? file.$id : post.featuredImage, username: post.username });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
        dispatch(showMessage({type: "success" , text: "Post edited successfully"}));
      }

    }
    else {
      const file = await dbServices.uploadImage(data.image[0]);
      if (file) {
        data.featuredImage = file.$id;
      }
      const dbPost = await dbServices.addPost({ ...data, userId: userData.$id, username: userData.name });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
        dispatch(showMessage({type: "success" , text: "New post added successfully"}));
      }
    }

  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugFormation(value.title), { shouldValidate: true });


      }
    })
    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugFormation, setValue])
  return (


    // responsive design

    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4 md:gap-0">
      {/* Left Section: Title, Slug, Content */}
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugFormation(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Section: Image, Status, Submit */}
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={dbServices.previewImage(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-600"}
          className="w-full text-white"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>

  )
}

export default PostForm