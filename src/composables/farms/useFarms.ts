import { computed, ComputedRef } from 'vue';
import { flatten } from 'lodash';
import useFarmsQuery from '@/composables/queries/useFarmsQuery';
import { Farm, FarmUser } from '@/services/balancer/subgraph/types';
import useAllFarmsForUserQuery from '@/composables/queries/useAllFarmsForUserQuery';
import { masterChefContractsService } from '@/services/farm/master-chef-contracts.service';
import useWeb3 from '@/services/web3/useWeb3';
import useTransactions from '@/composables/useTransactions';
import { TransactionResponse } from '@ethersproject/providers';

export default function useFarms(): {
  farms: ComputedRef<Farm[]>;
  allFarmsForUser: ComputedRef<FarmUser[]>;
  harvestAllFarms: (
    farmIds: string[]
  ) => Promise<TransactionResponse | undefined>;
  refetchFarmsForUser: () => Promise<void>;
  isLoadingFarms: ComputedRef<boolean>;
} {
  const { getProvider, appNetworkConfig, account } = useWeb3();
  const { addTransaction } = useTransactions();
  const farmsQuery = useFarmsQuery();
  const allFarmsUserQuery = useAllFarmsForUserQuery();
  const allFarmsForUser = computed(() => allFarmsUserQuery.data.value || []);

  const farms: ComputedRef<Farm[]> = computed(() =>
    farmsQuery.data.value
      ? flatten(farmsQuery.data.value.pages.map(page => page.farms))
      : []
  );

  const isLoadingFarms = computed(
    () =>
      farmsQuery.isLoading.value ||
      farmsQuery.isIdle.value ||
      allFarmsUserQuery.isLoading.value
  );

  async function harvestAllFarms(farmIds: string[]) {
    try {
      const provider = getProvider();
      const tx = await masterChefContractsService.masterChef.harvestAll(
        provider,
        farmIds,
        account.value
      );

      addTransaction({
        id: tx.hash,
        type: 'tx',
        action: 'claim',
        summary: 'Harvest all rewards',
        details: {
          spender: appNetworkConfig.addresses.masterChef
        }
      });

      return tx;
    } catch (error) {
      console.error(error);
    }
  }

  async function refetchFarmsForUser() {
    allFarmsUserQuery.refetch.value();
  }

  return {
    farms,
    allFarmsForUser,
    harvestAllFarms,
    isLoadingFarms,
    refetchFarmsForUser
  };
}
