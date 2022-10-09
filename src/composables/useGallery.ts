import { getDownloadURL, UploadTask } from '@firebase/storage';
import { uid } from 'quasar';
import { computed, ref } from 'vue';
import useFirebaseServices from './useFirebaseServices';

export enum UploadSteps {
  ADD_BUTTON = 'addButton',
  UPLOADING = 'uploading',
}

export type UploadFile = {
  file: File;
  isUploading: boolean;
  completed: boolean;
  progress: number;
  uploadedBytes: number;
  uploadTask: UploadTask | null;
  id: string;
};

const morphGroupModel = ref<UploadSteps>(UploadSteps.ADD_BUTTON);
const filesToUpload = ref<UploadFile[]>([]);
const isUploadCardVisible = ref(false);
const galleryItems = ref<string[]>([]);
const isItemListVisible = ref(true);

export default function () {
  const { getStorageFiles, getStorageRef } = useFirebaseServices();

  const totalSizes = computed(() =>
    filesToUpload.value
      .map(({ file }) => file.size)
      .reduce((total, size) => (total += size), 0)
  );
  const uploadedBytes = computed(() =>
    filesToUpload.value.reduce(
      (total, item) => (total += item.uploadedBytes),
      0
    )
  );
  const totalProgress = computed(
    () => (uploadedBytes.value / totalSizes.value) * 100
  );

  function startUploadProcess(files: File[] | null) {
    if (files) {
      filesToUpload.value = files.map((file) => ({
        id: uid(),
        file,
        completed: false,
        isUploading: false,
        progress: 0,
        uploadedBytes: 0,
        uploadTask: null,
      }));

      morphGroupModel.value = UploadSteps.UPLOADING;
      isItemListVisible.value = true;
    }
  }

  async function getAllGalleryItems() {
    const result = await getStorageFiles();
    galleryItems.value = await Promise.all(
      result.items.map((item) => getDownloadURL(getStorageRef(item.fullPath)))
    );
  }

  return {
    filesToUpload,
    morphGroupModel,
    totalSizes,
    totalProgress,
    isUploadCardVisible,
    galleryItems,
    isItemListVisible,

    startUploadProcess,
    getAllGalleryItems,
  };
}
