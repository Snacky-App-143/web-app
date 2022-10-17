import { deleteObject, StorageReference, UploadTask } from '@firebase/storage';
import { uid } from 'quasar';
import { AppEvents } from 'src/types/event-bus';
import { computed, ref, watch } from 'vue';
import useFirebaseServices from './useFirebaseServices';
import useUtility from './useUtility';

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
const galleryItems = ref<StorageReference[]>([]);
const isItemListVisible = ref(true);

const fileToUploadId = computed(() =>
  filesToUpload.value.find(({ completed }) => !completed)
);

export default function () {
  const { getStorageFiles, getStorageRef } = useFirebaseServices();
  const { notify, t, bus } = useUtility();

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
    if (files && files.length) {
      filesToUpload.value = files.reduce((result: UploadFile[], file) => {
        if (file.type.startsWith('image/')) {
          result.push({
            id: uid(),
            file,
            completed: false,
            isUploading: false,
            progress: 0,
            uploadedBytes: 0,
            uploadTask: null,
          });
        }
        return result;
      }, []);

      if (filesToUpload.value.length) {
        morphGroupModel.value = UploadSteps.UPLOADING;
        isItemListVisible.value = true;
      }

      if (filesToUpload.value.length !== files.length) {
        notify({
          message: t('gallery.not-image-files'),
          color: 'warning',
        });
      }
    }
  }

  async function getAllGalleryItems() {
    const result = await getStorageFiles();
    galleryItems.value = result.items;
  }

  async function deleteGalleryItems(items: StorageReference[]) {
    return Promise.all(
      items.map((item) => deleteObject(getStorageRef(item.fullPath)))
    );
  }

  watch(
    () => totalProgress.value,
    (value) => {
      if (value === 100) {
        bus?.emit(AppEvents.RELOAD_GALLERY);
      }
    }
  );

  return {
    filesToUpload,
    morphGroupModel,
    totalSizes,
    totalProgress,
    isUploadCardVisible,
    galleryItems,
    isItemListVisible,
    fileToUploadId,
    deleteGalleryItems,

    startUploadProcess,
    getAllGalleryItems,
  };
}
