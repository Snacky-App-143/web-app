<template>
  <q-page padding>
    <template v-if="mainLayoutMounted">
      <Teleport :to="`#${MainLayoutSlot.middleToolbar}`">
        <SnackySearchInput v-model="searchKey" />
      </Teleport>

      <Teleport :to="`#${MainLayoutSlot.prependExtraBtn}`">
        <q-btn icon="mdi-home" :to="{ name: RouteNames.homePage }"></q-btn>
      </Teleport>
    </template>

    <q-pull-to-refresh @refresh="refresh">
      <div class="row q-col-gutter-md">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <UserItem
            :user="user"
            @click-update="
              selectedUser = user;
              isUpdateUserVisible = true;
            "
            @click-delete="startDeleteAccount(user)"
          />
        </div>
      </div>
    </q-pull-to-refresh>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        @click="isCreateNewUserVisible = true"
      />
    </q-page-sticky>
    <UpdateUserDialog
      v-if="!!selectedUser"
      v-model="isUpdateUserVisible"
      :user-info="selectedUser"
      @updated="init"
    />
    <CreateNewUserDialog v-model="isCreateNewUserVisible" @created="init" />
  </q-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from 'src/stores/app';
import { MainLayoutSlot } from 'src/types/layout/main-layout';
import SnackySearchInput from 'components/common/SnackySearchInput.vue';
import CreateNewUserDialog from 'src/components/user-manager-page/CreateNewUserDialog.vue';
import useFirebaseServices from 'src/composables/useFirebaseServices';
import { FirestoreSnackyUser } from 'src/models/user.model';
import UserItem from 'src/components/user-manager-page/UserItem.vue';
import UpdateUserDialog from 'src/components/user-manager-page/UpdateUserDialog.vue';
import { RouteNames } from 'src/router/RouteNames';
import useUtility from 'src/composables/useUtility';

const appStore = useAppStore();
const { getUserList, deleteUser } = useFirebaseServices();
const { setPageTitle } = appStore;
const { confirm, t, successNotify } = useUtility();

const { mainLayoutMounted } = storeToRefs(appStore);
const searchKey = ref('');
const isCreateNewUserVisible = ref(false);
const isUpdateUserVisible = ref(false);
const selectedUser = ref<FirestoreSnackyUser>();
const users = ref<FirestoreSnackyUser[]>([]);

const filteredUsers = computed(() =>
  users.value.filter(
    ({ firstName, lastName, phoneNumber, email, passportId }) =>
      firstName.toLocaleLowerCase().includes(searchKey.value) ||
      lastName.toLocaleLowerCase().includes(searchKey.value) ||
      phoneNumber.toLocaleLowerCase().includes(searchKey.value) ||
      email.toLocaleLowerCase().includes(searchKey.value) ||
      passportId.toLocaleLowerCase().includes(searchKey.value)
  )
);

async function init() {
  users.value = (await getUserList()) ?? [];
}

async function refresh(done: () => void) {
  await init();
  done();
}

const startDeleteAccount = (user: FirestoreSnackyUser) => {
  confirm({
    message: t('user-manager-page.update-user.delete-confirmation'),
  }).onOk(async () => {
    const res = await deleteUser(user.id);

    if (res) {
      successNotify({
        message: t('user-manager-page.update-user.delete-success'),
      });

      init();
    }
  });
};

setPageTitle('page-title.user-manager');
init();
</script>

<style lang="scss" scoped>
.user-manager-page__search {
  min-width: 50%;
}
</style>
