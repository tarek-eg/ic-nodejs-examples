import "isomorphic-fetch";
import { createWalletActor } from "./src/createActor";
import { principal } from "./src/identity/identity";

// import your functions here from ./src/...
async function main() {
  console.log("Principal", principal.toText());

  const walletActor = createWalletActor();

  const res = await walletActor.wallet_balance();
  console.log("res", res);
}

main();
