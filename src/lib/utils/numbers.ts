import { Decimal } from 'decimal.js';
import { BigNumber } from 'ethers';
import { WeiPerEther as ONE } from '@ethersproject/constants/lib/bignumbers';
import { Zero } from '@ethersproject/constants';

const SCALING_FACTOR = 1e18;

export type BigNumberish = string | number | BigNumber;

export const decimal = (x: BigNumberish | Decimal): Decimal =>
  new Decimal(x.toString());

export const fp = (x: number | Decimal): BigNumber => bn(toFp(x));

export const toFp = (x: BigNumberish | Decimal): Decimal =>
  decimal(x).mul(SCALING_FACTOR);

export const fromFp = (x: BigNumberish | Decimal): Decimal =>
  decimal(x).div(SCALING_FACTOR);

export const bn = (x: BigNumberish | Decimal): BigNumber => {
  if (BigNumber.isBigNumber(x)) return x;
  const stringified = parseScientific(x.toString());
  const integer = stringified.split('.')[0];
  return BigNumber.from(integer);
};

export const maxUint = (e: number): BigNumber =>
  bn(2)
    .pow(e)
    .sub(1);

export const maxInt = (e: number): BigNumber =>
  bn(2)
    .pow(bn(e).sub(1))
    .sub(1);

export const minInt = (e: number): BigNumber =>
  bn(2)
    .pow(bn(e).sub(1))
    .mul(-1);

export const pct = (x: BigNumberish, pct: BigNumberish): BigNumber =>
  bn(decimal(x).mul(decimal(pct)));

export const max = (a: BigNumberish, b: BigNumberish): BigNumber => {
  a = bn(a);
  b = bn(b);

  return a.gt(b) ? a : b;
};

export const min = (a: BigNumberish, b: BigNumberish): BigNumber => {
  a = bn(a);
  b = bn(b);

  return a.lt(b) ? a : b;
};

export const arrayAdd = (
  arrA: BigNumberish[],
  arrB: BigNumberish[]
): BigNumber[] => arrA.map((a, i) => bn(a).add(bn(arrB[i])));

export const arraySub = (
  arrA: BigNumberish[],
  arrB: BigNumberish[]
): BigNumber[] => arrA.map((a, i) => bn(a).sub(bn(arrB[i])));

export const divCeil = (x: BigNumber, y: BigNumber): BigNumber =>
  // ceil(x/y) == (x + y - 1) / y
  x
    .add(y)
    .sub(1)
    .div(y);

export const FP_SCALING_FACTOR = bn(SCALING_FACTOR);

const MaxWeightedTokens = 100;

export function bnToNormalizedWeights(weights: BigNumber[]): BigNumber[] {
  // When the number is exactly equal to the max, normalizing with common inputs
  // leads to a value < 0.01, which reverts. In this case fill in the weights exactly.
  if (weights.length == MaxWeightedTokens) {
    return Array(MaxWeightedTokens).fill(ONE.div(MaxWeightedTokens));
  }

  const sum = weights.reduce((total, weight) => total.add(weight), Zero);
  if (sum.eq(ONE)) return weights;

  const normalizedWeights: BigNumber[] = [];
  let normalizedSum = Zero;
  for (let index = 0; index < weights.length; index++) {
    if (index < weights.length - 1) {
      normalizedWeights[index] = weights[index].mul(ONE).div(sum);
      normalizedSum = normalizedSum.add(normalizedWeights[index]);
    } else {
      normalizedWeights[index] = ONE.sub(normalizedSum);
    }
  }

  return normalizedWeights;
}

function parseScientific(num: string): string {
  // If the number is not in scientific notation return it as it is
  if (!/\d+\.?\d*e[+-]*\d+/i.test(num)) return num;

  // Remove the sign
  const numberSign = Math.sign(Number(num));
  num = Math.abs(Number(num)).toString();

  // Parse into coefficient and exponent
  const [coefficient, exponent] = num.toLowerCase().split('e');
  let zeros = Math.abs(Number(exponent));
  const exponentSign = Math.sign(Number(exponent));
  const [integer, decimals] = (coefficient.indexOf('.') != -1
    ? coefficient
    : `${coefficient}.`
  ).split('.');

  if (exponentSign === -1) {
    zeros -= integer.length;
    num =
      zeros < 0
        ? integer.slice(0, zeros) + '.' + integer.slice(zeros) + decimals
        : '0.' + '0'.repeat(zeros) + integer + decimals;
  } else {
    if (decimals) zeros -= decimals.length;
    num =
      zeros < 0
        ? integer + decimals.slice(0, zeros) + '.' + decimals.slice(zeros)
        : integer + decimals + '0'.repeat(zeros);
  }

  return numberSign < 0 ? '-' + num : num;
}
