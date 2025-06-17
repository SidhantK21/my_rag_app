import type React from "react"
import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "motion/react"
import { FileText, X, Upload, CheckCircle, AlertCircle, Loader2, Download } from "lucide-react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import jsPDF from "jspdf"

type StatusType = "success" | "error" | null

interface Status {
  type: StatusType
  message: string | null
}

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<Status>({ type: null, message: null })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      setFile(acceptedFiles[0])
      setStatus({ type: null, message: null })
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    multiple: false,
  })

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setFile(null)
    setStatus({ type: null, message: null })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      setStatus({ type: "error", message: "Please select a file first" })
      return
    }

    setUploading(true)
    setStatus({ type: null, message: null })

    const formData = new FormData()
    formData.append("pdf", file)

    try {
      const response = await axios.post("http://localhost:3000/services/datatoprocess/pdfUp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setStatus({
        type: "success",
        message: response.data.message || "File uploaded successfully!",
      })

      const fileId = response.data.fileId

      const summaryRes = await axios.post("http://localhost:3000/services/askai/summarizedoc", { fileId })

      setSummary(summaryRes.data.summary.content)
    } catch (error: any) {
      console.error("Upload failed:", error)
      setStatus({
        type: "error",
        message: "Upload failed. Please try again.",
      })
    } finally {
      setUploading(false)
    }
  }

  const downloadSummary = () => {
    if (!summary) return

    const doc = new jsPDF()
    const pageHeight = doc.internal.pageSize.height
    const lineHeight = 10
    const margin = 15
    const maxLineWidth = doc.internal.pageSize.width - margin * 2

    const textLines = doc.splitTextToSize(summary, maxLineWidth)
    let cursorY = margin

    textLines.forEach((line: string) => {
      if (cursorY > pageHeight - margin) {
        doc.addPage()
        cursorY = margin
      }
      doc.text(line, margin, cursorY)
      cursorY += lineHeight
    })

    doc.save("summary.pdf")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 font-sans">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">Upload Your PDF</h1>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              We'll process your document and extract the important information
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative cursor-pointer transition-all duration-500 ease-out
                border-2 border-dashed rounded-2xl p-8
                flex flex-col items-center justify-center text-center
                min-h-48 md:min-h-56 backdrop-blur-sm
                ${isDragActive ? "border-white/60 bg-white/8 scale-[1.02]" : "border-gray-700/60 hover:border-gray-500/80"}
                ${isDragAccept ? "border-white/80 bg-white/12 shadow-lg shadow-white/5" : ""}
                ${isDragReject ? "border-red-400/60 bg-red-500/8" : ""}
              `}
            >
              <input {...getInputProps()} />

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    className="w-full space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.div
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        >
                          <FileText className="text-gray-300 w-5 h-5" />
                        </motion.div>
                        <div className="flex flex-col items-start">
                          <span className="text-sm text-gray-200 truncate max-w-40 md:max-w-60 font-medium">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500 font-light">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                      <motion.button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.div
                      className="bg-white/5 p-5 rounded-full inline-flex border border-white/10"
                      animate={{
                        y: isDragActive ? -2 : 0,
                        scale: isDragActive ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Upload className="w-8 h-8 text-gray-300" />
                    </motion.div>
                    <div className="space-y-2">
                      <p className="text-gray-200 text-base font-medium">
                        {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
                      </p>
                      <p className="text-gray-500 text-sm font-light">or click to browse files</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Status Messages */}
          <AnimatePresence>
            {status.message && (
              <motion.div
                className={`flex items-center rounded-xl p-4 space-x-3 text-sm border
                  ${
                    status.type === "error"
                      ? "bg-red-950/20 text-red-200 border-red-800/30"
                      : "bg-green-950/20 text-green-200 border-green-800/30"
                  }
                `}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  {status.type === "error" && <AlertCircle className="w-5 h-5 text-red-300" />}
                  {status.type === "success" && <CheckCircle className="w-5 h-5 text-green-300" />}
                </motion.div>
                <span className="font-medium">{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!file || uploading}
            className={`
              w-full py-4 rounded-xl font-medium flex items-center justify-center text-base
              transition-all duration-300 border
              ${
                !file || uploading
                  ? "bg-gray-800/50 text-gray-500 cursor-not-allowed border-gray-700/50"
                  : "bg-white text-black hover:bg-gray-100 active:bg-gray-200 border-white/20 shadow-lg shadow-white/10"
              }
            `}
            whileHover={file && !uploading ? { scale: 1.02, y: -1 } : {}}
            whileTap={file && !uploading ? { scale: 0.98 } : {}}
            transition={{ duration: 0.2 }}
          >
            {uploading ? (
              <motion.div className="flex items-center space-x-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Processing...</span>
              </motion.div>
            ) : (
              "Get Summary"
            )}
          </motion.button>

          {/* Download Summary Button */}
          <AnimatePresence>
            {summary && (
              <motion.button
                type="button"
                onClick={downloadSummary}
                className="w-full py-4 rounded-xl font-medium flex items-center justify-center text-base bg-emerald-600/90 text-white hover:bg-emerald-600 transition-all duration-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Summary as PDF
              </motion.button>
            )}
          </AnimatePresence>

          {/* Footer Info */}
          <motion.div
            className="text-xs text-gray-500 space-y-1 text-center font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p>Accepted file type: PDF only</p>
            <p>Maximum file size: 10MB</p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
