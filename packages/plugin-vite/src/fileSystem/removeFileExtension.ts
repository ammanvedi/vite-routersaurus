export const removeFileExtension = (file: string): string => {
    return file.replace(/\.\w+/, "");
};