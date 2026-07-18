"use client";

import { useState } from "react";
import { MODEL_TYPES } from "@/src/shared/config/api/model/model.model";
import { useMe } from "@/src/widgets/welcome/lib/hooks";
import { useCreateModel, useUploadModel } from "@/src/features/model/lib/hooks";

const MODEL_TYPES_LIST: MODEL_TYPES[] = [
  'CPU',
  'GPU',
  'MOTHER_BOARD',
  'RAM',
  'STORAGE',
  'POWER_SUPPLY',
  'COOLER',
  'RADIATOR',
  'CASE',
];

export default function AdminModelForm() {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<MODEL_TYPES | "">("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);

  const { data, isLoading } = useMe();

  const { mutateAsync: uploadModel } = useUploadModel();
  const { mutateAsync: createModel, isPending: isCreating } = useCreateModel();

  const [uploadProgress, setUploadProgress] = useState<string>("");

  if (isLoading) {
    return <div>Please wait</div>;
  }

  if (data?.data.user.email !== "dvltinv@gmail.com") return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !type || !brand || !price || !image || !modelFile) {
      alert("Barcha maydonlarni to'ldiring");
      return;
    }

    try {
      setUploadProgress("Fayllar yuklanmoqda...");

      const [imageUploadResult, modelFileUploadResult] = await Promise.all([
        uploadModel(image),
        uploadModel(modelFile),
      ]);

      const imagePath = imageUploadResult?.file.filename ?? imageUploadResult.path;
      const modelFilePath = modelFileUploadResult?.file.filename ?? modelFileUploadResult.path;

      console.log(imagePath, "imagepath");
      console.log(modelFilePath, "modelfilePath");

      setUploadProgress("Model yaratilmoqda...");
      await createModel({
        name,
        type: type as MODEL_TYPES,
        brand,
        price: Number(price),
        image: imagePath,
        model_file: modelFilePath,
      });

      setName("");
      setType("");
      setBrand("");
      setPrice("");
      setImage(null);
      setModelFile(null);
      setUploadProgress("");
      alert("Model muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Model yaratishda xatolik:", error);
      alert("Xatolik yuz berdi, konsolni tekshiring");
      setUploadProgress("");
    }
  };

  const isSubmitting = isCreating || uploadProgress !== "";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0A0A0A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8"
      >
        <h1 className="text-white text-xl font-bold mb-2 text-center">
          Yangi model qo'shish
        </h1>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-neutral-400">
            Nomi
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#1e1e1e] border border-[#333] rounded-lg px-3 py-2 text-white outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-sm text-neutral-400">
            Turi
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as MODEL_TYPES)}
            className="bg-[#1e1e1e] border border-[#333] rounded-lg px-3 py-2 text-white outline-none focus:border-neutral-500"
          >
            <option value="">Turi</option>
            {MODEL_TYPES_LIST.map((item, k) => (
              <option value={item} key={k}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="brand" className="text-sm text-neutral-400">
            Brend
          </label>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-[#1e1e1e] border border-[#333] rounded-lg px-3 py-2 text-white outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm text-neutral-400">
            Narxi
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-[#1e1e1e] border border-[#333] rounded-lg px-3 py-2 text-white outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="image" className="text-sm text-neutral-400">
            Rasm
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="text-white text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#C4D335] file:text-black file:font-semibold file:cursor-pointer"
          />
          {image && (
            <span className="text-xs text-neutral-500">{image.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="model_file" className="text-sm text-neutral-400">
            Model fayli
          </label>
          <input
            id="model_file"
            type="file"
            name="model_file"
            accept=".glb,.gltf"
            onChange={(e) => setModelFile(e.target.files?.[0] || null)}
            className="text-white text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#C4D335] file:text-black file:font-semibold file:cursor-pointer"
          />
          {modelFile && (
            <span className="text-xs text-neutral-500">{modelFile.name}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-[#C4D335] hover:bg-[#b3c22e] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg py-2.5 transition-colors cursor-pointer"
        >
          {uploadProgress || (isCreating ? "Saqlanmoqda..." : "Qo'shish")}
        </button>
      </form>
    </div>
  );
}