"use client";

import { FaCloudUploadAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "sonner";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadDocument } from "@/actions/upload-document";
import { useAppSelector } from "@/lib/hooks";
import { selectCourseName } from "@/lib/features/course-name/courseNameSlice";

const formatFileSize = (fileSize: number) => {
    if (fileSize > 1000000) {
        return (fileSize / 1024 / 1024).toFixed(1) + " MB";
    }
    return (fileSize / 1024).toFixed(1) + " KB";
};

function DropZone() {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);
    const courseName = useAppSelector(selectCourseName);

    const { startUpload, permittedFileInfo } = useUploadThing(
        "documentUpload",
        {
            onClientUploadComplete: (res) => {
                res.map((file) =>
                    uploadDocument(
                        file.name,
                        file.serverData.file.url,
                        file.serverData.uploadedBy,
                        courseName
                    ).then((data) => {
                        if (data?.error) {
                            toast.error(data.error, {
                                action: {
                                    label: "Close",
                                    onClick: () => {},
                                },
                            });
                        }

                        if (data?.success) {
                            toast.success(data.success, {
                                action: {
                                    label: "Close",
                                    onClick: () => {},
                                },
                            });
                            handleRemoveAllFile();
                        }
                    })
                );

                setIsUploading(false);
            },
            onUploadError: () => {
                setIsUploading(false);

                if (files.length > 5) {
                    toast.error("Please upload only 5 files", {
                        action: {
                            label: "Close",
                            onClick: () => {},
                        },
                    });
                    return;
                }
                toast.error("Error uploading", {
                    description: "There was a problem with your request",
                    action: {
                        label: "Try again",
                        onClick: () => {
                            startUpload(files);
                            setIsUploading(true);
                        },
                    },
                });
            },
            onUploadBegin: () => {
                toast.info("Upload has begun", {
                    action: {
                        label: "Close",
                        onClick: () => {},
                    },
                });
            },
        }
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
        maxSize: 16 * 1024 * 1024,
    });

    const handleRemoveFile = (fileToRemove: File) => {
        setFiles((prevFiles) =>
            prevFiles.filter((file) => file !== fileToRemove)
        );
    };

    const handleRemoveAllFile = () => {
        setFiles([]);
    };

    const filesList = files.map((file) => (
        <div key={file.name} className="w-full mt-2">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <span className="text-green-400 flex items-center px-2">
                        <HiMiniDocumentCheck />
                    </span>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-slate-400 text-xs ml-1">
                        {formatFileSize(file.size)}
                    </p>
                </div>
                <Button
                    onClick={() => handleRemoveFile(file)}
                    variant="outline"
                >
                    <IoTrashOutline className="size-5" />
                </Button>
            </div>
        </div>
    ));

    return (
        <main className="flex flex-col items-center justify-start">
            <div
                {...getRootProps()}
                className="w-[800px] h-[200px] border-dashed border-2 border-sky-300 rounded-lg"
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-around h-full">
                    <span className="inline-block text-blue-400 size-12">
                        <FaCloudUploadAlt className="size-12" />
                    </span>
                    <h1 className="font-medium text-xl">Drag & Drop files</h1>
                    <Button variant="custom" className="rounded-xl w-36 h-10">
                        Browse my files
                    </Button>
                    <p className="text-slate-400 text-sm">
                        Supported files: pdf (less than 16MB, larger will be
                        discarded)
                    </p>
                </div>
            </div>
            {filesList}
            <div className="flex justify-end w-full">
                {files.length > 0 && (
                    <Button
                        variant="custom"
                        className="mt-4 rounded-full"
                        onClick={() => {
                            if (!courseName) {
                                toast.error(
                                    "Please choose a course for uploading files",
                                    {
                                        action: {
                                            label: "Close",
                                            onClick: () => {},
                                        },
                                    }
                                );
                                return;
                            }
                            startUpload(files);
                            setIsUploading(true);
                        }}
                        disabled={isUploading}
                    >
                        <span className="mr-2">
                            <FiSend />
                        </span>{" "}
                        Submit {files.length} document files
                    </Button>
                )}
            </div>
        </main>
    );
}

export default DropZone;
