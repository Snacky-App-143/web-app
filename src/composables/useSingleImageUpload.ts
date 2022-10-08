import { StorageReference, UploadTaskSnapshot } from '@firebase/storage';
import { computed, ref } from 'vue';
import useFirebaseServices from './useFirebaseServices';
import useUtility from './useUtility';

export default function () {
  const { uploadFile, uploadResumableFile } = useFirebaseServices();
  const { showError } = useUtility();

  const uploadTaskSnapshot = ref<UploadTaskSnapshot>();
  const uploadedFileRef = ref<StorageReference>();

  const uploadProgress = computed(() =>
    uploadTaskSnapshot.value
      ? (uploadTaskSnapshot.value.bytesTransferred /
          uploadTaskSnapshot.value.totalBytes) *
        100
      : 0
  );

  function uploadImage(image: string | File | Blob | Uint8Array, path: string) {
    return uploadFile(image, path);
  }

  function uploadResumableImage(image: File | Blob | Uint8Array, path: string) {
    const task = uploadResumableFile(image, path);

    task?.on(
      'state_changed',
      (snapshot) => {
        uploadTaskSnapshot.value = snapshot;
      },
      showError,
      () => {
        uploadedFileRef.value = uploadTaskSnapshot.value?.ref;
      }
    );
  }

  return {
    uploadProgress,

    uploadImage,
    uploadResumableImage,
  };
}
