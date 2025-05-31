import React, { useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'


function RTE({ label, name, control, defaultValue = "" }) {

    // useEffect(()=>{
    //   console.log(defaultValue);

    //   if(editRef.current && defaultValue){
    //     editRef.current.setContent(defaultValue);
    //   }
    // },[defaultValue])
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller name={name || "content"} defaultValue={defaultValue} control={control} render={
                ({ field: { onChange } }) => {
                    return (<Editor
                        apiKey='in7tpwmztd42fzzdjgn18wr8fm0q0xcziar0lqrzr0t3fijc' initialValue={defaultValue} init={{

                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"

                        }} onEditorChange={onChange} />)
                }
            } />
        </div>
    )
}

export default RTE