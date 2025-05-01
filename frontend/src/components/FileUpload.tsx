import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, X, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

type StatusType = "success" | "error" | null;

interface Status {
  type: StatusType;
  message: string | null;
}

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: null, message: null });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      setFile(acceptedFiles[0]);
      setStatus({ type: null, message: null });
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    setStatus({ type: null, message: null });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!file) {
      setStatus({ type: "error", message: "Please select a file first" });
      return;
    }
  
    setUploading(true);
    setStatus({ type: null, message: null });
  
    const formData = new FormData();
    formData.append("pdf", file);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/services/datatoprocess/pdfUp",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      setStatus({
        type: "success",
        message: response.data.message || "File uploaded successfully!",
      });
      console.log(response.data);
    } catch (error: any) {
      console.error("Upload failed:", error);
      setStatus({
        type: "error",
        message: "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Upload Your PDF</h1>
            <p className="text-sm text-gray-400">
              We'll process your document and extract the important information
            </p>
          </div>

          <div
            {...getRootProps()}
            className={`
              relative cursor-pointer transition-all duration-300 ease-in-out
              border-2 border-dashed rounded-xl p-8
              flex flex-col items-center justify-center text-center
              min-h-44 md:min-h-52
              ${isDragActive ? "border-white bg-white/5" : "border-gray-700 hover:border-gray-500"}
              ${isDragAccept ? "border-white bg-white/10" : ""}
              ${isDragReject ? "border-red-500 bg-red-500/5" : ""}
            `}
          >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  className="w-full space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="text-gray-400 w-5 h-5" />
                      <span className="text-sm text-gray-300 truncate max-w-40 md:max-w-60">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-white/5 p-4 rounded-full inline-flex">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm font-medium mb-1">
                      {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
                    </p>
                    <p className="text-gray-500 text-xs">or click to browse files</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {status.message && (
              <motion.div
                className={`flex items-center rounded-lg p-3 space-x-2 text-sm
                  ${status.type === "error" ? "bg-red-950/30 text-red-300" : ""}
                  ${status.type === "success" ? "bg-green-950/30 text-green-300" : ""}
                `}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status.type === "error" && <AlertCircle className="w-4 h-4 text-red-400" />}
                {status.type === "success" && <CheckCircle className="w-4 h-4 text-green-400" />}
                <span>{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={!file || uploading}
            className={`
              w-full py-3 rounded-lg font-medium flex items-center justify-center
              transition-all duration-300
              ${!file || uploading
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-100 active:bg-gray-200"
              }
            `}
            whileHover={file && !uploading ? { scale: 1.01 } : {}}
            whileTap={file && !uploading ? { scale: 0.98 } : {}}
          >
            {uploading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Uploading...</span>
              </div>
            ) : (
              "Upload PDF"
            )}
          </motion.button>

          <div className="text-xs text-gray-500 space-y-1 text-center">
            <p>Accepted file type: PDF only</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
