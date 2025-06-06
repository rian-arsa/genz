import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1,              // target ~1 MB
    maxWidthOrHeight: 1920,    // lebar/tinggi maksimum
    useWebWorker: true,
  };
  return await imageCompression(file, options);
}