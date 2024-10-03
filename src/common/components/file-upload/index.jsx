import { useRef, useState } from "react";

const FileUpload = ({
  mutliple = true,
  label = "Upload",
  description = "Click to upload",
  onChange,
}) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const fileInputRef = useRef();

  const onInputChange = (e) => {
    onChange(e);

    const previews = [];

    // Generate preview for each selected file
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);

        setUploadedImages([...previews]); // Update the preview images state
      };
      reader.readAsDataURL(file); // Convert file to data URL for preview
    });
  };

  return (
    <div>
      <div
        onClick={() => fileInputRef.current.click()}
        className="w-full cursor-pointer space-y-1 rounded-xl border border-dashed border-gray-300 px-5 py-4"
      >
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple={mutliple}
        className="hidden"
        onChange={onInputChange}
      />
      {uploadedImages?.length ? (
        <div className="mt-5 grid w-full grid-cols-5 gap-4">
          {uploadedImages?.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="h-[100px] w-full rounded-md object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
