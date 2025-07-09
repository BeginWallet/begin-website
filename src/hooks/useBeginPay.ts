const useBeginPay = () => {
  const getMempoolTxByHash = async (hash: string) => {
    const url = `https://cardano-mainnet.blockfrost.io/api/v0/mempool/${hash}`;
    const result = await fetch(url, {
      headers: {
        Project_id: process.env.BLOCKFROST_API_KEY || '',
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json())
      .then((res) => {
        return res.result;
      })
      .catch((err) => {
        console.error(err);
        throw new Error("get Orders error.");
      });

    return result;
  };

  return {
    getMempoolTxByHash,
  };
};

export default useBeginPay;
