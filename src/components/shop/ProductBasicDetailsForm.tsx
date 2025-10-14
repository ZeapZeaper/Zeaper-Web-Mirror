"use client";
import React, { useEffect } from "react";
import Editor from "../editor/EditorWithUseQuill";
import { Label, TextInput } from "flowbite-react";



const ProductBasicDetailsForm = ({
  title,
  setTitle,

  subtitle,
  setSubtitle,
  description,
  setDescription,
  error,
  refresh,

}: {
  title: string;
  setTitle: (value: string) => void;
  subtitle?: string;
  setSubtitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  error: {
    title?: string;
    description?: string;
    gender?: string;
  };
  refresh: boolean;

}) => {
 
  const topRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    const isError = error.title || error.description || error.gender;
    if (isError && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);
  const getColor = (value: string | undefined, isError: string | undefined) => {
    if (value) {
      return "success";
    }
    if (isError) {
      return "failure";
    }
  };
  return (
    <>
      <div className="absolute -top-3" ref={topRef}></div>
      <div>
        <div className="mb-2 block">
          <Label value="Title" />
        </div>
        <TextInput
          type="text"
          placeholder="Title / Name of the product"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          color={getColor(title, error?.title)}
          helperText={
            error.title && !title ? (
              <>
                <span className="text-xs">{error?.title}</span>
              </>
            ) : (
              ""
            )
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Subtitle" />
        </div>
        <TextInput
          type="text"
          placeholder="Subtitle if any..."
          value={subtitle || ""}
          onChange={(e) => setSubtitle(e.target.value)}
          color={subtitle ? "success" : ""}
        />
      </div>
      
      <div>
        <div className="mb-2 block">
          <Label value="Description" />
        </div>
        {error.description && description.length < 20 && (
          <span className="text-xs text-danger">{error.description}</span>
        )}
        <Editor
          placeholder={description ? "" : "Description of the product"}
          value={description}
          onChange={(value) => setDescription(value)}
          refresh={refresh}
        />
      </div>
    </>
  );
};

export default ProductBasicDetailsForm;
