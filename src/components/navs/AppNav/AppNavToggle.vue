<template>
  <div :class="`app-nav-toggle bg-gray-50 dark:bg-gray-${darkModeBg}`">
    <router-link
      :to="{ name: 'trade' }"
      :class="[
        'toggle-link px-6 rounded-r-lg',
        { [activeClasses]: isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('trade') }} </router-link
    ><router-link
      :to="{ name: 'invest' }"
      :class="[
        'toggle-link px-6 rounded-l-lg',
        { [activeClasses]: isInvestPage }
      ]"
      @click="trackGoal(Goals.ClickNavInvest)"
    >
      Invest<span class="hidden lg:inline">&nbsp;/&nbsp;Farm</span>
    </router-link>
    <!--    <router-link
      :to="{ name: 'farm' }"
      :class="[
        'toggle-link px-6 rounded-r-lg',
        { [activeClasses]: isFarmPage }
      ]"
      @click="trackGoal(Goals.ClickNavFarm)"
    >
      Farm
    </router-link>-->
    <router-link
      :to="{ name: 'my-portfolio' }"
      :class="[
        'toggle-link px-4 rounded-l-lg',
        { [activeClasses]: isPortfolioPage }
      ]"
      @click="trackGoal(Goals.ClickNavHome)"
      v-if="isLoggedIn"
    >
      Portfolio
    </router-link>
    <router-link
      :to="{ name: 'fbeets' }"
      :class="[
        'toggle-link px-4 rounded-l-lg',
        { [activeClasses]: isFreshBeetsPage }
      ]"
      @click="trackGoal(Goals.ClickNavFreshBeets)"
      v-if="isLoggedIn"
    >
      fBeets
    </router-link>
    <!--    <router-link
      :to="{ name: 'beets' }"
      :class="[
        'toggle-link px-6 rounded-r-lg',
        { [activeClasses]: isBeetsPage }
      ]"
      @click="trackGoal(Goals.ClickNavBeets)"
    >
      BEETS
    </router-link>-->
  </div>
</template>

<script lang="ts">
import useFathom from '@/composables/useFathom';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { EXTERNAL_LINKS } from '@/constants/links';
import useApp from '@/composables/useApp';
import useWeb3 from '@/services/web3/useWeb3';

export default defineComponent({
  name: 'AppNavToggle',
  components: {},
  props: {
    darkModeBg: { type: String, default: '800' }
  },

  setup() {
    const route = useRoute();
    const activeClasses =
      'bg-black text-white rounded-lg dark:text-black dark:bg-white';
    const isTradePage = computed(() => route.name === 'trade');
    const isFarmPage = computed(() => String(route.name).startsWith('farm'));
    const isBeetsPage = computed(() => route.name === 'beets');
    const isPortfolioPage = computed(() => route.name === 'my-portfolio');
    const isInvestPage = computed(
      () => route.name === 'invest' || String(route.name).startsWith('pool')
    );
    const isFreshBeetsPage = computed(() => route.name === 'fbeets');
    const isHomePage = computed(
      () =>
        !isTradePage.value &&
        !isFarmPage.value &&
        !isBeetsPage.value &&
        !isInvestPage.value
    );
    const { trackGoal, Goals } = useFathom();

    const { appLoading } = useApp();
    const { account, isLoadingProfile } = useWeb3();

    const isLoggedIn = computed(
      () => !appLoading.value && !isLoadingProfile.value && !!account.value
    );

    return {
      isTradePage,
      isFarmPage,
      activeClasses,
      trackGoal,
      isBeetsPage,
      isInvestPage,
      isHomePage,
      Goals,
      EXTERNAL_LINKS,
      isLoggedIn,
      isPortfolioPage,
      isFreshBeetsPage
    };
  }
});
</script>

<style scoped>
.app-nav-toggle {
  @apply h-10 flex items-center rounded-lg shadow;
  font-variation-settings: 'wght' 600;
}

.toggle-link {
  @apply h-full flex items-center;
}
</style>
