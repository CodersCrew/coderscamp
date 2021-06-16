import React, { useState } from 'react';

import { Button } from '@coderscamp/ui';

export const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount((prev) => prev + 1);

  return <Button onClick={handleClick}>count is: {count}</Button>;
};
