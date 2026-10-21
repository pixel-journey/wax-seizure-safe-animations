import { CHAIN_ORIGIN, currencyBalance } from "./api";
import { flashAllowed } from "./flash";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

export const USE_CASES: UseCase[] = [
  {
    title: "A balance does not set the flash rate",
    detail: "Three flashes in one second is allowed. Four is not. get_currency_balance has nothing to do with that count. It is not sent.",
    request: currencyBalance(CHAIN_ORIGIN, "alice"),
    transaction: null,
  },
  {
    title: "The same read for a second account",
    detail: "No animation is played. No transaction is built.",
    request: currencyBalance(CHAIN_ORIGIN, "bob"),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (!flashAllowed(3, 1000).allowed || flashAllowed(4, 1000).allowed) throw new Error("threshold");
}
