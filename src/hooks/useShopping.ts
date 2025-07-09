const useShoppping = () => {
  
  const getProducts = () => {
    return {
      1: 'eSIM',
      2: 'Swap',
      3: 'Pay',
    };
  };

  const createOrderDb = async (body: any) => {
    const result = await fetch('https://createorder-ylo5dtxzdq-uc.a.run.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: process.env.BEGIN_API_KEY || '' },
      body: JSON.stringify(body),
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw new Error('Order not created.');
      });

    return result;
  };

  const getOrdersDb = async (productId: number, paymentAddr: string, rewardAddr: string) => {
    const payload = {
      productId,
      paymentAddress: paymentAddr,
      stakeAddress: rewardAddr,
    };

    const result = await fetch('https://getorders-ylo5dtxzdq-uc.a.run.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: process.env.BEGIN_API_KEY || '' },
      body: JSON.stringify(payload),
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json())
      .then((res) => {
        return res.result;
      })
      .catch((err) => {
        console.error(err);
        throw new Error('get Orders error.');
      });

    return result;
  };

  const getOrderByPaymentIdDb = async (productId: number, paymentId: string) => {
    const payload = {
      productId,
      paymentId,
    };

    const result = await fetch('https://getorders-ylo5dtxzdq-uc.a.run.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: process.env.BEGIN_API_KEY || '' },
      body: JSON.stringify(payload),
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json())
      .then((res) => {
        return res.result;
      })
      .catch((err) => {
        console.error(err);
        throw new Error('get Orders error.');
      });

    return result;
  };

  return { createOrderDb, getProducts, getOrdersDb, getOrderByPaymentIdDb };
};

export default useShoppping;
