import { configService } from '@/services/config/config.service';

export const TOKENS = {
  Popular: {
    Symbols: ['WBTC', 'DAI', 'USDC', 'WAVAX', 'WETH']
  },
  AddressMap: {
    '1': {
      ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      BAL: '0xba100000625a3754423978a60c9317c58a424e3d'
    },
    '42': {
      ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      WETH: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
      BAL: '0x41286Bb1D3E870f3F750eB7E1C25d7E48c8A1Ac7'
    },
    '137': {
      WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      BAL: '0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3'
    },
    '43113': {
      WETH: '0xfBD49f16d9fc6566aE41C20026DDCf3bADb6ba9F',
      BAL: '0x9c2eE4065F5BcaF2220c6eA788829eEd80aec503'
    }
  },
  Prices: {
    ChainMap: {
      '42': {
        '0xdfcea9088c8a88a76ff74892c1457c17dfeef9c1':
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x1c8e3bcb3378a443cc591f154c5ce0ebb4da9648':
          '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0x41286bb1d3e870f3f750eb7e1c25d7e48c8a1ac7':
          '0xba100000625a3754423978a60c9317c58a424e3d',
        '0x8f4bebf498cc624a0797fe64114a6ff169eee078':
          '0xbc396689893d065f41bc2c6ecbee5e0085233447',
        '0xaf9ac3235be96ed496db7969f60d354fe5e426b0':
          '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        '0xc2569dd7d0fd715b054fbf16e75b001e5c0c1115':
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0x04df6e4121c27713ed22341e7c7df330f56f289b':
          '0x6b175474e89094c44da98b954eedeac495271d0f'
      },
      '43113': {
        '0x9d78950bc4c531d32c3f874120f0b96213d81dfc':
          '0x50b7545627a5162f82a992c33b87adc75187b218',
        '0xfbd49f16d9fc6566ae41c20026ddcf3badb6ba9f':
          '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
        '0x0a35823b2c0a025d97e4002aec5038b96087942d':
          '0xc7198437980c041c805a1edcba50c1ce5db95118',
        '0x510cd68b4bdd8cd2fd6e93afe368f0f4e17791f8':
          '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
        '0x9c2ee4065f5bcaf2220c6ea788829eed80aec503':
          '0x50b7545627a5162f82a992c33b87adc75187b218',
        '0xd00ae08403B9bbb9124bB305C09058E32C39A48c':
          '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
      }
    }
  }
};

export const NATIVE_ASSET_ADDRESS = configService.network.nativeAsset.address;
export const DEFAULT_TOKEN_DECIMALS = 18;
