import { motion, AnimatePresence } from "framer-motion";
import { FileUp } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";

export const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [serverMessage,setServermessage]=useState<string|null>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("http://localhost:3000/services/datatoprocess/pdfUp", formData, {
        headers: { "Content-Type": "multipart/form-data" },

      });
      setServermessage(response.data.message);
      setMessage("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col bg-black items-center justify-center min-h-screen space-y-4">
      <motion.div
        className="cursor-pointer p-4 rounded-lg border-gray-300"
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFileUpload}
      >
        <FileUp size={48} className="text-white" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.h1
          key={fileName ? "uploaded" : "initial"}
          className="font-bold text-2xl text-center px-4 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {fileName ? "Great! Now submit it so we can process it" : "Please upload a PDF for our system to operate on it!"}
        </motion.h1>
      </AnimatePresence>

      {fileName && (
        <motion.p
          className="text-white text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Uploaded File: {fileName}
        </motion.p>
      )}

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="border rounded-lg px-6 py-3 font-bold bg-black text-white"
        onClick={handleSubmit}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Submit"}
      </motion.button>

      {message && (
        <motion.p className="text-white text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {message}
        </motion.p>
      )}

      {serverMessage && (
        <motion.p className="text-green-600 text-sm mt-2 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {serverMessage}
        </motion.p>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="application/pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};
