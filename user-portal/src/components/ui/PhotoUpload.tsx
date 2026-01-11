import { useState } from "react";

export default function PhotoUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
        Upload Photo
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded-lg border"
        />
      )}
    </div>
  );
}
